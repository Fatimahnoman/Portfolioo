"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import SectionHeader from "./SectionHeader";

// NAYA CERTIFICATE ADD KARNE KE LIYE:
// 1. Certificate ki image ko "public" folder mein daalein
// 2. Neeche array mein ek naya object copy kar ke apni details likhein
export const certificates = [
  {
    title: "Registered Freelancer",
    issuer: "Pakistan Freelancers Association (PAFLA)",
    image: "/pafla-certificate.jpeg",
  },
];

type Certificate = (typeof certificates)[number];

const CertificatesSection = () => {
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section
      id="certificates"
      className="relative bg-[#070512] py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-500/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          index="07"
          label="Credentials"
          titleA="Professional"
          titleB="Certificates"
          subtitle="Verified credentials and professional recognition."
        />

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              onClick={() => setSelected(cert)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="cursor-pointer"
            >
              <SpotlightCard className="h-full bg-[#120e20] border border-white/[0.06] hover:border-violet-500/30 rounded-2xl p-3 transition-all duration-500 hover:shadow-xl hover:shadow-violet-500/10 overflow-hidden">
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/[0.05]">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-violet-500/90 flex items-center justify-center shadow-lg shadow-violet-500/30 scale-75 group-hover:scale-100 transition-transform duration-500">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </div>
                </div>
                {/* Verified badge */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-violet-500/20 flex items-center gap-1">
                  <svg className="w-3 h-3 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  <span className="text-violet-400 text-[10px] font-bold uppercase tracking-wider">Verified</span>
                </div>
              </div>

              {/* Info */}
              <div className="pt-4 pb-2 px-1">
                <h3 className="text-white font-semibold text-sm sm:text-base mb-1 group-hover:text-violet-400 transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">{cert.issuer}</p>
              </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              aria-label="Close certificate view"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.1] hover:border-violet-500/40 hover:bg-violet-500/10 flex items-center justify-center transition-all duration-300 z-10"
            >
              <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[80vh]"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#120e20] border border-violet-500/20 shadow-2xl shadow-violet-500/10">
                <Image src={selected.image} alt={selected.title} fill sizes="(max-width: 896px) 100vw, 896px" className="object-contain" priority />
              </div>
              <div className="text-center mt-4">
                <p className="text-white font-semibold">{selected.title}</p>
                <p className="text-gray-500 text-sm">{selected.issuer}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;
