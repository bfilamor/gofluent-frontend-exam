import React, {  useState } from "react";
import { Button } from "react-bootstrap";
import { useTaskContext } from "../context/TaskContext";
import { TaskModal } from "./TaskModal";

export const EditTask = ({ task } : any) => {
  const [show, setShow] = useState(false);
  const { tasks, setTasks, statusData } = useTaskContext();

  const { taskName, status, _id, description, ownerName, startDate, endDate, priority } = task;

  const initialValues = {
    ownerName: "",
    taskName: "",
    description: "",
    status: "",
    priority:""
  }
  const initialDateValues = [{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }]
  const [dates, setDates] = useState(initialDateValues);
  const [taskData, setTaskData] = useState(initialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const showModal = () => {
    setShow(true);
    setTaskData({
      ownerName: ownerName,
      taskName: taskName,
      description: description,
      status: status,
      priority:priority
    })
    setDates([{
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      key: 'selection'
    }])
  };

  const handleClose = () => {
    setShow(false);
    setTaskData(initialValues);
    setDates(initialDateValues);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let updatedTasks = [...tasks];

    updatedTasks.forEach((task) => {
      if (task._id === _id) {
        task.ownerName = taskData.ownerName
        task.taskName = taskData.taskName;
        task.status = taskData.status;
        task.description = taskData.description;
        task.startDate = dates[0].startDate;
        task.endDate = dates[0].endDate;
        task.priority = taskData.priority
      }
    });

    setTasks(updatedTasks);

    handleClose();
  };

  const modalProps = { show, handleClose, handleSubmit, dates, setDates, handleInputChange, taskData }

  return (
    <>
      <Button
        onClick={() => {
          showModal();
        }}
        className="edit-task-btn"
      >
        Edit task
      </Button>
      <TaskModal modalProps={modalProps} editMode={true} task={task} modalTitle={"Modify Task"} />
    </>
  );
};
