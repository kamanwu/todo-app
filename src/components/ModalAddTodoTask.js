import PropTypes from 'prop-types';
import TaskInputForm from '../components/TaskInputForm'
import '../modal.css';

const ModalAddTodoTask = (props) => {
   const handleAddTodoTask = (task) => {
      props.onSubmit(task);
      props.onHide();
   }

   const handleColse = () => {
      props.onHide();
   }

   const showHideClassName = props.show ? "modal display-block" : "modal display-none";

   return (
      <div className={showHideClassName}>
         <section className="modal-main">
            <div className="closeButton" onClick={handleColse}>x</div>
            <TaskInputForm
               key={props.todoId}
               onSubmit={handleAddTodoTask}
            />
         </section>
      </div>
   );

};

ModalAddTodoTask.propTypes = {
   show: PropTypes.bool.isRequired,
   onHide: PropTypes.func.isRequired,
   onSubmit: PropTypes.func.isRequired,
   todos: PropTypes.array.isRequired,
   todoId: PropTypes.number.isRequired,
};

export default ModalAddTodoTask;