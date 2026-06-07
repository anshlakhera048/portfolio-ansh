import { useState, useEffect, useRef, memo } from "react";
import { useTheme } from "../context/ThemeContext";

// ═══════════════════════════════════════════════════════════════════
// LIVE CODE SURFACE — Ambient streaming code / execution traces
// Creates the feeling of a living computation environment.
// ═══════════════════════════════════════════════════════════════════

const CODE_BLOCKS = [
  // Saga orchestration
  `@Transactional(propagation = REQUIRES_NEW)
public Mono<PaymentResult> executeSaga(OrderCommand cmd) {
    return sagaOrchestrator.begin(cmd.correlationId())
        .flatMap(ctx -> paymentService.reserve(ctx))
        .flatMap(ctx -> fraudService.evaluate(ctx))
        .flatMap(ctx -> inventoryService.deduct(ctx))
        .onErrorResume(SagaFailure.class, this::compensate)
        .doOnSuccess(ctx -> outbox.publish(
            new OrderConfirmed(ctx.orderId(), Instant.now())
        ));
}`,

  // Kafka consumer
  `@KafkaListener(topics = "payment.events", groupId = "fraud-eval")
public void onPaymentEvent(ConsumerRecord<String, PaymentEvent> record) {
    var event = record.value();
    var score = fraudModel.predict(event.features());
    
    if (score > THRESHOLD) {
        circuitBreaker.execute(() -> 
            paymentService.flag(event.txId(), score)
        );
        meter.counter("fraud.flagged").increment();
    }
    
    consumer.commitSync(Map.of(
        new TopicPartition(record.topic(), record.partition()),
        new OffsetAndMetadata(record.offset() + 1)
    ));
}`,

  // CQRS projection
  `@Component
public class OrderProjection implements EventHandler {
    private final ReadModelRepository readRepo;
    private final MeterRegistry metrics;
    
    @EventHandler
    public void on(OrderCreated event) {
        var view = OrderView.builder()
            .id(event.orderId())
            .status(PENDING)
            .items(event.lineItems())
            .createdAt(event.timestamp())
            .build();
        
        readRepo.upsert(view);
        metrics.timer("projection.lag")
            .record(Duration.between(event.timestamp(), Instant.now()));
    }
}`,

  // Redis cache-aside
  `public Mono<Product> getProduct(String id) {
    var cacheKey = "product:" + id;
    return reactiveRedis.opsForValue()
        .get(cacheKey)
        .switchIfEmpty(Mono.defer(() -> 
            repository.findById(id)
                .flatMap(product -> reactiveRedis
                    .opsForValue()
                    .set(cacheKey, product, Duration.ofMinutes(5))
                    .thenReturn(product)
                )
        ))
        .doOnNext(p -> cacheMetrics.recordHitRatio(cacheKey));
}`,

  // gRPC interceptor
  `@Override
public <Req, Resp> Listener<Req> interceptCall(
    ServerCall<Req, Resp> call, Metadata headers, 
    ServerCallHandler<Req, Resp> next) {
    
    var traceId = headers.get(TRACE_ID_KEY);
    var span = tracer.spanBuilder(call.getMethodDescriptor().getFullMethodName())
        .setParent(Context.current().with(extractContext(traceId)))
        .startSpan();
    
    return Contexts.interceptCall(
        Context.current().withValue(SPAN_KEY, span),
        call, headers, next
    );
}`,
];

// ── Streaming code surface component ─────────────────────────────
function LiveCodeSurface({ className = "", position = "left", speed = 80 }) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const blockIdx = useRef(Math.floor(Math.random() * CODE_BLOCKS.length));
  const lineIdx = useRef(0);
  const idCounter = useRef(0);

  useEffect(() => {
    const addLine = () => {
      const block = CODE_BLOCKS[blockIdx.current % CODE_BLOCKS.length];
      const blockLines = block.split("\n");
      
      if (lineIdx.current >= blockLines.length) {
        lineIdx.current = 0;
        blockIdx.current++;
        // Add a blank separator
        idCounter.current++;
        setLines((prev) => [...prev.slice(-18), { id: idCounter.current, text: "", isBlank: true }]);
        return;
      }

      const text = blockLines[lineIdx.current];
      lineIdx.current++;
      idCounter.current++;
      setLines((prev) => [...prev.slice(-18), { id: idCounter.current, text }]);
    };

    addLine();
    const id = setInterval(addLine, speed);
    return () => clearInterval(id);
  }, [speed]);

  const posStyle = position === "left" 
    ? { left: 0, background: `linear-gradient(to right, transparent, ${isLight ? "rgba(250,247,255,0.95)" : "rgba(15,15,26,0.95)"} 80%)` }
    : { right: 0, background: `linear-gradient(to left, transparent, ${isLight ? "rgba(250,247,255,0.95)" : "rgba(15,15,26,0.95)"} 80%)` };

  return (
    <div 
      ref={containerRef}
      className={`absolute top-0 bottom-0 w-64 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ ...posStyle, opacity: isLight ? 0.3 : 0.15 }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex flex-col justify-end p-3">
        {lines.map((line) => (
          <p
            key={line.id}
            className="text-[10px] leading-relaxed whitespace-pre truncate"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: line.isBlank ? "transparent" : (isLight ? "var(--txt-muted)" : "#B8B8D0"),
            }}
          >
            {line.text || " "}
          </p>
        ))}
      </div>
    </div>
  );
}

export default memo(LiveCodeSurface);
