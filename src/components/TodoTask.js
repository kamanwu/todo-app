import PropTypes from 'prop-types';

const TodoTask = (props) => {
    const handleSetModalTodoTaskId = (id) => {
        if (props.onSetModalTodoTaskId) {
            props.onSetModalTodoTaskId(id)
        }
    }

    const handleDeleteTask = (id) => {
        if (props.onDeleteTask) {
            props.onDeleteTask(id)
        }
    }

    const createTasks = (item) => {
        return (
            <li key={item.id} className={item.status.replace(/[^a-zA-Z ]/g, "")}>
                <div>
                    <div className="taskTop">
                        {new Date(item.start).toISOString().substr(0, 10)} - {new Date(item.end).toISOString().substr(0, 10)}<span>[{item.status}]</span>
                    </div>
                    <div className="taskMid">
                        <span className="taskLabel">{item.label}</span>
                        <div className="actions">
                            <span className="actionDelete" onClick={handleDeleteTask.bind(this, item.id)}><i className="fa fa-trash" title="delete task"></i></span>
                            <span className="actionEdit" onClick={handleSetModalTodoTaskId.bind(this, item.id)}><i className="fa fa-pencil" title="edit task"></i></span>
                        </div>
                    </div>

                    <div className="taskDesc">
                        {item.description}
                    </div>
                </div>
            </li>
        );
    }

    const listItems = props.tasks.map((item) => createTasks(item));

    return (
        <ul className="taskList">
            {listItems}
        </ul>
    );
};

TodoTask.propTypes = {
    tasks: PropTypes.array.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    onSetModalTodoTaskId: PropTypes.func.isRequired,
};

export default TodoTask;