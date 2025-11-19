import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing overflow-x-hidden w-full" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.2] -right-[3rem] -top-[0.5rem] sm:scale-[1.5] sm:-right-[4rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
            alt="Coding perspective"
          />
          <div className="z-10 w-full p-4 sm:p-6">
            <p className="headtext text-lg sm:text-xl">Hi, I&apos;m Ansh Lakhera</p>
            <p className="subtext text-sm sm:text-base">
              Over the last few years, I developed my frontend and backend dev
              skills to deliver dynamic and software and web applications.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full relative overflow-hidden"
          >
            <p className="flex items-end text-2xl sm:text-3xl md:text-5xl text-gray-500 z-10">
              CODE IS CRAFT
            </p>
            <Card
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="GRASP"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="SOLID"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              text="Design Patterns"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="Design Principles"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="SRP"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="assets/logos/csharp-pink.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              image="assets/logos/dotnet-pink.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              image="assets/logos/blazor-pink.png"
              containerRef={grid2Container}
            />
          </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3 relative overflow-hidden">
          <div className="z-10 w-full sm:w-[60%] md:w-[50%] p-4 sm:p-6">
            <p className="headtext text-lg sm:text-xl">Time Zone</p>
            <p className="subtext text-sm sm:text-base">
              I&apos;m from in Kota, Rajasthan, and open to remote work worldwide
            </p>
          </div>
          <figure className="absolute left-[50%] top-[40%] -translate-x-1/2 sm:left-[35%] sm:top-[15%] sm:-translate-x-0 md:left-[50%] md:top-[2.5%] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[270px] lg:h-[270px] z-0">
            <Globe />
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext text-lg sm:text-xl px-4">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5 relative overflow-hidden">
          <div className="z-10 w-40 sm:w-[60%] md:w-[50%] lg:w-[45%] p-4 sm:p-6">
            <p className="headtext text-lg sm:text-xl">Tech Stack</p>
            <p className="subtext text-sm sm:text-base">
              I specialize in a variety of languages, frameworks, and tools that
              allow me to build robust and scalable applications
            </p>
          </div>
          <div className="absolute inset-y-0 right-0 w-[0%] sm:w-[45%] md:w-[0%] h-full flex items-center justify-center md:scale-110 lg:scale-125 z-0">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
