import PropTypes from 'prop-types';
import TodoInputForm from '../components/TodoInputForm'
import '../modal.css';

const ModalEditTodo = (props) => {
    const handleSubmitTodo = (todo) => {
        props.onSubmit(todo);
        props.onHide();
    }

    const handleColse = () => {
        props.onHide();
    }

    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
    const updateTodo = props.todos.find((x) => { return x.id === props.todoId });

    if (!updateTodo) return null;

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="closeButton" onClick={handleColse}>x</div>
                <TodoInputForm
                    key={Date.now()}
                    onSubmit={handleSubmitTodo}
                    name={updateTodo.name}
                    description={updateTodo.description}
                />
            </section>
        </div>
    );
};

ModalEditTodo.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
    todoId: PropTypes.number.isRequired,
};

export default ModalEditTodo;