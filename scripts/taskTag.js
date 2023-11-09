export const getFormat = (
  id,
  title,
  description,
  dueDate,
  priority,
  isCompleted
) => {
  return `<div id="${id}" class="task flex-row ${
    isCompleted ? "task-done mark-as-done-active" : ""
  }">
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
  
        <button
        edit-parent="123"
        open-edit-task-modal
        class="task-head-actions-btn center bg-gray">
          <img src="./public/edit.svg" alt="edit icon" />
        </button>

        <button
        complete-task="${id}"
        class="task-head-actions-btn center bg-green">
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

        <dialog show-edit-task-modal>
          <form id="form-task-edit" method="dialog">
            <div class="form-header">Edit Task</div>

            <div id="form-task-edit-content" class="form-content flex-col"></div>

            <div class="form-footer">
              <button
                close-edit-task-modal
                type="reset"
                class="form-footer-button">
                Discard
              </button>

              <button
                edit-task
                task-parent="123"
                type="button"
                class="form-footer-button bg-red">
                Save
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

  <div class="mark-as-done">
    <img src="./public/done.png" alt="done" />
  </div>
  </div>`;
};
