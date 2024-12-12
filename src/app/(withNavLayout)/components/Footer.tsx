import logo from "@/asset/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-50 pt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:justify-items-center mt-10">
        <div>
          <Link href="/">
            <Image src={logo} alt="logo" width={200} height={100} />
          </Link>
        </div>

        {/* link */}

        <div className="px-5 md:px-0">
          <p className="text-violet-500 text-lg font-bold md:text-center">
            {" "}
            Important Links{" "}
          </p>
          <ul>
            <li className="font-semibold text-gray-800">
              <Link href="/">About Us</Link>
            </li>
            <li className="font-semibold text-gray-800">
              <Link href="/">Popular Course</Link>
            </li>
            <li className="font-semibold text-gray-800">
              <Link href="/">Success Story</Link>
            </li>
          </ul>
        </div>

        {/* contact */}

        <div className="px-5 md:px-0">
          <p className="text-violet-500 text-lg font-bold md:text-center">
            {" "}
            Follow Us On{" "}
          </p>
          <div className="flex gap-5 items-center mt-5">
            <span className="text-2xl p-3 bg-slate-200 rounded-full">
              <FaFacebook />
            </span>
            <span className="text-2xl p-3 bg-slate-200 rounded-full">
              <FaTwitter />
            </span>

            <span className="text-[28px] p-3 bg-slate-200 rounded-full">
              <FaInstagram />
            </span>
          </div>
        </div>
      </div>
      {/*  */}
      <p className="text-center py-2 mt-4">All Copyright reserved</p>
    </div>
  );
};

export default Footer;
