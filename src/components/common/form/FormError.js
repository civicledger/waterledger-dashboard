import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const FormError = ({ show, title, errors }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-5 p-5 bg-steel-700 text-red-500 border rounded border-red-500"
        >
          <h4 className="mb-2 text-md font-semibold">{title}</h4>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormError;
