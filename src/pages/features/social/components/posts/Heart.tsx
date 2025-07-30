import React from "react";
import { motion } from "framer-motion";

interface HeartProps {
    isClick: boolean;
    onClick: () => void;
}

const Heart: React.FC<HeartProps> = ({ isClick, onClick }) => {
    return (
        <motion.button
            onClick={onClick}
            style={{
                background: "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            animate={{
                scale: isClick ? [1, 1.3, 1.1, 1] : 1,
            }}
            transition={{
                duration: 0.4,
                times: [0, 0.2, 0.5, 1],
                type: "spring",
                stiffness: 400,
                damping: 15,
            }}
            aria-label={isClick ? "Quitar me gusta" : "Dar me gusta"}
        >
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block" }}
            >
                <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h0.74C14.09 5.01 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill={isClick ? "#e0245e" : "none"}
                    stroke="#e0245e"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </motion.button>
    );
};

export default Heart;