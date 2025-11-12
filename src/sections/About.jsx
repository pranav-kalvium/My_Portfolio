import { useState } from "react";
import RotatingGlobe from "../components/RotatingGlobe.jsx";

import Button from "../components/Button.jsx";

const About = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("pranavprakash6410@gmail.com");
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src="assets/grid1.png"
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain"
            />

            <div>
              <p className="grid-headtext">Hi, I’m Pranav Prakash</p>
              <p className="grid-subtext">
                I am a Full Stack Developer with a passion for building
                meaningful products. I specialize in creating scalable and
                efficient web applications using modern technologies.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src="assets/grid2.png"
              alt="grid-2"
              className="w-full sm:h-[276px] h-fit object-contain"
            />

            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in a variety of languages, frameworks, and tools
                that allow me to build robust and scalable applications
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <RotatingGlobe />
            <div>
              <p className="grid-headtext">
                I’m very flexible with time zone communications & locations
              </p>
              <p className="grid-subtext">
                I&apos;m based in Bengaluru, India and open to remote work
                worldwide.
              </p>
              <a href="#contact" className="w-full">
                <Button
                  name="Contact Me"
                  isBeam
                  containerClass="w-full mt-10"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img
              src="assets/grid3.png"
              alt="grid-3"
              className="w-full sm:h-[266px] h-fit object-contain"
            />

            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code.
                Programming isn&apos;t just my profession—it&apos;s my passion.
                I enjoy exploring new technologies, and enhancing my skills.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div
                className="copy-container cursor-pointer"
                onClick={() => setShowPopup(true)}
              >
                <img src="assets/copy.svg" alt="copy" />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  pranavprakash6410@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Popup Modal */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="relative bg-black border border-gray-700 p-6 rounded-2xl shadow-lg w-[90%] max-w-md text-center space-y-4">
                {/* Cancel Button (top-right inside modal) */}
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <img src="assets/close.svg" alt="close" className="w-6 h-6" />
                </button>

                <h2 className="text-xl font-semibold text-white">
                  Contact Options
                </h2>
                <p className="text-gray-300">Choose how you want to reach me</p>

                <div className="flex flex-col gap-3">
                  {/* Copy Button */}
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 flex items-center justify-center gap-2 bg-gray-950 hover:bg-gray-900 rounded-lg text-white transition-colors"
                  >
                    <img
                      src={hasCopied ? "assets/tick.svg" : "assets/copy.svg"}
                      alt="copy"
                    />
                    <span className="lg:text-lg md:text-base font-medium">
                      {hasCopied ? "Email Copied!" : "Copy Email"}
                    </span>
                  </button>

                  {/* Mailto Button */}
                  <a
                    href="mailto:pranavprakash6410@gmail.com"
                    className="px-4 py-2 flex items-center justify-center gap-2 bg-gray-950 hover:bg-gray-900 rounded-lg text-white transition-colors"
                  >
                    <img
                      className="w-8 h-8"
                      src="assets/email.png"
                      alt="email"
                    />
                    <span className="lg:text-lg md:text-base font-medium">
                      Send Email
                    </span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
