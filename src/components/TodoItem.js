import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";
import { delTodo, updateTodo } from "../actions/index";

const child = {
    hidden: {
        y: -20,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
    },
    exit: {
        y: 20,
        opacity: 0,
    },
};

const TodoItem = ({ todo }) => {
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (todo.status === "complete") {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [todo.status]);

    const handleDelete = () => {
        // console.log("deleting...");
        dispatch(delTodo(todo.id));
        toast.success("Task Deleted Successfully");
    };
    const handleUpdate = () => {
        // console.log("updating...");
        setUpdateModalOpen(true);
    };
    const handleCheck = () => {
        setChecked(!checked);
        dispatch(
            updateTodo({
                ...todo,
                status: checked ? "incomplete" : "complete",
            })
        );
    };

    return (
        <>
            <motion.div
                className="item"
                variants={child}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="todoDetails">
                    <CheckButton checked={checked} handleCheck={handleCheck} />
                    <div className="texts">
                        <p className={`todoText ${todo.status === "complete" && "todoText--completed"}`} >
                            {todo.title}
                        </p>
                        <p className="time">
                            {format(new Date(todo.time), "p, dd/MM/yyyy")}
                        </p>
                    </div>
                </div>
                <div className="todoActions">
                    <div className="icon" onClick={handleDelete}>
                        <MdDelete />
                    </div>
                    <div className="icon" onClick={handleUpdate}>
                        <MdEdit />
                    </div>
                </div>
            </motion.div>
            <TodoModal
                type={"update"}
                oldTodo={todo}
                modalOpen={updateModalOpen}
                setModalOpen={setUpdateModalOpen}
            />
        </>
    );
};

export default TodoItem;
