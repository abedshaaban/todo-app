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
  }" draggable="true">
  <div class="drag-task-handler center grab">
    <img src="./public/drag-handle-dots.svg" alt="" />
  </div>
  
  <div class="task-content flex-col">
    <div class="task-head flex-row">
      <h2>${title}</h2>
  
      <div class="task-head-actions flex-row">
        <span id="priority-label" class="task-head-actions-priority ${
          priority == "High"
            ? "priority-high"
            : priority == "Medium"
            ? "priority-medium"
            : "priority-low"
        }">
        ${priority}
        </span>
  
        <span id="due-date-label">${dueDate}</span>
  
        <button
        edit-parent="${id}"
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

            <div id="form-task-edit-content" class="form-content flex-col">
            <div class="form-content-field flex-col">
              <label>Title:</label>
              <input
                type="text"
                id="edit-task-title-${id}"
                maxlength="17"
                required
                value="${title}" />
              <span class="text-sm">(max characters is 17)</span>
            </div>

            <div class="form-content-field flex-col">
              <label>Description:</label>
              <input
                type="text"
                id="edit-task-description-${id}"
                maxlength="250"
                value="${description}" />
              <span class="text-sm">(max characters is 250)</span>
            </div>

            <div class="form-content-field flex-col">
              <label>Due Date:</label>
              <input
                type="date"
                id="edit-task-due-date-${id}"
                class="pointer"
                required
                value="${dueDate}" />
            </div>

            <div class="form-content-field-options flex-col">
              <label>Priority:</label>
              <select id="edit-task-priority-${id}" class="pointer" required>
                <option value="" selected disabled hidden>
                  Priority
                </option>

                <option ${
                  priority === "High" ? "selected" : null
                } value="High">High</option>
                <option ${
                  priority === "Medium" ? "selected" : null
                } value="Medium">Medium</option>
                <option ${
                  priority === "Low" ? "selected" : null
                } value="Low">Low</option>
              </select>
            </div>
            </div>

            <div class="form-footer">
              <button
                close-edit-task-modal
                type="reset"
                class="form-footer-button bg-red">
                Discard
              </button>

              <button
                edit-task
                task-parent="${id}"
                type="button"
                class="form-footer-button bg-green">
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
