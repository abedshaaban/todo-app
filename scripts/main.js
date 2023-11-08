// task format

function getFormat(id, title, description, dueDate, priority) {
  return `<div id="${id}" class="task flex-row">
<div class="drag-task-handler center pointer">
  <img src="./public/drag-handle-dots.svg" alt="" />
</div>

<div class="task-content flex-col">
  <div class="task-head flex-row">
    <h2>${title}</h2>

    <div class="task-head-actions flex-row">
      <span class="task-head-actions-priority ${
        priority == "High"
          ? "priority-high"
          : priority == "Medium"
          ? "priority-medium"
          : "priority-low"
      }">
      ${priority}
      </span>

      <span>${dueDate}</span>

      <button class="task-head-actions-btn center bg-green">
        <img src="./public/check.svg" alt="check icon" />
      </button>

      <button
      open-delete-confirmation-modal
      class="task-head-actions-btn center bg-red">
      <img src="./public/trash.svg" alt="trash icon" />
    </button>

      <dialog delete-confirmation-modal>
        <form id="form-task" method="dialog">
          <div class="form-header">Delete Task</div>

          <div class="form-content flex-col">
            <div style="text-wrap: wrap">
              Deleting this post is not reversable. Once the task is
              deleted, it is gone for ever.
            </div>
          </div>

          <div class="form-footer">
            <button
              close-delete-confirmation-modal
              type="reset"
              class="form-footer-button">
              Close
            </button>

            <button
              confirmed-delete-task
              task-parent="${id}"
              type="button"
              class="form-footer-button bg-red">
              Delete
            </button>
          </div>
        </form>
      </dialog>
    </div>
  </div>

  <div class="task-description">
    <p>${description}</p>
  </div>
</div>
</div>`;
}

// load tasks from local storage
if (typeof Storage !== "undefined") {
  const savedTasks = JSON.parse(localStorage.getItem("tasks-list"));

  const feed = document.getElementById("feed");

  if (savedTasks == null) {
    feed.innerHTML = "<p>you don't have any tasks</p>";
  } else {
    feed.innerHTML = "";

    for (let i = 0; i < savedTasks.length; i++) {
      const task = savedTasks[i];

      feed.innerHTML += getFormat(
        task?.id,
        task?.title,
        task?.description,
        task?.dueDate,
        task?.priority
      );
    }
  }
}

// show-hide input text

const openButton = document.querySelector("[open-data-modal]");
const closeButton = document.querySelector("[close-data-modal]");
const modal = document.querySelector("[data-modal]");

openButton.addEventListener("click", () => {
  modal.showModal();
});

closeButton.addEventListener("click", () => {
  modal.close();
});

// get submit and handle submit task

const submitButton = document.getElementById("form-task");

submitButton.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskTitle = document.getElementById("task-title");
  const taskDescription = document.getElementById("task-description");
  const taskDueDate = document.getElementById("task-due-date");
  const taskPriority = document.getElementById("task-priority");

  let taskTitleValue = taskTitle.value;
  let taskDescriptionValue = taskDescription.value;
  let taskDueDateValue = taskDueDate.value;
  let taskPriorityValue = taskPriority.value;

  SaveTaskToLocalStorage(
    taskTitleValue,
    taskDescriptionValue,
    taskDueDateValue,
    taskPriorityValue
  );

  taskTitle.value = "";
  taskDescription.value = "";
  taskDueDate.value = "";
  taskPriority.value = "";

  modal.close();
});

function SaveTaskToLocalStorage(title, description, dueDate, priority) {
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

  location.reload();
}

// delete task

// show-hide input text

const openDeleteTaskButton = document.querySelector(
  "[open-delete-confirmation-modal]"
);
const closeDeleteTaskButton = document.querySelector(
  "[close-delete-confirmation-modal]"
);
const DeleteTaskModal = document.querySelector("[delete-confirmation-modal]");
const confirmedDeleteTask = document.querySelector("[confirmed-delete-task]");

openDeleteTaskButton?.addEventListener("click", () => {
  DeleteTaskModal.showModal();
});

closeDeleteTaskButton?.addEventListener("click", () => {
  DeleteTaskModal.close();
});

confirmedDeleteTask?.addEventListener("click", () => {
  const taskID = confirmedDeleteTask.getAttribute("task-parent");
  const taskToBeRemoved = document.getElementById(taskID);
  const oldTasks = JSON.parse(localStorage.getItem("tasks-list"));

  console.log(taskID);
  taskToBeRemoved.setAttribute("class", "is-removed");

  let newTaskList = [];

  for (let i = 0; i < oldTasks.length; i++) {
    if (oldTasks[i].id != taskID) {
      newTaskList.push(oldTasks[i]);
    }
  }
  console.log(newTaskList);

  localStorage.setItem("tasks-list", JSON.stringify(newTaskList));

  DeleteTaskModal.close();
});
