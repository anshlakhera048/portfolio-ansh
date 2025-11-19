import { mySocials } from "../constants";
const Footer = () => {
  return (
    <section className="w-full max-w-[100vw] flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 sm:gap-5 pb-3 text-xs sm:text-sm text-neutral-400">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 sm:gap-5">
      <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      <div className="flex gap-2 items-center">
        <p className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</p>
        <p>|</p>
        <p className="hover:text-white transition-colors cursor-pointer">Privacy Policy</p>
      </div>
      <div className="flex gap-3">
        {mySocials.map((social, index) => (
          <a href={social.href} key={index} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <img src={social.icon} className="w-5 h-5" alt={social.name} />
          </a>
        ))}
      </div>
      <p className="text-center sm:text-left">© 2025 Ansh. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Footer;
