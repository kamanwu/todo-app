import React, { useState } from 'react'
import PropTypes from 'prop-types';

const TodoInputForm = (props) => {
    const [name, setName] = useState(props.name || '');
    const [description, setDescription] = useState(props.description || '');

    const handleSubmit = () => {
        if (!name) return alert('Please insert name')
        if (!description) return alert('Please insert description')

        if (props.onSubmit) {
            props.onSubmit({ name, description })
        }

        setName('');
        setDescription('');
    }

    return (
        <div className="modalForm">
            <label htmlFor="name">Todo Name *</label>
            <input
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                placeholder="enter todo name"
                id="name"
                required
            />

            <label htmlFor="desc">Description *</label>
            <textarea
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
                placeholder="enter description"
                id="desc"
                required
            />

            <div className="actionButton">
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>

    );

};

TodoInputForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
};

export default TodoInputForm;