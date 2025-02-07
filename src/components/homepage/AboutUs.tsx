import Image from "next/image";
import { Button } from "../ui/button";
import aboutUsDummy from "@/assets/aboutUsDummy.svg";

interface Variant {
    variant ?: string;
}

export default function AboutUs({ variant }: Variant) {
    return (
        <div className={`text-linen p-12 flex justify-between items-center ${variant === 'secondary' ? 'text-signalBlack bg-linen py-12' : 'bg-signalBlack'}`} >
            <div className="flex flex-col w-[500px] gap-8">
                <h1
                    className={`headerText ${variant !== 'secondary' ? 'bg-gradient-to-r from-cornflowerBlue px-8 rounded-2xl py-2 text-lg' : 'text-2xl'} w-min text-nowrap`}
                >
                    ABOUT US
                </h1>
                <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
                <div className={`${variant === 'secondary' ? 'hidden' : 'block'}`}>
                    <Button className="rounded-3xl px-6">Learn More</Button>
                </div>
            </div>
            <div>
                <Image src={aboutUsDummy} alt="aboutUsDummy" className={`${variant === 'secondary' && 'h-[300px]'}`} />
            </div>
        </div>
    );
}
