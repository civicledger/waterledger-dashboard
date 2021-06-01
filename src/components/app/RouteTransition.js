import React from "react";
import { motion } from "framer-motion";

const RouteTransition = ({ children }) => {
  return (
    <motion.div className="m-10 flex-grow z-10" key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  );
};

export default RouteTransition;
