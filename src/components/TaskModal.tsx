import React, {  useMemo } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { useTaskContext } from "../context/TaskContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Calendar } from "./Calendar";
import { priorityData } from "../data/priorityData";
import { DeleteTask } from "./DeleteTask";

export const TaskModal = ({ modalProps, editMode, task , modalTitle}: any) => {
    const { tasks, statusData } = useTaskContext();
    const { show, handleClose, handleSubmit, dates, setDates, handleInputChange, taskData } = modalProps;

    useMemo(() => {
        if (tasks?.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => { handleSubmit(e) }}>
                    <Modal.Body>
                        <Calendar dates={dates} setDates={setDates} />
                        <FloatingLabel label="Assigned To" className="mb-3">
                            <Form.Control
                                name="ownerName"
                                value={taskData.ownerName}
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                type="text"
                                placeholder="Enter Owner Name"
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel label="Task Name" className="mb-3">
                            <Form.Control
                                name="taskName"
                                value={taskData.taskName}
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                type="text"
                                placeholder="Enter Task Name"
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel label="Description" className="mb-3">
                            <Form.Control
                                name="description"
                                value={taskData.description}
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                style={{ height: '100px' }}
                                as="textarea"
                                placeholder="Enter Task Description"
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Priority" className="mb-3">
                            <Form.Select
                                name="priority"
                                value={taskData.priority}
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                            >
                                {
                                    priorityData.map((priority, index) => (
                                        <option key={index} value={priority.name}>{priority.name}</option>
                                    ))
                                }
                            </Form.Select>

                        </FloatingLabel>
                        <FloatingLabel label="Task Status" className="mb-3">
                            <Form.Select
                                name="status"
                                value={taskData.status}
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                            >
                                {statusData.map((status, index) => (
                                    <option key={index} value={status.status}>{status.label}</option>
                                ))}
                            </Form.Select>

                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {(!editMode) ?
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                <FontAwesomeIcon className="me-1" icon={faPlus} />
                                Add Task
                            </Button> :
                            <>
                                <Button
                                    variant="primary"
                                    type="submit"
                                >
                                    <FontAwesomeIcon className="me-1" icon={faCheck} />
                                    Update Task
                                </Button>
                                <DeleteTask taskToBeDeleted={task} handleClose={handleClose} />
                            </>
                        }


                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};
