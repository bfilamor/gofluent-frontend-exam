import React from 'react';
import { useDrop } from 'react-dnd';
import { useTaskContext } from '../context/TaskContext';
import { InnerPanel } from './InnerPanel';
import { Badge } from 'react-bootstrap';

export const StatusColumn = ({ statusData }: any) => {
    const { tasks } = useTaskContext();
    const { status, label, color } = statusData;
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'panel',
        item: { name: status },
        drop: () => ({ name: status }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    return (
        <>
            <div ref={drop} className="col-lg-3 position-relative mb-lg-0 mb-5">
                <div className='bg-light p-2 pt-3 pb-5 shadow-sm border rounded-3 h-100 status-column-inner'>
                    <h5 className='p-2'>{label}
                        <Badge bg='secondary' className='ms-2'>
                            {tasks?.filter((task) => task.status === status).length}
                        </Badge>
                    </h5>
                    {
                        tasks?.map((task) => (
                            (status === task.status) &&
                            <InnerPanel key={task._id} task={task} status={task.status} theme={color} />
                        ))
                    }

                </div>
            </div>
        </>
    )
}
