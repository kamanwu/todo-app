import React, { useState } from 'react'
import PropTypes from 'prop-types';

const TaskInputForm = (props) => {
    const [label, setLabel] = useState(props.label || '');
    const [description, setDescription] = useState(props.description || '');
    const [start, setStart] = useState(props.start ? new Date(props.start).toISOString().substr(0, 10) : '');
    const [end, setEnd] = useState(props.end ? new Date(props.end).toISOString().substr(0, 10) : '');
    const [status, setStatus] = useState(props.status || '');

    const handleSubmit = () => {
        if (!label) return alert('Please insert name')
        if (!description) return alert('Please insert description')
        if (!start) return alert('Please insert start date')
        if (!end) return alert('Please insert end date')
        if (!status) return alert('Please insert status')

        if (props.onSubmit) {
            props.onSubmit({ label, description, start, end, status })
        }

        setLabel('');
        setDescription('');
        setStart('');
        setEnd('');
        setStatus('');
    }

    return (
        <div className='modalForm'>
            <div className="twoColInput">
                <div>
                    <label htmlFor="label">Task Name *</label>
                    <input
                        value={label}
                        onChange={(e) => { setLabel(e.target.value) }}
                        placeholder="enter task name"
                        id="label"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status">Status *</label>
                    <select
                        value={status}
                        onChange={(e) => { setStatus(e.target.value) }}
                        id="status"
                        required
                    >
                        <option value="" disabled>Select Task Status</option>
                        <option value='Pending'>Pending</option>
                        <option value='InProgress'>InProgress</option>
                        <option value='Complete'>Complete</option>
                        <option value='N/A'>N/A</option>
                    </select>
                </div>
            </div>

            <div className="twoColInput">
                <div>
                    <label htmlFor="start">Start Date *</label>
                    <input
                        value={start}
                        onChange={(e) => { setStart(e.target.value) }}
                        type='date'
                        id="start"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="end">End Date *</label>
                    <input
                        value={end}
                        onChange={(e) => { setEnd(e.target.value) }}
                        type='date'
                        id="end"
                        required
                    />
                </div>
            </div>
            <label htmlFor="desc">Description *</label>
            <textarea
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
                placeholder="enter description"
                id="desc"
                required />

            <div className="actionButton">
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

TaskInputForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string,
    description: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    status: PropTypes.string,
};

export default TaskInputForm;