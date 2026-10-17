import { useState } from "react";
<<<<<<< HEAD
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import ContactProfileCard from "../components/ContactProfileCard";

const SOCIAL_PROFILES = [
  {
    platform: "Instagram",
    url: "https://www.instagram.com/swe.ngineer",
    handle: "@swe.ngineer",
    avatar: "/assets/ansh_instagram.png",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/ansh-lakhera/",
    handle: "@ansh",
    avatar: "/assets/ansh_linkedin.png",
  },
  {
    platform: "Github",
    url: "https://github.com/anshlakhera048",
    handle: "@anshlakhera048",
    avatar: "https://github.com/anshlakhera048.png",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    let isValid = true;

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Wrong email format";
      isValid = false;
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      if (!validateEmail(formData.email)) {
        showAlertMessage("danger", "Wrong email format");
      } else {
        showAlertMessage("danger", "Please fix the errors in the form");
      }
      return;
    }

    setIsLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          title: "New Contact Message",
          time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsLoading(false);
          setFormData({ name: "", email: "", message: "" });
          setErrors({ name: "", email: "", message: "" });
          showAlertMessage("success", "Your message has been sent!");
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setIsLoading(false);
          showAlertMessage("danger", "Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section className="relative c-space section-spacing w-full" id="contact" aria-label="Contact section">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={60}
        ease={80}
        color={"var(--accent-primary)"}
        refresh
      />

      {showAlert && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-xs pointer-events-none">
          <Alert type={alertType} text={alertMessage} />
        </div>
      )}


      <motion.div
        className="flex items-center gap-4 mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-primary)", boxShadow: "0 0 8px var(--accent-primary)" }} />
        <p className="text-xs tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)" }}>
          // get in touch
        </p>
      </motion.div>

      <motion.h2
        className="text-heading mb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        Contact
      </motion.h2>

      <ContactProfileCard profiles={SOCIAL_PROFILES} />

      <div
        className="relative flex flex-col items-center justify-center w-full max-w-lg px-2 py-4 sm:p-6 md:p-10 mx-auto rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-default)",
          borderTop: "2px solid var(--border-accent)",
          boxShadow: "var(--shadow-card)",
        }}
        tabIndex={0}
        aria-label="Contact form"
      >
        {/* Teal glow from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, var(--accent-glow), transparent 70%)" }} />
        <motion.p
          className="text-xl sm:text-2xl font-bold text-center mb-6 tracking-tight"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-primary)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span style={{ color: "var(--accent-primary)" }}>{"// "}</span>
          Let&apos;s Connect
        </motion.p>

        <form onSubmit={handleSubmit} className="w-full z-10">
          <div className="mb-3 sm:mb-6 relative">
            <input
              id="name"
              name="name"
              type="text"
              className={`field-input field-input-focus ${errors.name ? "border-red-500" : ""}`}
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="off"
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
            />
            <label htmlFor="name" className="absolute left-3 top-2 text-sm transition-all duration-200 pointer-events-none
              peer-focus:-top-5 peer-focus:text-xs peer-focus:text-lavender
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm
              peer-placeholder-shown:opacity-0
              peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-lavender peer-not-placeholder-shown:opacity-100"
              style={{ color: "var(--txt-muted)" }}>
              {/* Full Name */}
            </label>
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-red-400">{errors.name}</p>
            )}
          </div>


          <div className="mb-3 sm:mb-6 relative">
            <input
              id="email"
              name="email"
              type="email"
              className={`field-input field-input-focus ${errors.email ? "border-red-500" : ""}`}
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            <label htmlFor="email" className="absolute left-3 top-2 text-sm transition-all duration-200 pointer-events-none
              peer-focus:-top-5 peer-focus:text-xs peer-focus:text-lavender
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm
              peer-placeholder-shown:opacity-0
              peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-lavender peer-not-placeholder-shown:opacity-100"
              style={{ color: "var(--txt-muted)" }}>
              {/* Email */}
            </label>
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>





          <div className="mb-4 sm:mb-8 relative">
            <textarea
              id="message"
              name="message"
              rows="4"
              className={`field-input field-input-focus resize-none ${errors.message ? "border-red-500" : ""}`}
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <label htmlFor="message" className="absolute left-3 top-2 text-sm text-neutral-400 transition-all duration-200 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-lavender peer-valid:-top-5 peer-valid:text-xs peer-valid:text-lavender pointer-events-none">
              {/* Message */}
            </label>
            {errors.message && (
              <p className="mt-1 text-xs text-red-400">{errors.message}</p>
            )}
          </div>

          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="w-full px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
                color: "#0F0F1A",
              }}
              disabled={isLoading}
            >
              {!isLoading ? (
                <span className="flex items-center justify-center gap-1">
                  <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954 8.955c.44.439 1.152.439 1.591 0L22.75 12M12 3v17" /></svg>
                  Send
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1">
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
                  Sending...
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
=======
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
        templateId,{
          name: form.name,
          email: form.email,
          message: form.message,
          title: `Portfolio contact from ${form.name}`,
          time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        },
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
>>>>>>> 9d0c45aa13deaa634b289621b65c93c965649a7a
