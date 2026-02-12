'use client'
import { motion, useScroll } from 'framer-motion'

export function ScrollBar() {
  const {scrollYProgress} = useScroll()

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 10,
        originX: 0,
        backgroundColor: "#ff0088",
      }}
    />
  );
}