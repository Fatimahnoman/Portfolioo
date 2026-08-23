"use client";
import Link from "next/link";
import { motion } from "framer-motion";

type NavLinkProps = {
  href: string;
  title: string;
  onClick?: () => void;
  isActive?: boolean;
};

const NavLink = ({ href, title, onClick, isActive }: NavLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block py-2 pl-3 pr-4 sm:text-xl rounded md:p-0 hover:text-white relative group transition-colors duration-300 ${
        isActive ? "text-violet-400" : "text-[#ADB7BE]"
      }`}
    >
      {title}
      <motion.span
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
};

export default NavLink;
