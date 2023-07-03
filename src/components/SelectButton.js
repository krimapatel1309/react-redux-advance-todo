import React from "react";

const SelectButton = ({ children, ...rest }) => {
    return (
        <select className="button button--select" {...rest}>
            {children}
        </select>
    );
};

export default SelectButton;
