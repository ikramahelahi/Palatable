import svgPaths from "./svg-3w0c2xl2ex";

function Google({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[32px]"} data-name="google">
      <div className="absolute inset-[42.03%_6.25%_16.85%_50.9%]" data-name="vector">
        <svg className="absolute block inset-0 size-full" fill="none" height="13.16" preserveAspectRatio="none" viewBox="0 0 13.7143 13.16" width="13.7143">
          <path d={svgPaths.p3fd9e040} fill="#4285F4" id="vector" />
        </svg>
      </div>
      <div className="absolute inset-[58.65%_19.54%_6.25%_11.01%]" data-name="vector">
        <svg className="absolute block inset-0 size-full" fill="none" height="11.2312" preserveAspectRatio="none" viewBox="0 0 22.2222 11.2312" width="22.2222">
          <path d={svgPaths.p3fc89600} fill="#34A853" id="vector" />
        </svg>
      </div>
      <div className="absolute inset-[30.15%_74.5%_30.36%_6.25%]" data-name="vector">
        <svg className="absolute block inset-0 size-full" fill="none" height="12.637" preserveAspectRatio="none" viewBox="0 0 6.15866 12.637" width="6.15866">
          <path d={svgPaths.p38940700} fill="#FBBC05" id="vector" />
        </svg>
      </div>
      <div className="absolute inset-[6.25%_19.24%_58.65%_11.01%]" data-name="vector">
        <svg className="absolute block inset-0 size-full" fill="none" height="11.2311" preserveAspectRatio="none" viewBox="0 0 22.3175 11.2311" width="22.3175">
          <path d={svgPaths.pbfb5c80} fill="#EB4335" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Right() {
  return (
    <div className="absolute inset-[45.61%_3.91%_24.56%_78.31%]" data-name="Right">
      <svg className="absolute block inset-0 size-full" fill="none" height="11.336" preserveAspectRatio="none" viewBox="0 0 66.6614 11.336" width="66.6614">
        <g id="Right">
          <g id="Battery">
            <path d={svgPaths.p21e39200} id="Rectangle" opacity="0.35" stroke="black" />
            <path d={svgPaths.p3aa28980} fill="black" id="Combined Shape" opacity="0.4" />
            <path d={svgPaths.p5ab6380} fill="black" id="Rectangle_2" />
          </g>
          <path d={svgPaths.p359c6900} fill="black" id="Wifi" />
          <path d={svgPaths.p202a9200} fill="black" id="Mobile Signal" />
        </g>
      </svg>
    </div>
  );
}

function Date() {
  return (
    <div className="absolute inset-[45.18%_83.5%_25.64%_8.92%]" data-name="Date">
      <svg className="absolute block inset-0 size-full" fill="none" height="11.0889" preserveAspectRatio="none" viewBox="0 0 28.4262 11.0889" width="28.4262">
        <g id="Date">
          <g id="9:41">
            <path d={svgPaths.p1218b780} fill="black" />
            <path d={svgPaths.p25dc35c0} fill="black" />
            <path d={svgPaths.p38b62380} fill="black" />
            <path d={svgPaths.p3a930400} fill="black" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-[#800020] h-[44px] left-0 right-0 top-0" data-name="Header">
      <div className="absolute bg-[#800020] h-[38px] left-0 overflow-clip right-0 top-0" data-name="_iPhone mockup status bar">
        <Right />
        <Date />
      </div>
    </div>
  );
}

function InputBox() {
  return (
    <div className="content-stretch flex h-[48px] items-center px-[16px] relative rounded-[8px] shrink-0 w-full" data-name="Input Box">
      <div aria-hidden className="absolute border border-[#800020] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="[word-break:break-word] font-['Google_Sans_Flex:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
        Email address
      </p>
    </div>
  );
}

function EmailField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Email Field">
      <p className="[word-break:break-word] font-['Google_Sans_Flex:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#800020] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
        Email address
      </p>
      <InputBox />
    </div>
  );
}

function InputBox1() {
  return (
    <div className="content-stretch flex h-[48px] items-center px-[16px] relative rounded-[8px] shrink-0 w-full" data-name="Input Box">
      <div aria-hidden className="absolute border border-[#800020] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="[word-break:break-word] font-['Google_Sans_Flex:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
        Password
      </p>
    </div>
  );
}

function PasswordField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Password Field">
      <p className="[word-break:break-word] font-['Google_Sans_Flex:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#800020] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
        Password
      </p>
      <InputBox1 />
    </div>
  );
}

function ForgotPassword() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Forgot Password">
      <p className="[word-break:break-word] absolute font-['Google_Sans_Flex:Medium',sans-serif] font-medium leading-[20px] left-[92px] not-italic text-[#800020] text-[14px] top-0 whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
        Forgot Password?
      </p>
    </div>
  );
}

function Fields() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Fields">
      <EmailField />
      <PasswordField />
      <ForgotPassword />
    </div>
  );
}

function LogInButton() {
  return (
    <div className="bg-[#800020] content-stretch flex h-[56px] items-center justify-center relative rounded-[12px] shrink-0 w-full" data-name="Log In Button">
      <p className="[word-break:break-word] font-['Google_Sans_Flex:SemiBold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#f8ebd8] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
        Log In
      </p>
    </div>
  );
}

function Divider() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Divider">
      <div className="flex-[1_0_0] h-0 min-w-px relative" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 92.5 1" width="92.5">
            <line id="Line" stroke="#D0D5DD" x2="92.5" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Google_Sans_Flex:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
        or continue with
      </p>
      <div className="flex-[1_0_0] h-0 min-w-px relative" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 92.5 1" width="92.5">
            <line id="Line" stroke="#D0D5DD" x2="92.5" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function GoogleButton() {
  return (
    <div className="bg-[#f6e7e7] content-stretch flex flex-[1_0_2px] gap-[8px] h-[29px] items-center justify-center min-w-px relative rounded-[8px]" data-name="Google Button">
      <div aria-hidden className="absolute border border-[#800020] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Google className="overflow-clip relative shrink-0 size-[18px]" />
      <p className="[word-break:break-word] font-['Google_Sans_Flex:SemiBold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#800020] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
        Google
      </p>
    </div>
  );
}

function SocialButtons() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Social Buttons">
      <GoogleButton />
    </div>
  );
}

function BottomText() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Bottom Text">
      <p className="[word-break:break-word] font-['Google_Sans_Flex:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#667085] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
        <span className="leading-[20px]">{`Don't have an account? `}</span>
        <span className="font-['Google_Sans_Flex:SemiBold',sans-serif] font-semibold leading-[20px] text-[#800020]" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
          Sign Up
        </span>
      </p>
    </div>
  );
}

function LoginSheet() {
  return (
    <div className="absolute bg-[#f8ebd8] content-stretch flex flex-col gap-[24px] h-[468px] items-start left-[10px] p-[24px] right-[10px] rounded-[24px] top-[185px]" data-name="Login Sheet">
      <Fields />
      <LogInButton />
      <Divider />
      <SocialButtons />
      <BottomText />
    </div>
  );
}

export default function Login() {
  return (
    <div className="bg-[#800020] relative size-full" data-name="Login">
      <Header />
      <LoginSheet />
      <div className="absolute bg-[#800020] h-[24px] left-0 top-[789px] w-[375px]" data-name="_iPhone mockup home">
        <div className="absolute bg-white bottom-[8px] h-[5px] left-[32.27%] right-[32%] rounded-[100px]" data-name="Home" />
      </div>
      <p className="[word-break:break-word] absolute font-['DM_Serif_Text:Regular',sans-serif] leading-[56px] left-[20px] not-italic right-[20px] text-[#f2d8b0] text-[56px] text-center top-[80px]">Palatable</p>
      <p className="[word-break:break-word] absolute font-['Google_Sans_Flex:Medium',sans-serif] font-medium leading-[20px] left-[20px] not-italic right-[20px] text-[#f2d8b0] text-[14px] text-center top-[142px]" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
        Discover your next favourite meal
      </p>
    </div>
  );
}