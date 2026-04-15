import React from "react";

const AuthLayoutStyle = () => {
  return (
    <div className="bg-[linear-gradient(148deg,#001736_0%,#002B5B_100%)] h-full w-full p-12 rounded-l-lg flex flex-col gap-12 justify-between">
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-2">
          <img src="/images/Logo.svg" alt="" />
          <h3 className="text-2xl font-bold">Analytica</h3>
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-[30px] font-extrabold">
            Unlock the power of{" "}
            <span className="text-[#58FBDA]">precision data</span> storytelling.
          </div>
          <p className="text-[#7594CA]">
            Step into a high-tech observatory designed for the next generation
            of data architects.
          </p>
        </div>
      </div>

      <div className="bg-[rgba(255,255,255,0.7)] p-6 rounded-lg flex flex-col gap-6">
        <div className="flex gap-4">
          <span>
            <img src="/images/chatbot.svg" alt="" />
          </span>{" "}
          <p className="text-[#58FBDA] text-[14px] tracking-[1.4px]">
            AI Mentor Insight
          </p>
        </div>

        <p>
          "Analyzing your learning trajectory... users who start today reach
          data proficiency 40% faster."
        </p>
      </div>
    </div>
  );
};

export default AuthLayoutStyle;
