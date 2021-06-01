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
          className="mb-5 p-5 bg-green-200 text-green-600 rounded"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormSuccess;
