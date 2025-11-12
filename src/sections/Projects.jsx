import gsap from "gsap";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { myProjects } from "../constants/index.js";
import CanvasLoader from "../components/CanvasLoader.jsx";
import DemoComputer from "../components/DemoComputer.jsx";
import ProjectDetailPage from "../components/ProjectDetailPage.jsx";

const projectCount = myProjects.length;
const INTERVAL = 15_000; // 15 seconds
const CIRCUMFERENCE = 2 * Math.PI * 20; // for r=20 (circle radius)

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const progressCircleRef = useRef(null);
  const timerRef = useRef(null);
  const tweenRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setIsPlaying(false); // Pause the carousel when modal is open
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setIsPlaying(true);
  };

  const restartTimer = () => {
    // Clear old interval/tween
    if (timerRef.current) clearTimeout(timerRef.current);
    if (tweenRef.current) tweenRef.current.kill();

    // Reset circle to full (0 offset = full)
    gsap.set(progressCircleRef.current, { strokeDashoffset: 0 });

    if (isPlaying) {
      // Animate from full to empty
      tweenRef.current = gsap.fromTo(
        progressCircleRef.current,
        { strokeDashoffset: 0 },
        {
          strokeDashoffset: CIRCUMFERENCE,
          duration: INTERVAL / 1000,
          ease: "none",
        },
      );

      // Change project when done
      timerRef.current = setTimeout(() => {
        handleNavigation("next");
      }, INTERVAL);
    }
  };

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      const newIndex =
        direction === "previous"
          ? prevIndex === 0
            ? projectCount - 1
            : prevIndex - 1
          : prevIndex === projectCount - 1
            ? 0
            : prevIndex + 1;

      return newIndex;
    });
  };

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [selectedProjectIndex, isPlaying]);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <>
      {modalOpen && (
        <ProjectDetailPage project={currentProject} onClose={handleClose} />
      )}
      <section id="project" className="c-space my-20 relative">
        <div className="flex items-center justify-between">
          <p className="head-text">My Selected Work</p>

          {/* Countdown Circle (Top Right Corner) */}
          <div className="relative w-12 h-12 mr-5">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 48 48"
            >
              {/* Background circle */}
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="4"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                ref={progressCircleRef}
                cx="24"
                cy="24"
                r="20"
                stroke="limegreen"
                strokeWidth="4"
                fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset="0"
                strokeLinecap="round"
              />
            </svg>

            {/* Play / Pause button */}
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="absolute inset-0 flex items-center justify-center text-white"
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
          {/* Project Details */}
          <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
            <div className="absolute top-0 right-0">
              <img
                src={currentProject.spotlight}
                alt="spotlight"
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>

            <div
              className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
              style={currentProject.logoStyle}
            >
              <img
                className="w-10 h-10 shadow-sm"
                src={currentProject.logo}
                alt="logo"
              />
            </div>

            <div className="flex flex-col gap-5 text-white-600 my-5">
              <p className="text-white text-2xl font-semibold animatedText">
                {currentProject.title}
              </p>
              <p className="animatedText">{currentProject.desc}</p>
              <p className="animatedText">{currentProject.subdesc}</p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-5">
              <div className="flex items-center gap-3">
                {currentProject.tags.map((tag, index) => (
                  <div key={index} className="tech-logo">
                    <img src={tag.path} alt={tag.name} />
                  </div>
                ))}
              </div>

              <button
                className="flex items-center gap-2 cursor-pointer text-white-600"
                onClick={() => handleOpen()}
                // href={currentProject.href}
                // target="_blank"
                // rel="noreferrer"
              >
                <p>See more details</p>
                <img
                  src="/assets/arrow-up.png"
                  alt="arrow"
                  className="w-3 h-3"
                />
              </button>
            </div>

            {/* Arrows + Dots */}
            <div className="flex justify-between items-center mt-7">
              <button
                className="arrow-btn"
                onClick={() => handleNavigation("previous")}
              >
                <img src="/assets/left-arrow.png" alt="left arrow" />
              </button>

              <div className="flex items-center justify-center gap-2">
                {myProjects.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-3 h-3 rounded-full bg-white transition-shadow ${
                      idx === selectedProjectIndex
                        ? "shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
                        : ""
                    }`}
                    style={{
                      opacity: idx === selectedProjectIndex ? 1 : 0.5,
                    }}
                  />
                ))}
              </div>

              <button
                className="arrow-btn"
                onClick={() => handleNavigation("next")}
              >
                <img
                  src="/assets/right-arrow.png"
                  alt="right arrow"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          {/* 3D Model */}
          <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
            <Canvas>
              <ambientLight intensity={Math.PI} />
              <directionalLight position={[10, 10, 5]} />
              <Center>
                <Suspense fallback={<CanvasLoader />}>
                  <group
                    scale={2}
                    position={[0, -3, 0]}
                    rotation={[0, -0.1, 0]}
                  >
                    <DemoComputer texture={currentProject.texture} />
                  </group>
                </Suspense>
              </Center>
              <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
            </Canvas>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
