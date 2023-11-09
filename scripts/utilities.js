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

export function addCompleteTaskEventListeners() {
  const tasksList = JSON.parse(localStorage.getItem("tasks-list"));
  const openCheckTaskButtonList = document.querySelectorAll("[complete-task]");

  openCheckTaskButtonList.forEach((openCheckTaskButton) => {
    const completeID = openCheckTaskButton.getAttribute("complete-task");
    const taskDiv = document.getElementById(completeID);

    openCheckTaskButton.addEventListener("click", () => {
      taskDiv.classList.toggle("task-done");
      taskDiv.classList.toggle("mark-as-done-active");

      let newTaskList = [];
      for (let i = 0; i < tasksList.length; i++) {
        if (tasksList[i].id == completeID) {
          newTaskList.push({
            ...tasksList[i],
            isCompleted: taskDiv.classList.contains("task-done"),
          });
        } else {
          newTaskList.push(tasksList[i]);
        }
      }

      localStorage.setItem("tasks-list", JSON.stringify(newTaskList));
    });
  });
}

export function removeCompleteTaskEventListeners() {
  const openCheckTaskButtonList = document.querySelectorAll("[complete-task]");

  openCheckTaskButtonList.forEach((openCheckTaskButton) => {
    const completeID = openCheckTaskButton.getAttribute("complete-task");
    const taskDiv = document.getElementById(completeID);

    openCheckTaskButton.removeEventListener("click", () => {
      taskDiv.classList.toggle("task-done");
    });
  });
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
export function addEditEventListeners() {
  const openEditTaskButtonList = document.querySelectorAll(
    "[open-edit-task-modal]"
  );
  const closeEditTaskButtonList = document.querySelectorAll(
    "[close-edit-task-modal]"
  );
  const EditTaskModalList = document.querySelectorAll("[show-edit-task-modal]");
  const confirmedEditTaskList = document.querySelectorAll("[edit-task]");

  openEditTaskButtonList.forEach((openEditTaskButton, i) => {
    openEditTaskButton?.addEventListener("click", () => {
      EditTaskModalList[i].showModal();
    });
  });

  closeEditTaskButtonList.forEach((closeEditTaskButton, i) => {
    closeEditTaskButton?.addEventListener("click", () => {
      EditTaskModalList[i].close();
    });
  });

  confirmedEditTaskList.forEach((confirmedEditTask, i) => {
    confirmedEditTask?.addEventListener("click", () => {
      // saveEditTask(confirmedEditTask);
      console.log("save");

      EditTaskModalList[i].close();
    });
  });
}

export function removeEditEventListeners() {
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
      newTask?.priority,
      newTask?.isCompleted
    ) + feed.innerHTML;
}
