import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const FormSuccess = ({ children, show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-5 p-5 bg-steel-700 text-green-500 border rounded border-green-500"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormSuccess;
