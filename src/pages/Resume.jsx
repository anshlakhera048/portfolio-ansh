import { profile, projects, experience, openSource, achievements } from "../content";

/* /resume — the recruiter escape hatch. Zero WebGL, zero animation libs:
   plain semantic HTML that loads instantly and prints cleanly. */
export default function Resume() {
  return (
    <main className="min-h-screen" style={{ background: "#fff", color: "#111" }}>
      <div className="max-w-3xl mx-auto px-6 py-12 font-sans">
        <header className="border-b-2 border-black pb-6">
          <h1 className="text-4xl font-bold tracking-tight">{profile.name}</h1>
          <p className="mt-1 text-lg text-neutral-600">
            {profile.role} — {profile.focus}
          </p>
          <p className="mt-3 text-sm text-neutral-700">
            {profile.email} · {profile.phone} · {profile.location}
            <br />
            <a className="underline" href={profile.github}>github.com/anshlakhera048</a>
            {" · "}
            <a className="underline" href={profile.linkedin}>linkedin.com/in/ansh-lakhera</a>
            {" · "}
            <a className="underline" href="https://anshlakhera.in">anshlakhera.in</a>
          </p>
        </header>

        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-neutral-300 pb-1">Summary</h2>
          <p className="mt-3 text-[0.95rem] leading-relaxed">
            Backend engineer focused on distributed systems with production experience in
            high-throughput Java services — event-driven payments, exchange engines &amp; real-time
            pipelines. Skilled in Kafka, Flink, Spring Boot; merged open-source contributor.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-neutral-300 pb-1">Experience</h2>
          {experience.map((e) => (
            <div key={e.company} className="mt-4">
              <div className="flex justify-between baseline">
                <h3 className="font-bold">{e.role} — {e.company}</h3>
                <span className="text-sm text-neutral-600">{e.period}</span>
              </div>
              <ul className="mt-1.5 list-disc pl-5 space-y-1 text-[0.92rem] leading-relaxed">
                {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-neutral-300 pb-1">Key Projects</h2>
          {projects.map((p) => (
            <div key={p.id} className="mt-4">
              <h3 className="font-bold">{p.title} <span className="font-normal text-neutral-600">— {p.subtitle}</span></h3>
              <ul className="mt-1.5 list-disc pl-5 space-y-1 text-[0.92rem] leading-relaxed">
                {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-neutral-300 pb-1">Open Source</h2>
          {openSource.map((o) => (
            <div key={o.repo} className="mt-4">
              <h3 className="font-bold">{o.org} <span className="font-normal text-neutral-600">({o.repo})</span></h3>
              <ul className="mt-1.5 list-disc pl-5 space-y-1 text-[0.92rem] leading-relaxed">
                {o.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-neutral-300 pb-1">Achievements</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-[0.92rem] leading-relaxed">
            {achievements.map((a) => (
              <li key={a.k}>{a.k}: <b>{a.v}</b> — {a.d}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-neutral-300 pb-1">Education</h2>
          <p className="mt-3 text-[0.95rem]">
            B.Tech, Institute of Technology, Nirma University — 2022–2026
          </p>
        </section>

        <footer className="mt-10 pt-4 border-t border-neutral-300 text-sm text-neutral-500 flex justify-between">
          <a href="#/" className="underline">← Back to portfolio</a>
          <span>anshlakhera.in/#/resume</span>
        </footer>
      </div>
    </main>
  );
}
