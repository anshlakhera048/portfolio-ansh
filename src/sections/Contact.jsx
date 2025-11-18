import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          showAlertMessage("success", "Your message has been sent!");
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setIsLoading(false);
          showAlertMessage("danger", "Something went wrong. Try again!");
        }
      );
  };

  return (
    <section className="relative flex items-center c-space section-spacing">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />

      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let's Talk</h2>
          <p className="font-normal text-neutral-400">
            Whether you're looking to build a new website, improve your existing
            platform, or bring a unique project to life — I'm here to help.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-5">
            <label htmlFor="name" className="feild-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="feild-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="johndoe@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="feild-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
            disabled={isLoading}
          >
            {!isLoading ? "Send" : "Sending..."}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
