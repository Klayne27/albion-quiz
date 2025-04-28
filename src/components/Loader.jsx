import React from "react";

const Loader = ({ size = 100, color = "#D8A54D", className }) => {
  const spinnerSvg = (
    <svg
      fill="hsl(228, 97%, 42%)"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={{ color: color }}
      role="status"
      aria-label="Loading..."
      className={className}
    >
      <defs>
        <linearGradient id="RadialGradient8932">
          <stop offset="0%" stop-color="currentColor" stop-opacity="1" />
          <stop offset="100%" stop-color="currentColor" stop-opacity="0.25" />
        </linearGradient>
      </defs>
      <style>{`
        @keyframes spin8932 {
            to {
                transform: rotate(360deg);
            }
        }

        #circle8932 {
            transform-origin: 50% 50%;
            stroke: url(#RadialGradient8932);
            fill: none;
            animation: spin8932 .5s infinite linear;
            /* The ':' at the end in your provided SVG was likely a typo, removed here */
        }
      `}</style>
      <circle cx="10" cy="10" r="8" id="circle8932" stroke-width="2" />
    </svg>
  );

  return (
    <div
      className="relative w-full h-screen flex justify-center items-center bg-gray-900 overflow-hidden"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {spinnerSvg}
    </div>
  );
};

export default Loader;
