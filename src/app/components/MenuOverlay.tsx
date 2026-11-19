"use client";
import React from "react";
import NavLink from "./NavLink";
import { motion } from "framer-motion";

type LinkItem = {
  path: string;
  title: string;
  id?: string;
};

type MenuOverlayProps = {
  links: LinkItem[];
  onClose?: () => void;
  activeId?: string;
};

const MenuOverlay = ({ links, onClose, activeId }: MenuOverlayProps) => {
  return (
    <motion.nav
      aria-label="Mobile navigation"
      className="flex flex-col py-6 items-center gap-1 bg-[#121212]/95 backdrop-blur-xl border-t border-gold/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <ul className="flex flex-col items-center">
        {links.map((link, index) => (
          <motion.li
            key={link.id ?? link.path}
            className="list-none py-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <NavLink
              href={link.path}
              title={link.title}
              onClick={onClose}
              isActive={activeId === link.id}
            />
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default MenuOverlay;
