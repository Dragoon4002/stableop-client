
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen p-16 overflow-hidden">
      {/* Navbar */}
      <div className="flex justify-end">
        <Link href={"/"} className="border border-white py-2 px-4 rounded-2xl">Try Demo </Link>
      </div>
      {/* Body */}
      <div className="flex h-full items-end p-32 relative">
        <div className="w-6/12">
          <div className="text-9xl font-poppins">
            StableOp
          </div>
          <p className="w-full text-xl mb-10 mt-4">
            powered by PyUSD
          </p>
          <div className="border border-white rounded-4xl py-2 px-4 w-fit text-2xl">
            For The Finternet
          </div>
        </div>
        <img src={"/3dlogo.png"} alt="" height={1200} width={1200} className="absolute -bottom-80 -right-80 opacity-80 rotate-12"/>
      </div>
    </div>
  );
}
