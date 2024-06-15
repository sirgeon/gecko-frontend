"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto mt-20 px-4 md:mt-24 lg:mt-36">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        Kernel the Leopardgecko
      </h1>
      <h2 className="text-lg md:text-xl lg:text-2xl mb-6">
        Kernel is a Leopardgecko native to dry and semi-desert areas in
        Afghanistan, Iraq, Iran, and northwest India. He is still very young and
        shy but he is improving daily and getting used to his new home.
      </h2>
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-2xl">
        <Image
          className="mt-8 rounded-xl cursor-pointer"
          width={1920}
          height={1080}
          src={`/images/kernel-hero.jpg`}
          alt="Kernel the Leopardgecko"
          layout="responsive"
          onClick={openModal}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                className="rounded-xl"
                width={1920}
                height={1080}
                src={`/images/kernel-hero.jpg`}
                alt="Kernel the Leopardgecko"
                layout="responsive"
              />
              <button
                className="absolute top-2 right-2 w-10 h-10 mr-3 pt-[3px] items-center justify-center flex text-4xl bg-white rounded-full p-2"
                onClick={closeModal}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
