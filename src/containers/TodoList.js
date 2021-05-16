import React, { useState } from 'react'
import PropTypes from 'prop-types';

import TodoItem from '../components/TodoItem'
import ModalEditTodo from '../components/ModalEditTodo'
import ModalAddTodoTask from '../components/ModalAddTodoTask'
import ModalEditTodoTask from '../components/ModalEditTodoTask'

const TodoList = (props) => {
    const [updateTodoModalFlag, setUpdateTodoModalFlag] = useState(false);
    const [addTaskModalFlag, setAddTaskModalFlag] = useState(false);
    const [updateTaskModalFlag, setUpdateTaskModalFlag] = useState(false);
    const [modalTodoId, setModalTodoId] = useState(-1);
    const [modalTaskId, setModalTaskId] = useState(-1);

    const handleSetModalTodoId = (id, type) => {
        if (type === 'ADD_TASK') {
            setModalTodoId(id);
            setAddTaskModalFlag(true);
        }
        else if (type === 'EDIT_TODO') {
            setModalTodoId(id);
            setUpdateTodoModalFlag(true);
        }
    }

    const handleSetModalTodoTaskId = (tid, id) => {
        setModalTodoId(tid);
        setModalTaskId(id);
        setUpdateTaskModalFlag(true);
    }

    const handleClose = () => {
        setUpdateTodoModalFlag(false);
        setAddTaskModalFlag(false);
        setUpdateTaskModalFlag(false);
    }

    const handleDeleteTodo = (id) => {
        fetch(`${window.apiHost}/todo/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                props.dispatch({ type: 'DELETE_TODO', todoId: id });
            });
    }

    const handleUpdateTodo = (todo) => {
        fetch(`${window.apiHost}/todo/todo/${modalTodoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
        })
            .then(res => {
                props.dispatch({ type: 'UPDATE_TODO', todoId: modalTodoId, todo });
            });
    }

    const handleAddTodoTask = (task) => {
        task.tid = modalTodoId;

        fetch(`${window.apiHost}/todo/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
        })
            .then(res => res.json())
            .then((data) => {
                task.id = data.id
                props.dispatch({ type: 'ADD_TODO_TASK', todoId: task.tid, task });
            });
    }

    const handleDeleteTask = (tid, id) => {
        fetch(`${window.apiHost}/todo/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                props.dispatch({ type: 'DELETE_TODO_TASK', todoId: tid, taskId: id });
            });
    }

    const handleUpdateTodoTask = (task) => {
        fetch(`${window.apiHost}/todo/task/${modalTaskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
        })
            .then(res => {
                props.dispatch({ type: 'EDIT_TODO_TASK', todoId: modalTodoId, taskId: modalTaskId, task });
            });
    }

    return (
        <div className="body">
            <ul className='theList'>
                {props.state.todos.map((todo) =>
                    <TodoItem
                        todo={todo}
                        key={todo.id}
                        onDeleteTodo={handleDeleteTodo}
                        onDeleteTask={handleDeleteTask}
                        onSetModalTodoId={handleSetModalTodoId}
                        onSetModalTodoTaskId={handleSetModalTodoTaskId}
                    />
                )}
            </ul>
            <ModalEditTodo
                show={updateTodoModalFlag}
                onHide={handleClose}
                onSubmit={handleUpdateTodo}
                todos={props.state.todos}
                todoId={modalTodoId}
            />
            <ModalAddTodoTask
                show={addTaskModalFlag}
                onHide={handleClose}
                onSubmit={handleAddTodoTask}
                todos={props.state.todos}
                todoId={modalTodoId}
            />
            <ModalEditTodoTask
                show={updateTaskModalFlag}
                onHide={handleClose}
                onSubmit={handleUpdateTodoTask}
                todos={props.state.todos}
                todoId={modalTodoId}
                taskId={modalTaskId}
            />
        </div>
    );
};

TodoList.propTypes = {
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default TodoList;