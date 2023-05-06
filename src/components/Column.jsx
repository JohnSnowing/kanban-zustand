import Task from "./Task";
import { useEffect, useRef, useState } from "react";
import { shallow } from "zustand/shallow";
import { useStore } from "../store";
import "./Column.css";
import classNames from "classnames";

export default function Column({ state }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );

  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  return (
    <div
      className={classNames("column", { drop: drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={(e) => {
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
            >
              Sumbit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function RefTest() {
  const ref = useRef();

  useEffect(() => {
    useStore.subscribe(
      (store) => store.task,
      (task) => {
        ref.current = tasks;
      }
    );
  }, []);

  return ref.current;
}
