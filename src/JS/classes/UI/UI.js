import { addStyle, listenEvent, selectElm } from "../../utils/utils";

class UI {
  #loadSelector() {
    const addTaskBtn = selectElm(".add-task-btn");
    const taskModalContainer = selectElm(".task-modal-section");
    const modalCloseIcon = selectElm(".task-modal .close-icon");
    return { addTaskBtn, taskModalContainer, modalCloseIcon };
  }

  #handleOpenModal(e) {
    const { taskModalContainer } = this.#loadSelector();

    addStyle(taskModalContainer, { display: "flex" });
    console.log(e.currentTarget);
    const action = e.currentTarget.dataset.action;
  }

  #handleCloseModal(e) {
    const { taskModalContainer } = this.#loadSelector();

    addStyle(taskModalContainer, { display: "none" });
  }

  init() {
    const { addTaskBtn, taskModalContainer, modalCloseIcon } =
      this.#loadSelector();

    listenEvent(addTaskBtn, "click", this.#handleOpenModal.bind(this));
    listenEvent(modalCloseIcon, "click", this.#handleCloseModal.bind(this));
  }
}

const ui = new UI();

export default ui;
