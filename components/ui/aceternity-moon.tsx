// components/ui/aceternity-moon.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AceternityMoon = ({ className }: { className?: string }) => {
  return (
    <motion.div 
      className={cn("relative flex items-center justify-center w-16 h-16", className)}
      animate={{ y:[0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer Glow / Halo */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#FFD700]/20 blur-[20px]"
        animate={{ scale: [1, 1.2, 1], opacity:[0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* The Moon Crescent */}
      <div className="relative w-10 h-10 rounded-full bg-transparent border-l-[8px] border-b-[8px] border-[#FFD700] transform -rotate-45 shadow-[0_0_15px_rgba(255,215,0,0.5)]">
        {/* Inner detail to make it look 3D-ish */}
        <div className="absolute inset-0 rounded-full shadow-[inset_4px_-4px_8px_rgba(255,255,255,0.3)]"></div>
      </div>
    </motion.div>
  );
};