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
      aria-current={isActive ? "true" : undefined}
      className={`group relative block py-2 pl-3 pr-4 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] md:p-0 transition-colors duration-300 ${
        isActive ? "text-gold-light" : "text-[#8f887a] hover:text-gold-light"
      }`}
    >
      {title}
      {/* Animated gold underline — shared layout id so it glides between links */}
      {isActive ? (
        <motion.span
          layoutId="nav-active-underline"
          className="absolute -bottom-1 left-0 right-0 h-[2px] overflow-hidden"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        >
          <span className="block h-full w-full bg-gradient-to-r from-gold-deep via-gold-light to-gold-deep" />
        </motion.span>
      ) : (
        <span className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-gold-deep via-gold to-gold-light transition-transform duration-300 group-hover:scale-x-100" />
      )}
    </Link>
  );
};

export default NavLink;
