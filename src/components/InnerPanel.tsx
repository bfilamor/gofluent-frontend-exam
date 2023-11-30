import React from 'react'
import { EditTask } from './EditTask';
import { useDrag } from "react-dnd";
import { useTaskContext } from '../context/TaskContext';
import { format } from 'date-fns';
import { priorityData } from '../data/priorityData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleUp, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

type DropResultType = {
    name?: string
}

export const InnerPanel = ({ status, task } : any) => {
    const { _id } = task;
    const { setTasks } = useTaskContext();

    const priorityTheme = priorityData?.find((priority : any) => priority?.name === task?.priority);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "panel",
        item: { name: status },
        end: (item, monitor) => {
            const dropResult : DropResultType | null  = monitor.getDropResult();
            if (dropResult !== null) {
                if (item.name !== dropResult?.name ) {
                    let updatedTasks = JSON.parse(localStorage.getItem("tasks") || '');
                    updatedTasks.forEach((task : any) => {
                        if (task._id === _id) {
                            task.status = dropResult?.name
                        }
                    })
                    setTasks(updatedTasks);
                }
            }

        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))

    return (
        <div ref={drag} className="p-3 border rounded-3 my-2 position-relative bg-white shadow d-flex gap-1" key={task._id}>

            <div className={`bg-${priorityTheme?.theme} rounded-3 me-1 flex-shrink-0`} style={{ width: "5px" }}></div>
            <div className='me-1'>
                <p className={`text-${priorityTheme?.theme} fw-bold fs-5`}><FontAwesomeIcon icon={task.priority === "high" ? faAngleDoubleUp : task.priority === "medium" ? faAngleUp : faAngleDown} /></p>
            </div>
            <div>
                <h4 className="mb-1">{task.taskName}</h4>
                <p className="fw-light">{task.description}</p>



                <p className="text-secondary"><small>{format(new Date(task.startDate), "MM/dd/yyyy")} - {format(new Date(task.endDate), "MM/dd/yyyy")}</small></p>

                <div className="d-flex gap-2">
                    <div className="flex-shrink-0">
                        <div className="rounded-circle bg-dark text-white p-1 d-flex text-capitalize justify-content-center align-items-center" style={{ width: "30px", height: "30px" }}>
                            <strong>{task?.ownerName ? task?.ownerName?.charAt(0) : null}</strong>
                        </div>
                    </div>
                    <div>
                        <p className="text-secondary text-capitalize mb-0"><small className="fw-bold">{task.ownerName}</small></p>
                    </div>
                </div>
                {(status !== "deleted") &&
                    <EditTask task={task} />
                }

            </div>

        </div>
    )
}
