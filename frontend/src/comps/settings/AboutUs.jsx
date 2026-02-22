import { BsRocketTakeoff } from "react-icons/bs";
import { BrowserOpenURL } from "../../../wailsjs/runtime/runtime";
import pkg from "../../../package.json";
import { LuHeart, LuStar } from "react-icons/lu";

const AboutUs = () => {
  const onOpenGithub = () => {
    BrowserOpenURL("https://github.com/aunjaffery/restmate");
  };
  return (
    <div className="px-6 pb-4 relative">
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="flex justify-start items-end h-full w-full text-txtsec opacity-60">
          <BsRocketTakeoff
            size="160"
            className="hover:text-accent transition-all  duration-300 ease-in-out transform  hover:translate-x-[20px] hover:translate-y-[-20px]"
          />
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-lit font-bold text-2xl tracking-wider">Restmate</p>
        <p className="text-xs text-txtsec">version {pkg.version}</p>
        <p className="text-xs text-txtsec mt-2 tracking-wider">
          Restmate is a blazing fast, lightweight REST API client built for developers who need speed and efficiency without compromising system performance.
          Simplify your API testing and integration with ease.
        </p>
        <p className="text-xs text-txtsec mt-2 tracking-wider flex items-center justify-start gap-1">
          Help us keep it blazing fast - drop a
          <span className="text-yellow-400 flex items-center">
            <LuStar size={12} />
          </span>
          on Github
        </p>
        <p className="text-xs text-txtsec mt-1 tracking-wider hover:text-blue-400 hover:underline cursor-pointer"
          onClick={onOpenGithub}
        >
          https://github.com/aunjaffery/restmate
        </p>
        <p className="text-xs text-txtsec mt-4 tracking-wider flex items-center justify-start gap-1">
          Made with
          <span className="text-accent flex items-center">
            <LuHeart size={12} />
          </span>
          in Pakistan
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
