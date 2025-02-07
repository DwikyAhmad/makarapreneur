import dummyVision from "@/assets/dummyVision.svg"
import Image from "next/image";

export default function Vision() {
    return (
        <div className="bg-signalBlack px-12 text-linen min-h-[350px] flex justify-between items-center">
            <div className="flex flex-col gap-8">
                <h2 className="headerText text-juneBud">VISION</h2>
                <p className="w-[450px] text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="w-[450px] h-[1.5px] bg-cornflowerBlue"></div>
            </div>
            <div>
                <Image src={dummyVision} alt="dummyVision" className="h-[230px]"/>
            </div>
        </div>
    );
}
