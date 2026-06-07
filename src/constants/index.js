export const myProjects = [
  {
    id: 1,
    title: "QuantStream",
    description:
      "Real-time quantitative market data pipeline for streaming analytics, feature engineering, replayable backtesting, and low-latency financial signal computation.",
    subDescription: [
      "Built an event-time Kafka → Flink streaming pipeline computing SMA, VWAP, volatility, and rolling indicators using sliding windows and watermark-based processing.",
      "Implemented stateful Flink processing with RocksDB state backend, checkpointing, and exactly-once semantics ensuring replay recovery and operational reliability.",
      "Designed a dual-layer feature store architecture using Redis for low-latency serving and ClickHouse for analytical workloads with consistency validation and drift detection.",
      "Developed resilient ingestion infrastructure from Binance WebSocket feeds to Kafka using Avro serialization, Schema Registry, DLQ handling, and backward-compatible schema evolution.",
      "Engineered deterministic replay backtesting, circuit-breaker-based fault tolerance, observability pipelines, and containerized deployment using Docker and Kubernetes.",
    ],
    href: "https://github.com/anshlakhera048/QuantStream",
    logo: "",
    image: "/assets/quantstream.png",
    tags: [
      {
        id: 1,
        name: "Kafka",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
      },
      {
        id: 2,
        name: "Apache Flink",
        path: "https://upload.wikimedia.org/wikipedia/commons/7/77/Apache_Flink_logo.svg",
      },
      {
        id: 3,
        name: "Spring Boot",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      },
      {
        id: 4,
        name: "Redis",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      },
      {
        id: 5,
        name: "Docker",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        id: 6,
        name: "Kubernetes",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
      },
      {
        id: 7,
        name: "ClickHouse",
        path: "https://avatars.githubusercontent.com/u/54801242?s=200&v=4",
      },
      {
        id: 8,
        name: "Apache Avro",
        path: "https://svn.apache.org/repos/asf/comdev/project-logos/originals/avro.svg",
      },
    ],
  },
  {
    id: 2,
    title: "AxiomX",
    description:
      "Ultra-low latency deterministic exchange engine with lock-free order ingestion, event sourcing, FIX connectivity, and replayable matching infrastructure.",
    subDescription: [
      "Built a deterministic exchange engine processing 480K+ ops/sec with sub-microsecond p50 latency using single-threaded Disruptor ring-buffer architecture.",
      "Designed a price-time priority order book using TreeMap + FIFO queues enabling O(log N) matching and O(1) cancellation via indexed order references.",
      "Implemented lock-free ingestion pipelines using Disruptor SPSC queues and custom sequencers ensuring strict event ordering with zero contention.",
      "Optimized hot execution paths using object pooling, Agrona buffers, fastutil primitive collections, and zero-allocation techniques to reduce GC pressure and improve cache locality.",
      "Engineered event sourcing, snapshotting, deterministic replay, FIX gateway integration, and benchmarking infrastructure ensuring fault recovery and consistency at scale.",
    ],
    href: "https://github.com/anshlakhera048/AxiomX",
    logo: "",
    image: "/assets/axiomx.png",
    tags: [
      {
        id: 1,
        name: "Java",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        id: 2,
        name: "Disruptor",
        path: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/lmax.svg",
      },
      {
        id: 3,
        name: "Docker",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        id: 4,
        name: "Redis",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      },
      {
        id: 5,
        name: "Linux",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      },
      {
        id: 6,
        name: "Maven",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg",
      },
      {
        id: 7,
        name: "Chronicle Queue",
        path: "https://avatars.githubusercontent.com/u/7308370?s=200&v=4",
      },
      {
        id: 8,
        name: "FIX Protocol",
        path: "https://upload.wikimedia.org/wikipedia/commons/6/68/FIX_Protocol_Logo.png",
      },
    ],
  },
  {
    id: 3,
    title: "Distributed Payments Infrastructure with Real-Time Fraud Detection",
    description:
      "Event-driven distributed payments system with real-time fraud detection, ensuring strong consistency, fault tolerance, and scalable transaction processing using Kafka-based streaming architecture.",
    subDescription: [
      "Designed and implemented a high-throughput payments platform using Java (Spring Boot), processing transactions via Kafka-driven asynchronous pipelines with end-to-end fault tolerance.",
      "Built a strongly consistent double-entry ledger system with account-level optimistic locking to prevent race conditions and ensure ACID-compliant financial operations.",
      "Implemented idempotent APIs and consumers using Redis caching, DB constraints, and event deduplication to achieve effectively exactly-once processing over Kafka.",
      "Developed a real-time fraud detection pipeline using Python (FastAPI) with rule-based filtering and ML-based anomaly detection integrated via event streaming.",
      "Engineered resilience using distributed systems patterns including transactional outbox, Saga workflows, retry with exponential backoff, DLQs, and circuit breakers.",
      "Integrated observability with Prometheus and Grafana, including Kafka lag monitoring and adaptive backpressure for system stability under high load.",
    ],
    href: "https://github.com/anshlakhera048/Distributed-Payment-Infrastructure",
    logo: "",
    image: "/assets/distributed_payment_infra.png",
    tags: [
      {
        id: 1,
        name: "Java",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        id: 2,
        name: "Spring Boot",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      },
      {
        id: 3,
        name: "Apache Kafka",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
      },
      {
        id: 4,
        name: "PostgreSQL",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        id: 5,
        name: "Redis",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      },
      {
        id: 6,
        name: "Python",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        id: 7,
        name: "FastAPI",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      },
      {
        id: 8,
        name: "Docker",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        id: 9,
        name: "Prometheus",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",
      },
      {
        id: 10,
        name: "Grafana",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
      },
    ],
  },
  {
    id: 4,
    title: "AgentHub",
    description:
      "Modular multi-agent AI orchestration platform with RAG, tool execution, and DAG-based workflows using local LLMs.",
    subDescription: [
      "Designed a multi-agent AI system with pluggable agents (prompt optimization, planning, code review, RAG, tool execution) using clean interface-driven architecture.",
      "Built a central orchestrator supporting agent chaining and DAG-based workflows with async execution using CompletableFuture for parallel processing.",
      "Implemented Retrieval-Augmented Generation (RAG) using vector embeddings (ChromaDB) to improve response grounding and reduce hallucinations.",
      "Developed a secure tool-calling framework (file I/O, HTTP client, sandboxed code execution) with LLM-driven tool selection and backend-controlled execution.",
      "Integrated local LLM inference via Ollama with streaming responses (SSE) and Redis-based session memory for contextual multi-turn interactions.",
    ],
    href: "https://github.com/anshlakhera048/AgentHub",
    logo: "",
    image: "/assets/agentHub.png",
    tags: [
      {
        id: 1,
        name: "Java",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        id: 2,
        name: "Spring Boot",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      },
      {
        id: 3,
        name: "Redis",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      },
      {
        id: 4,
        name: "PostgreSQL",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        id: 5,
        name: "Docker",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        id: 6,
        name: "React",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        id: 7,
        name: "ChromaDB",
        path: "https://raw.githubusercontent.com/chroma-core/chroma/main/docs/docs.trychroma.com/img/chroma-logo.png",
      },
      {
        id: 8,
        name: "Ollama",
        path: "https://avatars.githubusercontent.com/u/151674099?s=200&v=4",
      },
    ],
  },
  {
    id: 5,
    title: "WanderAI",
    description:
      "AI-powered travel planner generating personalized itineraries based on user preferences, deployed on Vercel.",
    subDescription: [
      "Designed and deployed a scalable travel planner using React.js, Tailwind CSS, and Firebase.",
      "Implemented secure authentication using React OAuth 2.0 to enhance data protection and user experience.",
      "Integrated Firebase, REST APIs, and Gemini AI for real-time data processing and itinerary generation.",
      "Optimized distributed interactions for smooth performance and high scalability.",
    ],
    href: "https://wander-ai-ten.vercel.app/",
    logo: "",
    image: "/assets/wanderai.png",
    tags: [
      { id: 1, name: "JavaScript", path: "/assets/logos/javascript.svg" },
      { id: 2, name: "ReactJS", path: "/assets/logos/react.svg" },
      { id: 3, name: "TailwindCSS", path: "/assets/logos/tailwindcss.svg" },
      {
        id: 4,
        name: "Firebase",
        path: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjZmY5MTAwIiBkPSJNMTEuODQgMjkuMmMxLjE3LjQ3IDIuNDQuNzUgMy43OC44YzEuODEuMDYgMy41Mi0uMzEgNS4wNi0xLjAyYy0xLjg0LS43Mi0zLjUxLTEuNzgtNC45My0zLjFhOC41IDguNSAwIDAgMS0zLjkgMy4zMloiLz48cGF0aCBmaWxsPSIjZmZjNDAwIiBkPSJNMTUuNzQgMjUuODhjLTMuMjUtMy01LjIyLTcuMzUtNS4wNS0xMi4xMmMwLS4xNS4wMS0uMzEuMDItLjQ2YTguNSA4LjUgMCAwIDAtNC4zOS4wNWMtLjg3IDEuNTItMS4zOSAzLjI2LTEuNDYgNS4xM2MtLjE3IDQuODIgMi43NSA5LjAzIDYuOTggMTAuNzNhOC4zNyA4LjM3IDAgMCAwIDMuOS0zLjMyWiIvPjxwYXRoIGZpbGw9IiNmZjkxMDAiIGQ9Ik0xNS43NCAyNS44OGE4LjQgOC40IDAgMCAwIDEuMjctNC4xNWMuMTQtNC4wMi0yLjU2LTcuNDctNi4zLTguNDRjMCAuMTUtLjAyLjMxLS4wMi40NmExNS42OSAxNS42OSAwIDAgMCA1LjA1IDEyLjEyWiIvPjxwYXRoIGZpbGw9IiNkZDJjMDAiIGQ9Ik0xNi41OSAyYy0yLjEzIDEuNy0zLjgxIDMuOTUtNC44MyA2LjU0YTE1LjYgMTUuNiAwIDAgMC0xLjA1IDQuNzVhOC40MSA4LjQxIDAgMCAxIDYuMyA4LjQ0YTguMjcgOC4yNyAwIDAgMS0xLjI3IDQuMTVhMTUuOCAxNS44IDAgMCAwIDQuOTMgMy4xYzMuNy0xLjcxIDYuMzItNS4zOCA2LjQ3LTkuNzNjLjEtMi44Mi0uOTgtNS4zMy0yLjUxLTcuNDVjLTEuNjItMi4yNC04LjA0LTkuNzktOC4wNC05Ljc5WiIvPjwvc3ZnPg==",
      },
      {
        id: 5,
        name: "Gemini AI",
        path: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBmaWxsPSIjNDQ4YWZmIiBkPSJNMTUgOC4wMTRBNy40NTcgNy40NTcgMCAwIDAgOC4wMTQgMTVoLS4wMjhBNy40NTYgNy40NTYgMCAwIDAgMSA4LjAxNHYtLjAyOEE3LjQ1NiA3LjQ1NiAwIDAgMCA3Ljk4NiAxaC4wMjhBNy40NTcgNy40NTcgMCAwIDAgMTUgNy45ODZ6Ii8+PC9zdmc+",
      },
    ],
  },


];

export const mySocials = [
  {
    name: "Github",
    href: "https://github.com/anshlakhera048",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4KCTxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yMCAxMC4yNXEwIDMuMzUxLTEuOTA4IDYuMDI3dC00LjkyOCAzLjcwM3EtLjM1Mi4wNjgtLjUxNC0uMDkzYS41NC41NCAwIDAgMS0uMTYzLS40VjE2LjY3cTAtMS4yOTUtLjY3Ny0xLjg5NWE5IDkgMCAwIDAgMS4zMzUtLjI0cS41OTEtLjE2IDEuMjIzLS41MmEzLjcgMy43IDAgMCAwIDEuMDU1LS44ODhxLjQyMy0uNTI4LjY5LTEuNDAydC4yNjctMi4wMDhxMC0xLjYxNi0xLjAyOC0yLjc1cS40OC0xLjIxNC0uMTA1LTIuNzIzcS0uMzY0LS4xMi0xLjA1NC4xNDdhNyA3IDAgMCAwLTEuMTk4LjU4N2wtLjQ5NS4zMmE5IDkgMCAwIDAtMi41LS4zNDZhOSA5IDAgMCAwLTIuNS4zNDdhMTIgMTIgMCAwIDAtLjU1My0uMzZxLS4zNDUtLjIxNC0xLjA4OC0uNTE0cS0uNzQxLS4zLTEuMTItLjE4cS0uNTcyIDEuNTA3LS4wOSAyLjcyMnEtMS4wMyAxLjEzNC0xLjAzIDIuNzVxMCAxLjEzNC4yNjggMi4wMDJxLjI2Ny44NjcuNjgzIDEuNDAxYTMuNSAzLjUgMCAwIDAgMS4wNDguODk0cS42MzIuMzYgMS4yMjQuNTJxLjU5My4xNjIgMS4zMzUuMjQxcS0uNTIuNDgtLjYzOCAxLjM3NWEyLjUgMi41IDAgMCAxLS41ODYuMmEzLjYgMy42IDAgMCAxLS43NDIuMDY3cS0uNDMgMC0uODUzLS4yODdxLS40MjMtLjI4OC0uNzIzLS44MzRhMi4xIDIuMSAwIDAgMC0uNjMxLS42OTRxLS4zODQtLjI2Ny0uNjQ1LS4zMmwtLjI2LS4wNHEtLjI3MyAwLS4zNzguMDZ0LS4wNjUuMTUzYS43LjcgMCAwIDAgLjExNy4xODdhMSAxIDAgMCAwIC4xNy4xNmwuMDkuMDY2cS4yODcuMTM1LjU2Ny41MDhxLjI4LjM3NC40MS42OGwuMTMuMzA3cS4xNy41MDcuNTc0LjgyMXEuNDA0LjMxNS44NzIuNHEuNDY4LjA4Ny45MDUuMDk0cS40MzYuMDA2LjcyMy0uMDQ3bC4yOTktLjA1M3EwIC41MDcuMDA3IDEuMTg4bC4wMDYuNzJxMCAuMjQtLjE3LjRxLS4xNjguMTYyLS41Mi4wOTRxLTMuMDIxLTEuMDI4LTQuOTI4LTMuNzAzUTAgMTMuNiAwIDEwLjI1cTAtMi43OSAxLjM0MS01LjE0NWExMC4xIDEwLjEgMCAwIDEgMy42NC0zLjczQTkuNiA5LjYgMCAwIDEgMTAgMGE5LjYgOS42IDAgMCAxIDUuMDIgMS4zNzVhMTAuMSAxMC4xIDAgMCAxIDMuNjM5IDMuNzNRMjAgNy40NjEgMjAgMTAuMjUiIHN0cm9rZS13aWR0aD0iMC4zIiBzdHJva2U9IiNmZmYiIC8+Cjwvc3ZnPg==",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/ansh-lakhera/",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/swe.ngineer",
    icon: "/assets/socials/instagram.svg",
  },
];

export const experiences = [
  {
    title: "Tripfactory",
    job: "SDE Intern",
    date: "Jan 2026 - June 2026",
    logo: "/assets/tripfactory.png",
    contents: [
      "Integrated BPoint REST v5 gateway into distributed services; ensured consistent multi-gateway transaction state handling",
      "Built state-machine refund system with idempotent transitions, retries, and multi-gateway reconciliation under concurrency",
      "Developed idempotent HTTP layer with validation, retries, and standardized monetary handling across distributed services",
      "Resolved production issues in transaction mapping, session lifecycle, and state reconciliation under high concurrency",
      "Analyzed CDC pipeline from PostgreSQL via Debezium/Kafka to ClickHouse; identified data gaps and API failures"
    ],
  },
  {
    title: "Bluestock Fintech",
    job: "SDE Intern",
    date: "May 2025 - July 2025",
    logo: "/assets/bluestocks.webp",
    contents: [
      "Developed full-stack IPO platform (React, Node, Tailwind) with real-time insights.",
      "Worked in Agile team managing sprints and Git workflows.",
      "Improved frontend performance via modular React components.",
      "Proposed scalable upgrades: WebSockets and Dockerized environments."
    ],
  },
  {
    title: "Warble Solutions",
    job: "UI/UX Intern",
    date: "April 2024 - May 2024",
    logo: "/assets/warbleSolutions.png",
    contents: [
      "Designed SAP training modules; reduced onboarding time by 50%.",
      "Built multimedia tutorials adopted by enterprise clients; improved efficiency 40%.",
      "Streamlined documentation and process workflows for faster knowledge transfer."
    ],
  },
  {
    title: "Freelancer",
    job: "Software Developer",
    date: "2023 - Present",
    logo: "/assets/AvtarKala_Logo.png",
    contents: [
      "Built full-stack apps, dashboards, and automation tools for startups.",
      "Delivered production-ready solutions with APIs and cloud deployment.",
      "Led client discussions, scoped features, and shipped on time."
    ],
  },
];
