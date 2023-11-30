import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useTaskContext } from "../context/TaskContext";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TaskModal } from "./TaskModal";

export const AddTask = () => {
  const { tasks, setTasks, statusData } = useTaskContext();
  const initialValues = {
    ownerName: "",
    taskName: "",
    description: "",
    status: "toDo",
    priority: "low"
  }
  const initialDateValues = [{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }]
  const [dates, setDates] = useState(initialDateValues);
  const [taskData, setTaskData] = useState(initialValues);
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setTaskData(initialValues);
    setDates(initialDateValues);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTasks((prev) => {
      return [
        ...prev,
        {
          _id: uuidv4(),
          ownerName: taskData.ownerName,
          taskName: taskData.taskName,
          status: taskData.status,
          description: taskData.description,
          startDate: dates[0].startDate,
          endDate: dates[0].endDate,
          priority: taskData.priority
        },
      ];
    });

    handleClose();
  };

  const modalProps = { show, handleClose, handleSubmit, dates, setDates, handleInputChange, taskData }


  return (
    <>
      <Button
        variant="primary"
        size="lg"
        onClick={() => {
          handleShow();
        }}
      >
        <FontAwesomeIcon icon={faPlus} /> Add New Task
      </Button>

      <TaskModal modalProps={modalProps} editMode={false} modalTitle={"Add Task"} />
    </>
  );
};
