// ...existing code...
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";

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

    const SERVICE_ID = "service_rc90ht9";
    const TEMPLATE_ID = "template_n33rv4j";
    const PUBLIC_KEY = "oH-njbQ029HPRbQZZ";

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          title: "New Contact Message",
          time: new Date().toLocaleString(),
        },
        PUBLIC_KEY
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
    <section className="relative c-space section-spacing w-full min-h-screen mt-28" id="contact" aria-label="Contact section">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={120}
        ease={80}
        color={"#a78bfa"}
        refresh
      />

      {showAlert && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-xs pointer-events-none">
          <Alert type={alertType} text={alertMessage} />
        </div>
      )}


      <motion.h2
        className="text-heading mb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        Contact
      </motion.h2>

      <div className="relative flex flex-col items-center justify-center w-full max-w-lg px-2 py-4 sm:p-6 md:p-10 mx-auto rounded-3xl bg-white/10 dark:bg-midnight/80 shadow-2xl border border-white/20 backdrop-blur-xl overflow-hidden animate-fade-in focus-within:ring-2 focus-within:ring-lavender mt-12" tabIndex={0} aria-label="Contact form">
        <motion.p
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 drop-shadow-lg text-fuchsia-700 dark:bg-gradient-to-r dark:from-lavender dark:to-fuchsia-400 dark:bg-clip-text dark:text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          Let's Connect
        </motion.p>
        {/* Floating gradient blobs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-400 via-lavender to-fuchsia-400 opacity-30 rounded-full blur-2xl animate-pulse z-0" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-fuchsia-400 via-lavender to-purple-400 opacity-30 rounded-full blur-2xl animate-pulse z-0" />

        <form onSubmit={handleSubmit} className="w-full z-10">
          <div className="mb-3 sm:mb-6 relative">
            <input
              id="name"
              name="name"
              type="text"
              className={`field-input field-input-focus bg-white/20 dark:bg-black/30 text-white peer ring-0 focus:ring-2 focus:ring-lavender ${errors.name ? "border-red-500" : "border-white/20"}`}
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="off"
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
            />
            <label htmlFor="name" className="absolute left-3 top-2 text-sm text-neutral-400 transition-all duration-200 pointer-events-none
              peer-focus:-top-5 peer-focus:text-xs peer-focus:text-lavender
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400
              peer-placeholder-shown:opacity-0
              peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-lavender peer-not-placeholder-shown:opacity-100">
              Full Name
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
              className={`field-input field-input-focus bg-white/20 dark:bg-black/30 text-white peer ring-0 focus:ring-2 focus:ring-lavender ${errors.email ? "border-red-500" : "border-white/20"}`}
              placeholder="johndoe@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            <label htmlFor="email" className="absolute left-3 top-2 text-sm text-neutral-400 transition-all duration-200 pointer-events-none
              peer-focus:-top-5 peer-focus:text-xs peer-focus:text-lavender
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400
              peer-placeholder-shown:opacity-0
              peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-lavender peer-not-placeholder-shown:opacity-100">
              Email
            </label>
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* <div className="mb-8 relative">
            <textarea
              id="message"
              name="message"
              rows="4"
              className={`field-input field-input-focus bg-white/20 dark:bg-black/30 text-white placeholder-transparent peer resize-none ring-0 focus:ring-2 focus:ring-lavender ${errors.message ? "border-red-500" : "border-white/20"}`}
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              aria-invalid={!!errors.message}
              aria-describedby="message-error"
            ></textarea>
            <label htmlFor="message" className="absolute left-3 top-2 text-sm text-neutral-400 transition-all duration-200 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-lavender peer-valid:-top-5 peer-valid:text-xs peer-valid:text-lavender pointer-events-none">
              Message
            </label>
            {errors.message && (
              <p id="message-error" className="mt-1 text-xs text-red-400">{errors.message}</p>
            )}
          </div> */}



          <div className="mb-4 sm:mb-8 relative">
            <textarea
              id="message"
              name="message"
              rows="4"
              className={`field-input field-input-focus bg-white/20 dark:bg-black/30 text-white placeholder-transparent peer resize-none ${errors.message ? "border-red-500" : "border-white/20"}`}
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
              className="w-9/12 sm:w-1/2 px-2 py-2 text-sm sm:text-base text-center rounded-lg font-semibold bg-gradient-to-r from-lavender via-fuchsia-400 to-purple-500 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
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
