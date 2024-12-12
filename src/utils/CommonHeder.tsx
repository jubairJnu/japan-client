import { List, SquarePlus } from "lucide-react";
import Link from "next/link";

type TCommonHeaderProps = {
  link?: string;
  manage: string;
  add?: string;
  list?: string;
};

const CommonHeader = ({ link, manage, add, list }: TCommonHeaderProps) => {
  return (
    <div className="flex justify-between items-center bg-slate-300 p-5 rounded-md   mb-10 font-bold px-10">
      <h1 className="text-[18px] ">{manage}</h1>
      {link && (
        <Link href={link}>
          <div className="flex items-center gap-2 bg-slate-700  p-1 px-3 rounded-xl">
            {add && (
              <div className="text-gray-200 flex gap-2">
                <SquarePlus />
                <button>{add}</button>
              </div>
            )}
            {list && (
              <div className="text-gray-200 flex gap-2">
                <List />
                <button>{list}</button>
              </div>
            )}
          </div>
        </Link>
      )}
    </div>
  );
};

export default CommonHeader;
