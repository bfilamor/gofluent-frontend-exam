import React from 'react'
import { Button } from 'react-bootstrap';
import { useTaskContext } from '../context/TaskContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const DeleteTask = ({ taskToBeDeleted, handleClose } : any) => {

  const { tasks, setTasks, setDeletedTasks, deletedTasks } = useTaskContext();

  const handleDelete = () => {
    // get new array of tasks without the deleted task
    const filteredTasks = tasks.filter((task) => task._id !== taskToBeDeleted._id);
    setTasks(filteredTasks);

    //copy the current tasks array into a new array
    const deletedTasksArray = [...deletedTasks];
    //push the deleted task into the deletedtasks array
    deletedTasksArray.push(taskToBeDeleted);
    setDeletedTasks(deletedTasksArray);
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasksArray))

    handleClose();

    if (filteredTasks.length === 0) {
      localStorage.setItem("tasks", JSON.stringify(filteredTasks));

    }
  }

  return (
    <div>
      <Button onClick={() => { handleDelete() }} variant='danger'><FontAwesomeIcon className='me-1' icon={faTrashAlt} />Delete Task</Button>
    </div>
  )
}
