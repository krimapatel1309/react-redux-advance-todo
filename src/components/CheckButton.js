import React from "react";
import { motion } from "framer-motion";

const boxVariant = {
    checked: {
        background: "var(--primaryPurple)",
        transition: { duration: 0.2 },
    },
    unChecked: {
        background: "var(--gray-1)",
        transition: { duration: 0.2 },
    },
};

const checkVariant = {
    initial: {
        color: "#fff",
    },
    checked: {
        pathLength: 1,
        opcaity: 1,
    },
    unChecked: {
        pathLength: 0,
        opcaity: 0,
    },
};

const CheckButton = ({ checked, handleCheck }) => {
    return (
        <motion.div
            className="svgBox"
            variants={boxVariant}
            animate={checked ? "checked" : "unChecked"}
            onClick={handleCheck}
        >
            <motion.svg
                className="svg"
                viewBox="0 0 53 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                    variants={checkVariant}
                    animate={checked ? "checked" : "unChecked"}
                    fill="none"
                    strokeMiterlimit="10"
                    stroke="var(--bg-2)"
                    strokeWidth="6"
                    d="M1.5 22L16 36.5L51.5 1"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </motion.svg>
        </motion.div>
    );
};

export default CheckButton;
