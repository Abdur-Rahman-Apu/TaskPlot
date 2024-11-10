import { addStyle, listenEvent, selectElm } from "../../utils/utils";

class UI {
  #loadSelector() {
    const addTaskBtn = selectElm(".add-task-btn");
    const taskModalContainer = selectElm(".task-modal-section");
    const modalCloseIcon = selectElm(".task-modal .close-icon");

    const taskModalBody = selectElm(".task-modal-body");
    const taskTitleInput = selectElm("#task-title");
    const taskDescriptionInput = selectElm("#task-description");
    const teamNameInput = selectElm("#team-name");
    const deadLineInput = selectElm("#deadline");
    const progressInput = selectElm("#progress");
    // const createTaskBtn = selectElm(".create-task");
    const modalActionsContainer = selectElm(".modal-actions");

    return {
      addTaskBtn,
      taskModalContainer,
      modalCloseIcon,
      taskTitleInput,
      taskDescriptionInput,
      teamNameInput,
      deadLineInput,
      progressInput,
      modalActionsContainer,
      taskModalBody,
    };
  }

  #handleHideDeadlineErrMsg(e) {
    console.log(e.target, "handleHidedeadlei");
    console.log(e.target.value);
    if (e.target.value) {
      this.#hideInputRequiredMsg(e.target);
    }
  }

  #handleInputChangeAndHideErrMsg(e) {
    console.log(e.target);
    const targetElm = e.target;
    const tagName = targetElm.tagName.toLowerCase();
    console.log(tagName);
    if (tagName === "input" || tagName === "textarea") {
      console.log(targetElm.type);
      if (targetElm.value && targetElm.type !== "number") {
        this.#hideInputRequiredMsg(targetElm);
      }
    }
  }

  #hideInputRequiredMsg(targetElm) {
    addStyle(targetElm.nextElementSibling, { display: "none" });
  }

  #displayInputRequiredMsg(input) {
    input.focus();
    const errMsgElm = input.nextElementSibling;
    addStyle(errMsgElm, { display: "block" });
  }

  #isInputFieldEmpty(input) {
    return Number(input.value) === 0 ? true : false;
  }

  #inputValidation() {
    const {
      taskTitleInput,
      taskDescriptionInput,
      teamNameInput,
      deadLineInput,
      progressInput,
    } = this.#loadSelector();

    const isTitleEmpty = this.#isInputFieldEmpty(taskTitleInput);
    if (isTitleEmpty) {
      this.#displayInputRequiredMsg(taskTitleInput);
      return;
    }
    const isDescriptionEmpty = this.#isInputFieldEmpty(taskDescriptionInput);
    if (isDescriptionEmpty) {
      this.#displayInputRequiredMsg(taskDescriptionInput);
      return;
    }
    const isTeamNameEmpty = this.#isInputFieldEmpty(teamNameInput);
    if (isTeamNameEmpty) {
      this.#displayInputRequiredMsg(teamNameInput);
      return;
    }
    const isDeadLineEmpty = this.#isInputFieldEmpty(deadLineInput);
    if (isDeadLineEmpty) {
      this.#displayInputRequiredMsg(deadLineInput);
      return;
    }

    return true;
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
    } = this.#loadSelector();

    const isSuccessValidation = this.#inputValidation();

    if (!isSuccessValidation) return;
  }
  #handleEditTask() {}
  #handleDeleteTask() {}

  #handleModalActions(e) {
    const action = e.target.dataset.action;
    console.log(action);

    switch (action) {
      case "create":
        this.#handleAddNewTask();
        break;

      default:
        break;
    }
  }

  #handleOpenModal(e) {
    const { taskModalContainer } = this.#loadSelector();

    addStyle(taskModalContainer, { display: "flex" });
  }

  #handleCloseModal(e) {
    const { taskModalContainer } = this.#loadSelector();

    addStyle(taskModalContainer, { display: "none" });
  }

  init() {
    const {
      addTaskBtn,
      taskModalContainer,
      modalCloseIcon,
      progressInput,
      modalActionsContainer,
      taskModalBody,
      deadLineInput,
    } = this.#loadSelector();

    listenEvent(addTaskBtn, "click", this.#handleOpenModal.bind(this));

    listenEvent(modalCloseIcon, "click", this.#handleCloseModal.bind(this));

    listenEvent(progressInput, "keyup", this.#handleProgressValue.bind(this));
    listenEvent(
      deadLineInput,
      "change",
      this.#handleHideDeadlineErrMsg.bind(this)
    );

    listenEvent(
      taskModalBody,
      "keyup",
      this.#handleInputChangeAndHideErrMsg.bind(this)
    );

    listenEvent(
      modalActionsContainer,
      "click",
      this.#handleModalActions.bind(this)
    );
    listenEvent(
      modalActionsContainer,
      "click",
      this.#handleModalActions.bind(this)
    );
  }
}

const ui = new UI();

export default ui;
