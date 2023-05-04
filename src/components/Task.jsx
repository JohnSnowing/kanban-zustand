import "./Task.css";
import trash from "../assets/trash.svg";
import classNames from "classnames";
import { useStore } from "../store";

const STATUS = "PLANNED";
export default function Task({ title }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  return (
    <div className="task" draggable>
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div>
          <img src={trash} alt="" />
        </div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
}
