import React from "react";
import { useTaskContext } from "../context/TaskContext";
import { StatusColumn } from "../components/StatusColumn";
import { DeletedTasksColumn } from "../components/DeletedTasksColumn";
import { AddTask } from "../components/AddTask";

export const Dashboard = () => {
  const { statusData } = useTaskContext();

  return (
    <>
      <div className="border-bottom text-center py-3 sticky-top bg-white">
        <AddTask />
      </div>
      <div className="container py-5">
        <div className="row">
          {
            statusData.map((status: any, index: React.Key | null | undefined) => (
              <StatusColumn key={index} statusData={status} />
            ))
          }
          <DeletedTasksColumn />
        </div>
      </div>
    </>
  );
};
