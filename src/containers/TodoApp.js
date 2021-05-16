import React, { useEffect, useReducer } from 'react'
import TodoInput from '../containers/TodoInput'
import TodoList from '../containers/TodoList'
import todosReducer from '../reducers/todos';

const TodoApp = () => {
    const [state, dispatch] = useReducer(todosReducer, { todos: [] });

    useEffect(() => {
        async function _loadTodos() {
            let res = await fetch(`${window.apiHost}/todo/todo`)
            let todos = await res.json();

            todos = todos.sort((a, b) => { return b.id - a.id });
            for (const [i, todo] of todos.entries()) {
                let res = await fetch(`${window.apiHost}/todo/todo/?id=${todo.id}`)
                let tmp = await res.json();
                todos[i] = tmp;
            }

            dispatch({ type: 'INIT_TODOS', todos });
        }
        _loadTodos();
    }, [])

    return (
        <div className='todoListMain'>
            <TodoInput state={state} dispatch={dispatch} />
            <TodoList state={state} dispatch={dispatch} />
        </div>
    );
};

export default TodoApp;