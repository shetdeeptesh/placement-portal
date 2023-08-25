import React from "react";

const Loading: React.FC = () => {
  return (
    <div
      className="flex justify-center  items-center h-full w-full absolute"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
};

export default Loading;
