import { React, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Reveal = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} style={{ position: "relative" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.6, delay: 0.25 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Reveal;
