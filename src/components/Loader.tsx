import { motion } from "framer-motion";

export default function Loader({ size = 60 }: { size?: number }) {
  const ringSize = size;
  const borderThickness = size / 8;

  return (
    <div className="flex items-center justify-center w-full py-10">
      <motion.div
        style={{
          width: ringSize,
          height: ringSize,
          borderWidth: borderThickness,
        }}
        className="rounded-full border-gray-300 border-t-indigo-600 border-solid"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      ></motion.div>
    </div>
  );
}
