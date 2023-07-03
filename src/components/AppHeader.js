import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "./Button";
import SelectButton from "./SelectButton";
import TodoModal from "./TodoModal";
import { filTodo } from "../actions/index";

const AppHeader = () => {
    const filterStatus = useSelector((state) => state.todoReducer.filterStat);
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    const updateFilter = (e) => {
        // console.log("updating");
        dispatch(filTodo(e.target.value));
    };

    return (
        <div className="appHeader">
            <Button
                variants="primary"
                type="button"
                onClick={() => setModalOpen(true)}
            >
                Add Task
            </Button>
            <SelectButton
                id="status"
                value={filterStatus}
                onChange={updateFilter}
            >
                <option value="all">ALL</option>
                <option value="incomplete">INCOMPLETE</option>
                <option value="complete">COMPLETE</option>
            </SelectButton>

            <TodoModal
                type={"add"}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />
        </div>
    );
};

export default AppHeader;
