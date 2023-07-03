export const addTodo = (data) => {
    const { id, title, status, time } = data;
    return {
        type: "ADD_TODO",
        payload: {
            id,
            title,
            status,
            time,
        },
    };
};

export const delTodo = (id) => {
    return {
        type: "DEL_TODO",
        payload: {
            id,
        },
    };
};

export const updateTodo = (data) => {
    // console.log(data);
    const { id, title, status } = data;

    return {
        type: "UPD_TODO",
        payload: {
            id,
            title,
            status,
        },
    };
};

export const filTodo = (id) => {
    return {
        type: "FILTER_TODO",
        payload: id,
    };
};
