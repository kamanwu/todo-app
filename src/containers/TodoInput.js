import React from 'react'
import PropTypes from 'prop-types';
import TodoInputForm from '../components/TodoInputForm'

const TodoInput = (props) => {
    const handleSubmitTodo = (todo) => {
        fetch(`${window.apiHost}/todo/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
        })
            .then(res => res.json())
            .then((data) => {
                todo.id = data.id;
                todo.tasks = [];
                props.dispatch({ type: 'ADD_TODO', todo });
            });
    }

    return (
        <div className="header">
            <TodoInputForm
                onSubmit={handleSubmitTodo}
            />
        </div>
    );
};

TodoInput.propTypes = {
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default TodoInput;