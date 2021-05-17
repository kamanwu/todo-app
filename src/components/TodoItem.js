import PropTypes from 'prop-types';
import TodoTask from './TodoTask'

const TodoItem = (props) => {
    const handleDeleteTodo = () => {
        if (props.onDeleteTodo) {
            props.onDeleteTodo(props.todo.id)
        }
    }

    const handleSetModalTodoId = (type) => {
        if (props.onSetModalTodoId) {
            props.onSetModalTodoId(props.todo.id, type)
        }
    }

    const handleSetModalTodoTaskId = (id) => {
        if (props.onSetModalTodoTaskId) {
            props.onSetModalTodoTaskId(props.todo.id, id)
        }
    }

    const handleDeleteTask = (id) => {
        if (props.onDeleteTask) {
            props.onDeleteTask(props.todo.id, id)
        }
    }

    const todo = props.todo

    return (
        <li key={todo.id}>
            <div className="todoItem">
                <div className="todoActions">
                    <span className="actionAdd" onClick={handleSetModalTodoId.bind(this, 'ADD_TASK')}><i className="fa fa-plus" title="add task"></i></span>
                    <span className="actionDelete" onClick={handleDeleteTodo}><i className="fa fa-trash" title="delete todo"></i></span>
                    <span className="actionEdit" onClick={handleSetModalTodoId.bind(this, 'EDIT_TODO')}><i className="fa fa-pencil" title="edit todo"></i></span>
                </div>
                <div className="todoContent">
                    <div className="todoLabel">
                        {todo.name}
                    </div>
                    <div className="todoDesc">
                        {todo.description}
                    </div>

                    <TodoTask
                        tasks={todo.tasks || []}
                        onDeleteTask={handleDeleteTask}
                        onSetModalTodoTaskId={handleSetModalTodoTaskId}
                    />
                </div>
            </div>
        </li>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onDeleteTodo: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    onSetModalTodoId: PropTypes.func.isRequired,
    onSetModalTodoTaskId: PropTypes.func.isRequired,
};

export default TodoItem;