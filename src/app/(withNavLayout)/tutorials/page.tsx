"use client";

import Image from "next/image";
import tutorialImg from "@/asset/tutorial.png";
import YouTube from "react-youtube";

const tutorialData = [
  {
    id: "1",
    link: "rGrBHiuPlT0",
  },
  {
    id: "2",
    link: "Z9cw4Z1x4y8",
  },
  {
    id: "3",
    link: "JnoZE51WZg4",
  },
  {
    id: "4",
    link: "k74yjmfFb_A",
  },
  {
    id: "5",
    link: "KUIWRsVZZZA",
  },
  {
    id: "6",
    link: "ZGGufccTLso",
  },
  {
    id: "7",
    link: "W0n-ODPwtzA",
  },
  {
    id: "8",
    link: "p9PEIsOzJ5E",
  },
  {
    id: "9",
    link: "Pc86Xg2MX-U",
  },
];

const opts = {
  height: "190",
  width: "340",
  playerVars: {
    autoplay: 0,
  },
};

const TutorialsPage = () => {
  return (
    <div className="my-5 w-full max-w-7xl container px-3 mx-auto">
      <div className="flex items-center gap-5 justify-center w-full max-w-40 mx-auto pb-3 border-b-2 rounded-b-md border-violet-700">
        <Image src={tutorialImg} alt="lesson-img" width={50} height={50} />
        <h1 className="text-xl text-center font-bold ">Tutorials</h1>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5">
        {tutorialData?.map((item) => (
          <div key={item.id}>
            <YouTube videoId={item?.link} opts={opts} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialsPage;
