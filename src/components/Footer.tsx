import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <>
            <footer className="bg-black text-white pb-15">
                {/* Top Section */}
                <div className="px-18 flex w-full py-15">
                    {/* 1st Column */}
                    <div className="w-full space-y-3">
                        <h1 className="font-bold text-lg leading-snug">
                            Contact us today for a custom <br />
                            consultation.
                        </h1>

                        <div className="text-[#48bdcb] text-lg">734-744-6061</div>

                        <button className="bg-[#36b1bf] px-8 py-4 font-bold mt-6 hover:text-black transition-colors duration-300 ease-in-out">
                            EMAIL US
                        </button>
                    </div>

                    {/* 2nd Column */}
                    <div className="w-full flex flex-col space-y-3">
                        <Link
                            href="/industries"
                            className="text-lg text-[#1badbe] hover:text-white transition-colors duration-300 ease-in-out"
                        >
                            Industries
                        </Link>

                        <Link
                            href="/who-we-are"
                            className="text-lg text-[#1badbe] hover:text-white transition-colors duration-300 ease-in-out"
                        >
                            Who We Are
                        </Link>

                        <Link
                            href="/what-we-do"
                            className="text-lg text-[#1badbe] hover:text-white transition-colors duration-300 ease-in-out"
                        >
                            What We Do
                        </Link>
                    </div>

                    {/* 3rd Column */}
                    <div className="w-full">
                        <div>
                            <Image
                                src="/images/Full-service-logo.png"
                                alt="Full Service Agency"
                                width={160}
                                height={80}
                                className="h-13 w-auto"
                                priority
                            />
                        </div>

                        <div className="mt-12 space-y-2 text-lg">
                            <div className="font-bold">Full-Service Agency Group, Inc.</div>
                            <div className="font-light">27555 Executive Dr # 100</div>
                            <div className="font-light">Farmington Hills, MI 48331</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="px-12">
                    <div className="w-full border-t-1 text-center pt-6 text-sm">
                        Copyright © 2025 Full Service Agency Group | All Rights Reserved.
                    </div>
                </div>
            </footer>
        </>
    );
}
