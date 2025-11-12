import { useRef, useEffect } from "react";
import Globe from "react-globe.gl";

function RotatingGlobe() {
  const globeRef = useRef();

  useEffect(() => {
    if (!globeRef.current) return;

    const globeObj = globeRef.current;
    const controls = globeObj.controls();
    controls.enableZoom = true;
    controls.enablePan = false;

    let animationFrameId;
    const animate = () => {
      globeObj.scene().rotation.y += 0.0025; // smooth + subtle rotation
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      className="relative flex justify-center items-center p-6 rounded-3xl 
      bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-800/90 
      shadow-xl backdrop-blur-xl w-full sm:h-[360px] h-fit"
    >
      {/* Very subtle ambient glow */}
      <div
        className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full 
        bg-blue-500/10 blur-2xl"
      />

      <Globe
        ref={globeRef}
        height={340}
        width={340}
        backgroundColor="rgba(0,0,0,0)"
        backgroundImageOpacity={0.7}
        showAtmosphere
        atmosphereColor="lightskyblue"
        atmosphereAltitude={0.25}
        showGraticules
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        htmlLatLng={(d) => [d.lat, d.lng]}
        htmlOcclude={false}
        // 👇 give pins altitude so their tip sits exactly on the spot
        htmlAltitude={() => 0.01}
        htmlElementsData={[
          { lat: 12.9629, lng: 77.5775, name: "Bengaluru, India" },
        ]}
        htmlElement={(d) => {
          const container = document.createElement("div");
          container.style.display = "flex";
          container.style.flexDirection = "column";
          container.style.alignItems = "center";
          container.style.transform = "translate(-50%, -100%)";

          // Pin
          const pin = document.createElement("img");
          pin.src = "https://cdn-icons-png.flaticon.com/512/684/684908.png";
          pin.style.width = "24px";
          pin.style.height = "24px";
          pin.style.filter = "drop-shadow(0px 0px 3px rgba(255,0,0,0.6))";

          // Label
          const label = document.createElement("div");
          label.textContent = d.name;
          label.style.marginTop = "4px";
          label.style.padding = "3px 8px";
          label.style.borderRadius = "6px";
          label.style.background = "rgba(0,0,0,0.65)";
          label.style.color = "#FFD700";
          label.style.fontSize = "12px";
          label.style.fontWeight = "600";
          label.style.whiteSpace = "nowrap";
          label.style.textAlign = "center";
          label.style.backdropFilter = "blur(4px)";
          label.style.boxShadow = "0 0 4px rgba(255, 215, 0, 0.4)";

          container.appendChild(pin);
          container.appendChild(label);

          return container;
        }}
      />
    </div>
  );
}

export default RotatingGlobe;
