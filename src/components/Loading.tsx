import React from "react";

const LoadingDots = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-13rem)]">
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-4 h-4 bg-gray-100 rounded-full"
            style={{
              animation: `waveBounceBall 1.8s ${
                index * 0.2
              }s infinite ease-in-out, colorChange 10s ease-in-out infinite`,
            }}
          ></div>
        ))}
      </div>
      <style jsx>{`
        @keyframes waveBounceBall {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes colorChange {
          0%,
          100% {
            background-color: #f3f4f6; /* gray-100 */
          }
          50% {
            background-color: #2563eb; /* blue-600 */
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingDots;
