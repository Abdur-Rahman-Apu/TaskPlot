import { addStyle, listenEvent, selectElm } from "../../utils/utils";

class UI {
  #loadSelector() {
    const addTaskBtn = selectElm(".add-task-btn");
    const taskModalContainer = selectElm(".task-modal-section");
    const modalCloseIcon = selectElm(".task-modal .close-icon");

    const taskTitleInput = selectElm("#task-title");
    const taskDescriptionInput = selectElm("#task-description");
    const teamNameInput = selectElm("#team-name");
    const deadLineInput = selectElm("#deadline");
    const progressInput = selectElm("#progress");
    const createTaskBtn = selectElm(".create-task");

    return {
      addTaskBtn,
      taskModalContainer,
      modalCloseIcon,
      taskTitleInput,
      taskDescriptionInput,
      teamNameInput,
      deadLineInput,
      progressInput,
      createTaskBtn,
    };
  }

  #handleProgressValue(e) {
    console.log(e.target.value);
    const progressInput = e.target;
    const value = Number(progressInput.value);

    if (value < 0) {
      progressInput.value = 0;
    }

    if (value > 100) {
      progressInput.value = 100;
    }
  }

  #handleAddNewTask() {
    console.log("add new task");
    const {
      taskTitleInput,
      taskDescriptionInput,
      teamNameInput,
      deadLineInput,
      progressInput,
      createTaskBtn,
    } = this.#loadSelector();
  }
  #handleEditTask() {}
  #handleDeleteTask() {}

  #handleOpenModal(e) {
    const { taskModalContainer } = this.#loadSelector();

    addStyle(taskModalContainer, { display: "flex" });
    console.log(e.currentTarget);
    const action = e.currentTarget.dataset.action;

    switch (action) {
      case "add":
        this.#handleAddNewTask();
        break;

      default:
        break;
    }
  }

  #handleCloseModal(e) {
    const { taskModalContainer } = this.#loadSelector();

    addStyle(taskModalContainer, { display: "none" });
  }

  init() {
    const { addTaskBtn, taskModalContainer, modalCloseIcon, progressInput } =
      this.#loadSelector();

    listenEvent(addTaskBtn, "click", this.#handleOpenModal.bind(this));
    listenEvent(modalCloseIcon, "click", this.#handleCloseModal.bind(this));

    listenEvent(progressInput, "keyup", this.#handleProgressValue.bind(this));
  }
}

const ui = new UI();

export default ui;
