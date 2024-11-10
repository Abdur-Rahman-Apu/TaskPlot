import firstTeamImg from "../../../assets/avatars/1.png";
import tenTeamImg from "../../../assets/avatars/10.png";
import secondTeamImg from "../../../assets/avatars/2.png";
import thirdTeamImg from "../../../assets/avatars/3.png";
import fourthTeamImg from "../../../assets/avatars/4.png";
import fifthTeamImg from "../../../assets/avatars/5.png";
import sixthTeamImg from "../../../assets/avatars/6.png";
import seventhTeamImg from "../../../assets/avatars/7.png";
import eightTeamImg from "../../../assets/avatars/8.png";
import nineTeamImg from "../../../assets/avatars/9.png";
import { addStyle, listenEvent, selectElm } from "../../utils/utils";
import data from "../Data/Data";
import storage from "../Storage/Storage";

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
    const toastContainer = selectElm(".toast-section");
    const toastMsg = selectElm(".toast-message");
    const tasksCardContainer = selectElm(".tasks");

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
      toastContainer,
      toastMsg,
      tasksCardContainer,
    };
  }

  #showToast(msg) {
    const { toastContainer, toastMsg } = this.#loadSelector();

    addStyle(toastContainer, { display: "flex" });
  }
  #hideToast() {
    const { toastContainer } = this.#loadSelector();

    setTimeout(() => {
      addStyle(toastContainer, { display: "none" });
    }, 2000);
  }

  #displayToastMsg() {
    this.#showToast();
    this.#hideToast();
  }

  #getTeamMemImg(num) {
    switch (num) {
      case 1:
        return firstTeamImg;
      case 2:
        return secondTeamImg;
      case 3:
        return thirdTeamImg;
      case 4:
        return fourthTeamImg;
      case 5:
        return fifthTeamImg;
      case 6:
        return sixthTeamImg;
      case 7:
        return seventhTeamImg;
      case 8:
        return eightTeamImg;
      case 9:
        return nineTeamImg;
      case 10:
        return tenTeamImg;
    }
  }

  #getTaskCardsHTML() {
    const tasks = data.displayTasks;

    // console.log(foo);
    // console.log(teamImages);
    const cards = tasks?.length
      ? tasks.map((task) => {
          console.log(task);
          console.log(task, "team pic");
          return `<div class="task-card" data-id="${task?.id}">
          <div class="task-card-left-side">
            <p class="task-title">${task?.title}</p>
            <p class="task-type">${task?.teamName}</p>

            <div class="team">
              <p class="team-title">Team</p>
              <div class="team-img">
                <img src=${this.#getTeamMemImg(
                  task?.teamPic[0]
                )} alt="This image is indicating the first team member image" />

                <img src=${this.#getTeamMemImg(
                  task?.teamPic[1]
                )} alt="This image is indicating the second team member image" />

                <img src=${this.#getTeamMemImg(
                  task?.teamPic[2]
                )}.png" alt="This image is indicating the third team member image" />

                <div class="more-teammate">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
            </div>
            <p class="deadline">
              <i class="fa-solid fa-calendar-days"></i> Deadline:
              <span class="deadline-time">${task?.deadline}</span>
            </p>
          </div>
          <div class="task-card-right-side">
            <div class="progress-percentage">
              <p class="percentage-value">${task?.progress}%</p>
            </div>
          </div>
        </div>`;
        })
      : [];

    cards.push(`<div class="task-card add-new-task">
                    <div class="add-icon">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <p>Add New Task</p>
                </div>`);

    return cards.join("");
  }

  #displayTasks() {
    const { tasksCardContainer } = this.#loadSelector();
    const taskCardsHTML = this.#getTaskCardsHTML();
    tasksCardContainer.innerHTML = taskCardsHTML;
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

  #emptyModalInputs() {
    const {
      taskTitleInput,
      taskDescriptionInput,
      teamNameInput,
      deadLineInput,
      progressInput,
    } = this.#loadSelector();

    taskTitleInput.value = "";
    taskDescriptionInput.value = "";
    teamNameInput.value = "";
    deadLineInput.value = "";
    progressInput.value = 0;
  }

  #inputValidation() {
    const {
      taskTitleInput,
      taskDescriptionInput,
      teamNameInput,
      deadLineInput,
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

  #getId() {
    const allTasks = data.allTasks;

    if (allTasks?.length) {
      const id = Number(allTasks[allTasks.length - 1]?.id);
      return id + 1;
    } else {
      return 1;
    }
  }

  #getDesiredDeadLineFormat(value) {
    const dateArr = value.split("-");

    return dateArr.reverse().join("-");
  }

  #getRandomTeamPic() {
    const teamPicArr = [];
    for (let i = 0; i < 3; i++) {
      const start = i * 4;
      const end = i * 3 + 3 + i > 10 ? 10 : i * 3 + 3 + i;
      const picNumb = Math.ceil(Math.random() * (end - start) + start);

      teamPicArr.push(picNumb);
    }
    return teamPicArr;
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

    const taskData = {
      id: this.#getId(),
      title: taskTitleInput?.value,
      description: taskDescriptionInput?.value,
      teamName: teamNameInput?.value,
      deadline: this.#getDesiredDeadLineFormat(deadLineInput?.value),
      progress: progressInput?.value,
      teamPic: this.#getRandomTeamPic(),
    };

    data.allTasks = taskData;
    data.displayTasks = data.allTasks;
    storage.setIntoStorage(data.allTasks);

    this.#displayTasks();
    this.#displayToastMsg("Added a new task");
    this.#handleCloseModal();
    this.#emptyModalInputs();
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

  #handleDisplayInitialTasks() {
    window.history.replaceState({}, document.title, "tasks?categories=all");
    const tasks = storage.getFromStorage();
    if (tasks && tasks?.length) {
      data.allTasks = tasks;
      data.displayTasks = data.allTasks;
    }
    this.#displayTasks();
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

    listenEvent(
      document,
      "DOMContentLoaded",
      this.#handleDisplayInitialTasks.bind(this)
    );

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
