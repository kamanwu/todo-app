import PropTypes from 'prop-types';
import TaskInputForm from '../components/TaskInputForm'
import '../modal.css';

const ModalEditTodoTask = (props) => {
    const handleUpdateTodoTask = (task) => {
        props.onSubmit(task);
        props.onHide();
    }

    const handleColse = () => {
        props.onHide();
    }

    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
    const updateTodo = props.todos.find((x) => { return x.id === props.todoId });
    const updateTask = updateTodo ? updateTodo.tasks.find((x) => { return x.id === props.taskId }) : [];

    if (!updateTask) return null;

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="closeButton" onClick={handleColse}>x</div>
                <TaskInputForm
                    key={Date.now()}
                    onSubmit={handleUpdateTodoTask}
                    label={updateTask.label}
                    description={updateTask.description}
                    start={updateTask.start}
                    end={updateTask.end}
                    status={updateTask.status}
                />
            </section>
        </div>
    );
};

ModalEditTodoTask.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
    todoId: PropTypes.number.isRequired,
    taskId: PropTypes.number.isRequired,
};

export default ModalEditTodoTask;