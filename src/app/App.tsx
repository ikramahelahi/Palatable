import { useState } from "react";
import svgPaths from "../imports/Login/svg-3w0c2xl2ex";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <div className={className ?? "overflow-clip relative size-[32px]"}>
      <div className="absolute inset-[42.03%_6.25%_16.85%_50.9%]">
        <svg className="absolute block inset-0 size-full" fill="none" height="13.16" preserveAspectRatio="none" viewBox="0 0 13.7143 13.16" width="13.7143">
          <path d={svgPaths.p3fd9e040} fill="#4285F4" />
        </svg>
      </div>
      <div className="absolute inset-[58.65%_19.54%_6.25%_11.01%]">
        <svg className="absolute block inset-0 size-full" fill="none" height="11.2312" preserveAspectRatio="none" viewBox="0 0 22.2222 11.2312" width="22.2222">
          <path d={svgPaths.p3fc89600} fill="#34A853" />
        </svg>
      </div>
      <div className="absolute inset-[30.15%_74.5%_30.36%_6.25%]">
        <svg className="absolute block inset-0 size-full" fill="none" height="12.637" preserveAspectRatio="none" viewBox="0 0 6.15866 12.637" width="6.15866">
          <path d={svgPaths.p38940700} fill="#FBBC05" />
        </svg>
      </div>
      <div className="absolute inset-[6.25%_19.24%_58.65%_11.01%]">
        <svg className="absolute block inset-0 size-full" fill="none" height="11.2311" preserveAspectRatio="none" viewBox="0 0 22.3175 11.2311" width="22.3175">
          <path d={svgPaths.pbfb5c80} fill="#EB4335" />
        </svg>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 h-11">
      <span className="text-black text-[15px] font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <path d={svgPaths.p202a9200} fill="black" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 37 11" fill="none">
          <path d={svgPaths.p359c6900} fill="black" />
        </svg>
        <svg width="25" height="11" viewBox="0 0 66.6614 11.336" fill="none">
          <path d={svgPaths.p21e39200} opacity="0.35" stroke="black" />
          <path d={svgPaths.p3aa28980} fill="black" opacity="0.4" />
          <path d={svgPaths.p5ab6380} fill="black" />
        </svg>
      </div>
    </div>
  );
}

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#800020] flex items-center justify-center">
      <div className="relative w-full max-w-[375px] min-h-screen bg-[#800020] flex flex-col">

        {/* Status Bar */}
        <StatusBar />

        {/* App Title */}
        <div className="flex flex-col items-center pt-9 pb-6 px-5">
          <h1
            className="text-[#f2d8b0] text-center leading-[1.1] mb-3"
            style={{ fontFamily: "'DM Serif Text', serif", fontSize: "56px" }}
          >
            Palatable
          </h1>
          <p
            className="text-[#f2d8b0] text-[14px] text-center leading-[20px]"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
          >
            Discover your next favourite meal
          </p>
        </div>

        {/* Login Sheet */}
        <div className="mx-[10px] rounded-[24px] bg-[#f8ebd8] p-6 flex flex-col gap-6">

          {/* Fields */}
          <div className="flex flex-col gap-4 w-full">

            {/* Email Field */}
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-[#800020] text-[12px] leading-[16px]"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
                htmlFor="email"
              >
                Email address
              </label>
              <div className="relative h-[48px] rounded-[8px] border border-[#800020] flex items-center px-4 bg-transparent">
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-[14px] leading-[20px] text-[#1a1a1a] placeholder:text-[#667085]"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-[#800020] text-[12px] leading-[16px]"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative h-[48px] rounded-[8px] border border-[#800020] flex items-center px-4 bg-transparent">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-[14px] leading-[20px] text-[#1a1a1a] placeholder:text-[#667085]"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="w-full flex justify-end">
              <button
                className="text-[#800020] text-[14px] leading-[20px] cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Log In Button */}
          <button
            className="w-full h-[56px] bg-[#800020] rounded-[12px] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span
              className="text-[#f8ebd8] text-[16px] leading-[24px]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
            >
              Log In
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-[#D0D5DD]" />
            <span
              className="text-[#667085] text-[12px] leading-[16px] shrink-0"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
            >
              or continue with
            </span>
            <div className="flex-1 h-px bg-[#D0D5DD]" />
          </div>

          {/* Google Button */}
          <button
            className="w-full h-[44px] bg-[#f6e7e7] rounded-[8px] border border-[#800020] flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <GoogleIcon className="overflow-clip relative shrink-0 size-[18px]" />
            <span
              className="text-[#800020] text-[14px] leading-[20px]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
            >
              Google
            </span>
          </button>

          {/* Bottom Text */}
          <div className="w-full flex justify-center">
            <p
              className="text-[14px] leading-[20px] text-[#667085]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
            >
              {"Don't have an account? "}
              <button
                className="text-[#800020] cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="flex justify-center pb-2 pt-6 mt-auto">
          <div className="w-[134px] h-[5px] bg-black rounded-full opacity-20" />
        </div>

      </div>
    </div>
  );
}
