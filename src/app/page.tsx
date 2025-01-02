"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowUpRight, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { InfiniteCarousel } from "@/components/global/Infinite-carousel";
import { InfiniteCarousel2 } from "@/components/global/Infinite-carousel-2";
import { useState } from "react";

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    }
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md px-10">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold">Opal</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Button>Login</Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>
      {/* Mobile menu with Framer Motion */}
      {menuOpen && (
        <motion.div
          className="md:hidden absolute top-16 left-0 right-0 bg-white p-4 shadow-lg"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Button onClick={() => alert("Login clicked")}>Login</Button>
          <Button variant="ghost" className="mt-2">
            Sign Up
          </Button>
        </motion.div>
      )}
    </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 overflow-hidden">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto text-center"
          >
            <h1 className="text-4xl lg:text-5xl xl:text-5xl tracking-tight font-medium p-5 bg-gradient-to-b from-white to-zinc-500 inline-block text-transparent bg-clip-text">
              Effortlessly add text behind an image.
            </h1>
            <p className="text-lg md:text-lg text-gray-400 mb-8 max-w-3xl mx-auto leading-5">
              Enhance your visuals effortlessly with seamless text overlays that
              captivate and inspire.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="rounded-full px-8 py-5" asChild>
                <Link href="/dashboard">
                  Get Started <ArrowUpRight className="ml-2" size={18} />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section>
        <InfiniteCarousel />
        <InfiniteCarousel2 />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-base md:text-2xl lg:text-[23.97px] md:tracking-[-0.13485px] md:leading-[28px] lg:tracking-[-0.13485px] lg:leading-[28px] tracking-[-0.3px] leading-[20px] mt-10 mb-10 text-gray-400">
            Opal uses advanced AI to effortlessly place text behind any image,
            creating visually stunning designs and empowering creators and
            businesses to craft captivating visuals with ease.
          </p>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-24">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl sm:text-center"
          >
            <h2 className="mt-2 font-soehne text-4xl sm:text-5xl bg-gradient-to-b from-white to-zinc-500 inline-block text-transparent bg-clip-text">
              Built with safety in mind
            </h2>
            <p className=" mt-4 text-lg text-gray-400 mb-8">
            Our AI seamlessly integrates text into images, ensuring visually appealing, ethical, and privacy-conscious content creation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#171717] rounded-lg mx-auto w-full max-w-4xl sm:max-w-2xl lg:max-w-5xl min-h-[400px] sm:min-h-[450px] md:min-h-[500px] px-4 lg:px-0 py-12 sm:py-16 md:py-20 flex items-center justify-center my-24"
        >
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0">
            <div className="col-span-12 flex flex-col gap-2 md:col-span-8 md:col-start-3">
              <h2 className="font-medium text-xl sm:text-2xl md:text-[36px] leading-[32px] sm:leading-[36px] md:leading-[43.2px] tracking-[-0.2px] sm:tracking-[-0.3px] md:tracking-[-0.36px] mb-4 w-full sm:w-3/4 flex justify-center mx-auto text-center text-h4 text-balance">
              Enhance Instagram with AI for stunning text-visual content!{" "}
              </h2>
              <div className="flex items-center justify-center flex-row gap-1 sm:gap-2 md:gap-3 flex-wrap">
                <Button
                  className="bg-white text-black px-4 py-3 rounded-full text-base sm:text-sm font-medium transition hover:bg-gray-200"
                  asChild
                >
                  <Link href="/dashboard" className="flex">
                    Try Opal <ArrowUpRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
