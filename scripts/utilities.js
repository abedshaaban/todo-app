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

function editTask(id, title, description, dueDate, priority) {
  const oldTasks = JSON.parse(localStorage.getItem("tasks-list"));
  const taskDiv = document.getElementById(id);
  const isCompleted = taskDiv.classList.contains("mark-as-done-active");

  let newTaskList = [];

  for (let i = 0; i < oldTasks.length; i++) {
    if (oldTasks[i].id != id) {
      newTaskList.push(oldTasks[i]);
    } else {
      newTaskList.push({
        id: id,
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        isCompleted: isCompleted,
      });
    }
  }

  localStorage.setItem("tasks-list", JSON.stringify(newTaskList));

  location.reload();
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

export function removeEditEventListeners() {
  const openEditTaskButtonList = document.querySelectorAll(
    "[open-edit-task-modal]"
  );
  const closeEditTaskButtonList = document.querySelectorAll(
    "[close-edit-task-modal]"
  );
  const EditTaskModalList = document.querySelectorAll("[show-edit-task-modal]");
  const confirmedEditTaskList = document.querySelectorAll("[edit-task]");

  openEditTaskButtonList.forEach((openEditTaskButton, i) => {
    openEditTaskButton?.removeEventListener("click", () => {
      EditTaskModalList[i].showModal();
    });
  });

  closeEditTaskButtonList.forEach((closeEditTaskButton, i) => {
    closeEditTaskButton?.removeEventListener("click", () => {
      EditTaskModalList[i].close();
    });
  });

  confirmedEditTaskList.forEach((confirmedEditTask, i) => {
    confirmedEditTask?.removeEventListener("click", () => {
      console.log("save");

      EditTaskModalList[i].close();
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
      const taskID = confirmedEditTask.getAttribute("task-parent");

      const taskTitle = document.getElementById("edit-task-title-" + taskID);
      const taskDescription = document.getElementById(
        "edit-task-description-" + taskID
      );
      const taskDueDate = document.getElementById(
        "edit-task-due-date-" + taskID
      );
      const taskPriority = document.getElementById(
        "edit-task-priority-" + taskID
      );

      let taskTitleValue = taskTitle.value;
      let taskDescriptionValue = taskDescription.value;
      let taskDueDateValue = taskDueDate.value;
      let taskPriorityValue = taskPriority.value;

      console.log(
        taskTitleValue,
        taskDescriptionValue,
        taskDueDateValue,
        taskPriorityValue
      );

      editTask(
        taskID,
        taskTitleValue,
        taskDescriptionValue,
        taskDueDateValue,
        taskPriorityValue
      );

      console.log("save");

      EditTaskModalList[i].close();
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

  location.reload();
}

export function addEventListenerToDragAndDropTasks() {
  const feed = document.getElementById("feed");
  const taskList = feed.querySelectorAll(".task");

  taskList.forEach((task) => {
    task.addEventListener("dragstart", () => {
      setTimeout(() => task.classList.add("task-dragging"), 0);
    });

    task.addEventListener("dragend", () =>
      task.classList.remove("task-dragging")
    );
  });

  const sortableFeed = (e) => {
    e.preventDefault();
    const draggingTask = document.querySelector(".task-dragging");
    // Getting all items except currently dragging and making array of them
    let siblings = [...feed.querySelectorAll(".task:not(.task-dragging)")];
    // Finding the sibling after which the dragging item should be placed
    let nextTask = siblings.find((sibling) => {
      return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    // Inserting the dragging item before the found sibling
    feed.insertBefore(draggingTask, nextTask);
  };

  feed.addEventListener("dragover", sortableFeed);
  feed.addEventListener("dragenter", (e) => e.preventDefault());
}

export function removeEventListenerToDragAndDropTasks() {
  const feed = document.getElementById("feed");
  const taskList = feed.querySelectorAll(".task");

  taskList.forEach((task) => {
    task.removeEventListener("dragstart", () => {
      setTimeout(() => task.classList.add("task-dragging"), 0);
    });

    task.removeEventListener("dragend", () =>
      task.classList.remove("task-dragging")
    );
  });

  const sortableFeed = (e) => {
    e.preventDefault();
    const draggingTask = document.querySelector(".task-dragging");
    // Getting all items except currently dragging and making array of them
    let siblings = [...feed.querySelectorAll(".task:not(.task-dragging)")];
    // Finding the sibling after which the dragging item should be placed
    let nextTask = siblings.find((sibling) => {
      return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    // Inserting the dragging item before the found sibling
    feed.insertBefore(draggingTask, nextTask);
  };

  feed.removeEventListener("dragover", sortableFeed);
  feed.removeEventListener("dragenter", (e) => e.preventDefault());
}
