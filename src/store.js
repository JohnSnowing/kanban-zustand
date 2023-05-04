import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

const store = (set) => ({
  tasks: [{ title: "TestTAsk", state: "ONGOING" }],
  draggedTask: null,
  tasksInOngoing: 0,
  addTask: (title, state) =>
    set(
      (store) => ({ tasks: [...store.tasks, { title, state }] }),
      false,
      "addTask"
    ),
  deleteTask: (title) => set(),
  setDraggedTask: (title) => set(),
  moveTask: (title, state) => set(),
});

const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log(args);
      set(...args);
    },
    get,
    api
  );

// export const useStore = create(
//   subscribeWithSelector(log(persist(devtools(store), { name: "store" })))
// );

// useStore.subscribe(
//   (store) => store.tasks,
//   (newTasks, prevTasks) => {
//     useStore.setState({
//       tasksInOngoing: newTasks.filter((task) => task.state === "ONGOING")
//         .length,
//     });
//   }
// );
export const useStore = create(store);
