const getInitTodo = () => {
    const localTodo = localStorage.getItem("todo-list");

    if (localTodo) {
        return JSON.parse(localTodo);
    } else {
        localStorage.setItem("todo-list", JSON.stringify([]));
        return [];
    }
};

const getLocalTodo = () => {
    return localStorage.getItem("todo-list");
};
const setLocalTodo = (arr) => {
    localStorage.setItem("todo-list", JSON.stringify(arr));
};

const initialData = {
    filterStat: "all",
    list: getInitTodo(),
};

const todoReducer = (state = initialData, action) => {
    switch (action.type) {
        case "ADD_TODO":
            state.list.push(action.payload);
            // const list = localStorage.getItem('todo-list');
            const list = getLocalTodo();

            if (list) {
                const listArr = JSON.parse(list);
                listArr.push({
                    ...action.payload,
                });
                setLocalTodo(listArr);
                // localStorage.setItem('todo-list', JSON.stringify(listArr));
                return {
                    ...state,
                    list: [...state.list, listArr],
                };
            } else {
                setLocalTodo([{ ...action.payload }]);
                return {
                    ...state,
                    list: [...state.list, ...action.payload],
                };
            }

        case "DEL_TODO":
            const dellist = getLocalTodo();
            if (dellist) {
                const listArr = JSON.parse(dellist);
                const newList = listArr.filter((elem) => elem.id !== action.payload.id);
                setLocalTodo(newList);

                return {
                    ...state,
                    list: newList,
                };
            }
            break;

        case "UPD_TODO":
            const updlist = getLocalTodo();
            if (updlist) {
                const listArr = JSON.parse(updlist);
                listArr.forEach((todo) => {
                    if (todo.id === action.payload.id) {
                        // console.log("mactch found");
                        todo.status = action.payload.status;
                        todo.title = action.payload.title;
                    }
                });
                setLocalTodo(listArr);

                return {
                    ...state,
                    list: listArr,
                };
            }
            break;

        case "FILTER_TODO":
            return {
                ...state,
                filterStat: action.payload,
            };

        default:
            return state;
    }
};

export default todoReducer;
