import config from "@/config";

import lessonImg from "@/asset/lesson.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaLocationArrow } from "react-icons/fa";
import Link from "next/link";

type TLesson = {
  _id: string;
  name: string;
  number: number;
  vocabCount: number;
};

const LessongPage = async () => {
  const res = await fetch(`${config.api_url}/lessons`, {
    cache: "no-store",
  });

  const lessons = await res.json();

  return (
    <div className="mt-5 w-full max-w-7xl container mx-auto px-3 mx-auto">
      <div className="flex items-center gap-5 justify-center w-full max-w-40 mx-auto pb-3 border-b-2 rounded-b-md border-violet-700">
        <Image src={lessonImg} alt="Lesson" width={50} height={50} />
        <h1 className="text-xl text-center font-bold ">Lessons</h1>
      </div>

      {/* grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 justify-items-center">
        {lessons?.data?.map((item: TLesson) => (
          <Link key={item._id} href={`/lessons/${item.number}`}>
            <div className="w-[380px] h-60 rounded-lg drop-shadow-lg border bg-[#f7f7f7] flex flex-col items-center justify-between pt-5 pb-5 ">
              <p className="text-xl font-bold text-violet-700 ">{item.name}</p>
              <div className="flex justify-between gap-10">
                <p className="bg-[#fafafa] drop-shadow-sm px-2 py-1 rounded-md text-gray-700">
                  Lesson No : {item.number}
                </p>
                <p className="bg-[#fafafa] drop-shadow-sm px-2 py-1 rounded-md text-gray-700">
                  Vocabulary Count : {item.vocabCount}
                </p>
              </div>

              <Button className="w-full max-w-60 mx-auto bg-violet-800 hover:bg-violet-500">
                Learn Now
                <FaLocationArrow />
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LessongPage;
