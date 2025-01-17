"use client";

import { Button } from "@/components/ui/button";
import { MenuIcon, ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { InfiniteCarousel } from "@/components/global/Infinite-carousel";
import { InfiniteCarousel2 } from "@/components/global/Infinite-carousel-2";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080808] text-white relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/opal-logo.svg" // this file exists in the public folder.
                width={30}
                height={30}
                alt="veil Logo"
                priority
              />
              <span className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-500 inline-block text-transparent bg-clip-text">
                Veil
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Button variant="secondary">
                <Link href="/dashboard">Try veil</Link>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden border-t border-white/10 bg-black/50 backdrop-blur-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-2 px-4 py-4">
                <Button variant="secondary" className="w-full justify-center">
                  <Link href="/dashboard">Try Veil</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="relative pt-16">
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-6xl text-center"
            >
              <h1 className="text-4xl lg:text-5xl xl:text-5xl tracking-tight font-medium p-5 bg-gradient-to-b from-white to-zinc-500 inline-block text-transparent bg-clip-text">
                Effortlessly add text behind an image.
              </h1>
              <p className="text-lg md:text-lg text-gray-400 mb-8 max-w-3xl mx-auto leading-5">
                Enhance your visuals effortlessly with seamless text overlays
                that captivate and inspire.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Button className="rounded-full" size="lg" asChild>
                  <Link href="/dashboard">
                    Get Started
                    <ArrowUpRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section>
          <InfiniteCarousel />
          <InfiniteCarousel2 />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-base md:text-2xl lg:text-[23.97px] text-gray-400 mt-10 mb-10">
              veil uses advanced AI to effortlessly place text behind any image,
              creating visually stunning designs and empowering creators and
              businesses to craft captivating visuals with ease.
            </p>
          </div>
        </section>

        {/* Safety Section */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="mt-2 text-4xl sm:text-5xl bg-gradient-to-b from-white to-zinc-500 inline-block text-transparent bg-clip-text">
                Built with safety in mind
              </h2>
              <p className="mt-4 text-lg text-gray-400 mb-8">
                Our AI seamlessly integrates text into images, ensuring visually
                appealing, ethical, and privacy-conscious content creation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mx-auto max-w-5xl rounded-2xl bg-[#171717] px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
            >
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-medium text-xl sm:text-2xl mb-4">
                  Enhance Instagram with AI for stunning text-visual content!
                </h2>
                <div className="mt-10">
                  <Button
                    className="rounded-full bg-white text-black hover:bg-gray-200"
                    size="lg"
                    asChild
                  >
                    <Link href="/dashboard">
                      Try veil
                      <ArrowUpRight className="ml-2" size={18} />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <div>
          <div className="flex flex-col lg:flex-row justify-between  py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl xl:text-5xl tracking-tight font-medium bg-gradient-to-b from-white to-zinc-500 text-transparent bg-clip-text">
                Veil is Open Source
              </h1>
              <p className="text-lg text-gray-400 mt-5 mb-8 leading-6">
                100% of the code of the app is public on Github - check it out
                and contribute!
              </p>
            </div>
            <div className="mt-6 lg:mt-0">
              <Button
                className="rounded-full bg-white text-black hover:bg-gray-200"
                size="lg"
                asChild
              >
                <Link href="/dashboard" className="flex items-center">
                  Github
                  <Github className="ml-2" size={18} />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center text-gray-400">
              <p>
                &copy; 2025 Veil. All rights reserved.{" "}
                <a
                  href="https://www.linkedin.com/in/rakibul-islam-sarkar-356aa5256/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-400"
                >
                  Rakibul Islam Sarkar
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
