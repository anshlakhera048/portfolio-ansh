import { useState } from "react";
import emailjs from "@emailjs/browser";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import { GitHubIcon, LinkedInIcon, InstagramIcon } from "../components/SocialIcons";
import { profile } from "../content";

const inputStyle = {
  background: "var(--bg-soft)",
  border: "1px solid var(--line)",
  borderRadius: "10px",
  color: "var(--ink)",
  padding: "0.85rem 1.1rem",
  width: "100%",
  fontSize: "0.95rem",
  outline: "none",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [statusMsg, setStatusMsg] = useState("");

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Name needs at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "That email doesn't look right.";
    if (form.message.trim().length < 10) e.message = "Message needs at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setStatusMsg("Email service isn't configured on this deployment yet.");
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        serviceId,
        templateId,
        { from_name: form.name, reply_to: form.email, message: form.message },
        publicKey
      );
      setStatus("sent");
      setStatusMsg("Message sent — I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setStatusMsg("Couldn't send just now — try emailing me directly instead.");
    }
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="contact" className="section-shell scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-28 sm:py-36">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <p className="kicker mb-6">Contact</p>
            <h2 className="display-xl" style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}>
              Let&apos;s build something that doesn&apos;t fall over<span style={{ color: "var(--accent)" }}>.</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed" style={{ color: "var(--ink-dim)" }}>
              Open to entry-level software engineering roles — backend, distributed systems,
              low-latency. Immediate joiner, open to relocating anywhere in India and remote worldwide.
            </p>
            <div className="mt-8">
              <a href={`mailto:${profile.email}`} className="u-sweep font-mono2 text-sm block w-fit" style={{ color: "var(--ink)" }}>
                {profile.email}
              </a>
            </div>
            <div className="mt-8 flex gap-5">
              {[
                { label: "GitHub", href: profile.github, Icon: GitHubIcon },
                { label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon },
                { label: "Instagram", href: profile.instagram, Icon: InstagramIcon },
              ].map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="p-3 rounded-full border transition-all hover:scale-110"
                  style={{ borderColor: "var(--line)", color: "var(--ink-dim)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ink-dim)"; e.currentTarget.style.borderColor = "var(--line)"; }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border p-7 sm:p-8"
              style={{ borderColor: "var(--line)", background: "var(--panel)" }}
              noValidate
            >
              <div className="font-mono2 text-[0.68rem] tracking-[0.24em] uppercase mb-6" style={{ color: "var(--ink-faint)" }}>
                Send a message
              </div>
              <div className="space-y-5">
                <div>
                  <input
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    aria-label="Your name"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--line)")}
                  />
                  {errors.name && <p className="font-mono2 text-xs mt-2" style={{ color: "var(--ask)" }}>{errors.name}</p>}
                </div>
                <div>
                  <input
                    value={form.email}
                    onChange={set("email")}
                    placeholder="Your email"
                    type="email"
                    aria-label="Your email"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--line)")}
                  />
                  {errors.email && <p className="font-mono2 text-xs mt-2" style={{ color: "var(--ask)" }}>{errors.email}</p>}
                </div>
                <div>
                  <textarea
                    value={form.message}
                    onChange={set("message")}
                    placeholder="What's on your mind?"
                    rows={5}
                    aria-label="Your message"
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--line)")}
                  />
                  {errors.message && <p className="font-mono2 text-xs mt-2" style={{ color: "var(--ask)" }}>{errors.message}</p>}
                </div>
                <Magnetic strength={0.18}>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="font-mono2 text-sm tracking-[0.14em] uppercase rounded-full px-8 py-3.5 font-semibold w-full transition-all hover:scale-[1.02] disabled:opacity-60"
                    style={{ background: "var(--accent)", color: "#0a0a0c" }}
                  >
                    {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send message"}
                  </button>
                </Magnetic>
                {statusMsg && (
                  <p
                    className="font-mono2 text-xs"
                    style={{ color: status === "sent" ? "var(--bid)" : "var(--ask)" }}
                    role="status"
                  >
                    {statusMsg}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
