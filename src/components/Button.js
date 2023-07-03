import React from "react";

const Button = ({ children, type, variants, ...rest }) => {
    return (
        <button
            type={type === "submit" ? "submit" : "button"}
            className={`button 
                ${
                    variants === "primary"
                        ? "button--primary"
                        : "button--secondary"
                }`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
