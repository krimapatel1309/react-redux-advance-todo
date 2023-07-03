import React from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import TodoItem from "./TodoItem";

const container = {
    hidden: {
        opacity: 1,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const child = {
    hidden: {
        y: 20,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const AppContent = () => {
    const todoList = useSelector((state) => state.todoReducer.list);
    const filterStatus = useSelector((state) => state.todoReducer.filterStat);
    // console.log(todoList);

    // reverse todo
    const sortedTodo = [...todoList];
    sortedTodo.sort((a, b) => new Date(b.time) - new Date(a.time));

    const filteredTodoList = sortedTodo.filter((item) => {
        if (filterStatus === "all") return true;
        return item.status === filterStatus;
    });

    return (
        <motion.div
            className="content__wrapper"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <AnimatePresence>
                {filteredTodoList && filteredTodoList.length > 0 ? (
                    filteredTodoList.map(
                        (todo) =>
                            todo.status && (
                                <TodoItem todo={todo} key={todo.id} />
                            )
                    )
                ) : (
                    <motion.p className="emptyText" variants={child}>
                        No Todo Found!
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default AppContent;
