import React from 'react';
import { Badge } from 'react-bootstrap';
import { InnerPanel } from './InnerPanel';
import { useTaskContext } from '../context/TaskContext';

export const DeletedTasksColumn = () => {
    const { deletedTasks } = useTaskContext();
    return (
        <div className='col-lg-3 position-relative mb-lg-0 mb-5'>
            <div className='bg-light p-2 pt-3 pb-5 shadow-sm border rounded-3 h-100 status-column-inner'>
                <h5 className='p-2'>
                    Deleted
                    <Badge bg='secondary' className='ms-2'>
                        {deletedTasks?.length}
                    </Badge>
                </h5>
                {
                    deletedTasks?.map((task) => (
                        <InnerPanel key={task._id} task={task} status={"deleted"}/>
                    ))
                }
            </div>
        </div>
    )
}
