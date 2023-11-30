import { createContext, useMemo, useState, useContext, SetStateAction, Dispatch } from 'react';
import { statusData } from '../data/statusData';

type TaskContextType = {
    tasks: Array<any>,
    setTasks: Dispatch<SetStateAction<Array<any>>>,
    deletedTasks: Array<any>,
    setDeletedTasks: Dispatch<SetStateAction<Array<any>>>
    statusData: Array<any>
};

const TaskContext = createContext<TaskContextType>({
    tasks: [] ,
    deletedTasks: [],
    setTasks: () => [],
    setDeletedTasks: () => [],
    statusData: []
})
TaskContext.displayName = 'TaskContext';

export const useTaskContext = () => {
    const context = useContext(TaskContext)
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a ValueProvider')
    }
    return context
}

const TaskProvider = ({ children }: { children: React.ReactNode }) => {

    const [tasks, setTasks] =  useState<unknown[]>([]);
    const [deletedTasks, setDeletedTasks] = useState<unknown[]>([]);

    const valueObject = useMemo(() => {
        return { tasks, setTasks, statusData, deletedTasks, setDeletedTasks }
    }, [tasks, deletedTasks])

    return <TaskContext.Provider value={valueObject}>{children}  </TaskContext.Provider>
}
export default TaskProvider