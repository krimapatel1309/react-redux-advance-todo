import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

import Button from "./Button";
import { addTodo, updateTodo } from "../actions/index";

const dropIn = {
    hidden: {
        opacity: 0,
        transform: "scale(0.9)",
    },
    visible: {
        transform: "scale(1)",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            // damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        transform: "scale(0.9)",
        opacity: 0,
    },
};

const TodoModal = ({ type, modalOpen, setModalOpen, oldTodo }) => {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("incomplete");

    const dispatch = useDispatch();

    useEffect(() => {
        if (type === "update" && oldTodo) {
            setTitle(oldTodo.title);
            setStatus(oldTodo.status);
        } else {
            setTitle("");
            setStatus("incomplete");
        }
    }, [type, oldTodo, modalOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log({ title, status });

        if (title === "") {
            toast.error("Fill Title");
            return;
        }
        if (title && status) {
            if (type === "add") {
                dispatch(
                    addTodo({
                        id: uuid(),
                        title,
                        status,
                        time: new Date().toLocaleString(),
                    })
                );
                toast.success("Task Added Successfully");
            } else if (type === "update") {
                if (oldTodo.title !== title || oldTodo.status !== status) {
                    dispatch(
                        updateTodo({
                            ...oldTodo,
                            title,
                            status,
                        })
                    );
                    toast.success("Task Updated Successfully");
                } else {
                    toast.warning("No changes made");
                    return;
                }
            }
            setModalOpen(false);
            setTitle("");
            setStatus("incomplete");
        }
    };

    return (
        <AnimatePresence>
            {modalOpen && (
                <motion.div
                    className="wrapper"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="container"
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className="closeButton"
                            onClick={() => setModalOpen(false)}
                            initial={{ top: 40, opacity: 0 }}
                            animate={{ top: -10, opacity: 1 }}
                            exit={{ top: 40, opacity: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <MdOutlineClose />
                        </motion.div>
                        <form className="form" onSubmit={handleSubmit}>
                            <h1 className="formTitle">
                                {type === "update" ? "Update" : "Add"} Task
                            </h1>
                            <label htmlFor="title">
                                Title
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                            <label htmlFor="status">
                                Status
                                <select
                                    name="status"
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="incomplete">
                                        Incomplete
                                    </option>
                                    <option value="complete">Complete</option>
                                </select>
                            </label>
                            <div className="buttoncontainer">
                                <Button type="submit" variants="primary">
                                    {type === "update" ? "Update" : "Add"} Task
                                </Button>
                                <Button
                                    type="button"
                                    variants="secondary"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TodoModal;
