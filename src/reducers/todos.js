const todosReducer = (state, action) => {
    if (!state) {
        state = { todos: [] };
    }

    switch (action.type) {
        case 'INIT_TODOS':
            return {
                todos: action.todos
            }
        case 'ADD_TODO':
            return {
                todos: [action.todo, ...state.todos]
            }
        case 'DELETE_TODO':
            return {
                todos: state.todos.filter(item => { return item.id !== action.todoId })
            }
        case 'UPDATE_TODO':
            return {
                todos: state.todos.map(item => {
                    if (item.id === action.todoId) {
                        return Object.assign({}, item, action.todo)
                    }
                    return item;
                })
            }
        case 'ADD_TODO_TASK':
            return {
                todos: state.todos.map(item => {
                    if (item.id === action.todoId) {
                        item.tasks.push(action.task);
                    }
                    return item;
                })
            }
        case 'EDIT_TODO_TASK':
            return {
                todos: state.todos.map(item => {
                    if (item.id === action.todoId) {
                        item.tasks = item.tasks.map(t => {
                            return t.id === action.taskId ? Object.assign({ id: action.taskId, tid: action.todoId }, action.task) : t
                        });
                    }
                    return item;
                })
            }
        case 'DELETE_TODO_TASK':
            return {
                todos: state.todos.map(item => {
                    if (item.id === action.todoId) {
                        item.tasks = item.tasks.filter(t => { return t.id !== action.taskId });
                    }
                    return item;
                })
            }
        default:
            return state;
    }
}

export default todosReducer

export const initTodos = (todos) => {
    return { type: 'INIT_TODOS', todos }
}

export const addTodo = (todo) => {
    return { type: 'ADD_TODO', todo }
}

export const deleteTodo = (todoId) => {
    return { type: 'DELETE_TODO', todoId }
}

export const updateTodo = (todoId, todo) => {
    return { type: 'UPDATE_TODO', todoId, todo }
}

export const addTodoTask = (todoId, task) => {
    return { type: 'ADD_TODO_TASK', todoId, task }
}

export const editTodoTask = (todoId, taskId, task) => {
    return { type: 'EDIT_TODO_TASK', todoId, taskId, task }
}

export const deleteTodoTask = (todoId, taskId) => {
    return { type: 'DELETE_TODO_TASK', todoId, taskId }
}
