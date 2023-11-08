import { getFormat } from "./taskTag.js";

function deleteTask(confirmedDeleteTask) {
  const taskID = confirmedDeleteTask.getAttribute("task-parent");
  const taskToBeRemoved = document.getElementById(taskID);
  const oldTasks = JSON.parse(localStorage.getItem("tasks-list"));

  taskToBeRemoved.setAttribute("class", "is-removed");

  let newTaskList = [];

  for (let i = 0; i < oldTasks.length; i++) {
    if (oldTasks[i].id != taskID) {
      newTaskList.push(oldTasks[i]);
    }
  }

  localStorage.setItem("tasks-list", JSON.stringify(newTaskList));
}

export function addDeleteEventListeners() {
  const openDeleteTaskButtonList = document.querySelectorAll(
    "[open-delete-confirmation-modal]"
  );
  const closeDeleteTaskButtonList = document.querySelectorAll(
    "[close-delete-confirmation-modal]"
  );
  const DeleteTaskModalList = document.querySelectorAll(
    "[delete-confirmation-modal]"
  );
  const confirmedDeleteTaskList = document.querySelectorAll(
    "[confirmed-delete-task]"
  );

  openDeleteTaskButtonList.forEach((openDeleteTaskButton, i) => {
    openDeleteTaskButton?.addEventListener("click", () => {
      DeleteTaskModalList[i].showModal();
    });
  });

  closeDeleteTaskButtonList.forEach((closeDeleteTaskButton, i) => {
    closeDeleteTaskButton?.addEventListener("click", () => {
      DeleteTaskModalList[i].close();
    });
  });

  confirmedDeleteTaskList.forEach((confirmedDeleteTask, i) => {
    confirmedDeleteTask?.addEventListener("click", () => {
      deleteTask(confirmedDeleteTask);

      DeleteTaskModalList[i].close();
    });
  });
}

export function removeDeleteEventListeners() {
  const openDeleteTaskButtonList = document.querySelectorAll(
    "[open-delete-confirmation-modal]"
  );
  const closeDeleteTaskButtonList = document.querySelectorAll(
    "[close-delete-confirmation-modal]"
  );
  const DeleteTaskModalList = document.querySelectorAll(
    "[delete-confirmation-modal]"
  );
  const confirmedDeleteTaskList = document.querySelectorAll(
    "[confirmed-delete-task]"
  );

  openDeleteTaskButtonList.forEach((openDeleteTaskButton, i) => {
    openDeleteTaskButton?.removeEventListener("click", () => {
      DeleteTaskModalList[i].showModal();
    });
  });

  closeDeleteTaskButtonList.forEach((closeDeleteTaskButton, i) => {
    closeDeleteTaskButton?.removeEventListener("click", () => {
      DeleteTaskModalList[i].close();
    });
  });

  confirmedDeleteTaskList.forEach((confirmedDeleteTask, i) => {
    confirmedDeleteTask?.removeEventListener("click", () => {
      deleteTask(confirmedDeleteTask);

      DeleteTaskModalList[i].close();
    });
  });
}

export function SaveTaskToLocalStorage(title, description, dueDate, priority) {
  if (typeof Storage === "undefined") return;

  const oldTasks = JSON.parse(localStorage.getItem("tasks-list"));

  const newTask = {
    id: new Date().valueOf(),
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    isCompleted: false,
  };

  if (oldTasks != null) {
    localStorage.setItem("tasks-list", JSON.stringify([newTask, ...oldTasks]));
  } else {
    localStorage.setItem("tasks-list", JSON.stringify([newTask]));
  }

  feed.innerHTML =
    getFormat(
      newTask?.id,
      newTask?.title,
      newTask?.description,
      newTask?.dueDate,
      newTask?.priority
    ) + feed.innerHTML;
}
