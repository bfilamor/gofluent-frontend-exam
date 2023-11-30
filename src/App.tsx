import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend'
import { Dashboard } from "./pages/Dashboard";
import { useTaskContext } from "./context/TaskContext";
import { useMediaQuery } from 'react-responsive'


function App() {
  const { setTasks, setDeletedTasks } = useTaskContext();

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })

  const getTasks = () => {
    if (localStorage.getItem("tasks")) {
      const updatedTasks = JSON.parse(localStorage.getItem("tasks") || '');
      setTasks(updatedTasks);
    }
    if (localStorage.getItem("deletedTasks")) {
      const updatedDeletedTasks = JSON.parse(localStorage.getItem("deletedTasks") || '');
      setDeletedTasks(updatedDeletedTasks);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <DndProvider backend={isDesktopOrLaptop ? HTML5Backend : TouchBackend}>
        <main className="min-vh-100">
          <Dashboard />
        </main>
      </DndProvider>
    </>
  );
}

export default App;
