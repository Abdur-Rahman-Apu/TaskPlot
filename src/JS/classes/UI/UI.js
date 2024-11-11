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
    const sidebarContainer = selectElm("aside");
    const allTaskCountElm = selectElm(".all-task-count");
    const newTaskCountElm = selectElm(".new-task-count");
    const inProgressTaskCountElm = selectElm(".in-progress-task-count");
    const completeTaskCountElm = selectElm(".complete-task-count");

    const addTaskBtn = selectElm(".add-task-btn");
    const taskModalContainer = selectElm(".task-modal-section");
    const modalCloseIcon = selectElm(".task-modal .close-icon");

    const taskModal = selectElm(".task-modal");
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
    const tasksSectionTitle = selectElm(".tasks-section-title");
    const taskActionName = selectElm(".task-action-name");
    const deleteTaskBtn = selectElm(".delete-task");
    const taskActionBtn = selectElm(".task-action");

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
      tasksSectionTitle,
      taskActionName,
      deleteTaskBtn,
      taskActionBtn,
      taskModal,
      allTaskCountElm,
      newTaskCountElm,
      inProgressTaskCountElm,
      completeTaskCountElm,
      sidebarContainer,
    };
  }

  #showToast(msg) {
    const { toastContainer, toastMsg } = this.#loadSelector();

    toastMsg.innerText = msg;

    addStyle(toastContainer, { display: "flex" });
  }

  #hideToast() {
    const { toastContainer } = this.#loadSelector();

    setTimeout(() => {
      addStyle(toastContainer, { display: "none" });
    }, 2000);
  }

  #displayToastMsg(action) {
    let toastMsg;

    if (action === "new") {
      toastMsg = "Added a new task";
    }

    if (action === "edit") {
      toastMsg = "Task Edited";
    }

    if (action === "delete") {
      toastMsg = "Task Deleted";
    }
    this.#showToast(toastMsg);
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
          return `<div class="task-card view-card" data-id="${task?.id}">
          <div class="task-card-left-side" data-id="${task?.id}">
            <p class="task-title">${task?.title}</p>
            <p class="task-team-name">${task?.teamName}</p>
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

  #getTasksCategoryWise() {
    const allTasks = data.allTasks;

    const newTasks = allTasks?.filter((task) => task.progress == 0);

    const inProgressTasks = allTasks?.filter(
      (task) => task.progress > 0 && task.progress < 100
    );

    const completedTasks = allTasks?.filter((task) => task.progress == 100);

    return { allTasks, newTasks, inProgressTasks, completedTasks };
  }

  #populateUIOfTaskCount() {
    const {
      allTaskCountElm,
      newTaskCountElm,
      inProgressTaskCountElm,
      completeTaskCountElm,
    } = this.#loadSelector();

    const { allTasks, newTasks, inProgressTasks, completedTasks } =
      this.#getTasksCategoryWise();

    allTaskCountElm.innerText = allTasks?.length ?? 0;
    newTaskCountElm.innerText = newTasks?.length ?? 0;
    inProgressTaskCountElm.innerText = inProgressTasks?.length ?? 0;
    completeTaskCountElm.innerText = completedTasks?.length ?? 0;
  }

  #populateUIAfterTaskUpdated({ action }) {
    this.#displayTasks();
    this.#populateUIOfTaskCount();
    this.#displayToastMsg(action);
    this.#handleCloseModal();
    this.#emptyModalInputs();
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

  #updateUIForNewTask() {
    const { taskActionName, deleteTaskBtn, taskActionBtn } =
      this.#loadSelector();

    taskActionName.innerText = "Create a New Task";
    taskActionBtn.innerText = "Create Task";
    taskActionBtn.dataset.action = "create";
    delete taskActionBtn.dataset.id;

    console.log(deleteTaskBtn);
    console.log(deleteTaskBtn.classLists);

    if (!deleteTaskBtn?.classList.contains("hidden")) {
      deleteTaskBtn.classList.add("hidden");
    }
  }

  #populateDataStorage({ taskData, action }) {
    console.log(taskData, action);
    if (action === "new") {
      data.allTasks = taskData;
      data.displayTasks = data.allTasks;
    }

    if (action === "edit") {
      const taskId = taskData?.id;
      const allTaskData = data.allTasks;
      const findIndex = allTaskData.findIndex((task) => task.id == taskId);
      console.log(findIndex, "findindex");
      if (findIndex !== -1) {
        allTaskData[findIndex] = taskData;
      }

      data.emptyAllTasks = [];
      data.allTasks = allTaskData;
      data.displayTasks = data.allTasks;
    }

    if (action === "delete") {
      const taskId = taskData?.id;
      const allTaskData = data.allTasks;
      const filteredData = allTaskData.filter((task) => task.id != taskId);
      data.emptyAllTasks = [];
      data.allTasks = filteredData;
      data.displayTasks = data.allTasks;
    }

    storage.setIntoStorage(data.allTasks);
  }

  #populateTaskData({ action, taskId }) {
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
      id: action === "new" ? this.#getId() : Number(taskId),
      title: taskTitleInput?.value,
      description: taskDescriptionInput?.value,
      teamName: teamNameInput?.value,
      deadline: this.#getDesiredDeadLineFormat(deadLineInput?.value),
      progress: progressInput?.value,
      teamPic: this.#getRandomTeamPic(),
    };

    this.#populateDataStorage({ taskData, action });

    this.#populateUIAfterTaskUpdated({ action });
  }

  #handleAddNewTask() {
    this.#updateUIForNewTask();
    console.log("add new task");
    this.#populateTaskData({ action: "new" });
  }

  #handleOpenModalForNewTask() {
    this.#updateUIForNewTask();
    this.#handleOpenModal();
  }

  #updateUIForEditTask({ taskId }) {
    const {
      taskActionName,
      deleteTaskBtn,
      taskTitleInput,
      taskDescriptionInput,
      teamNameInput,
      progressInput,
      deadLineInput,
      taskActionBtn,
    } = this.#loadSelector();

    taskActionName.innerText = "Edit Task";
    taskActionBtn.dataset.id = taskId;

    deleteTaskBtn.classList.remove("hidden");
    deleteTaskBtn.dataset.id = taskId;

    const taskDetails = data.allTasks.find((task) => task.id == taskId);

    console.log(taskDetails, "task details");

    taskTitleInput.value = taskDetails?.title;
    taskDescriptionInput.value = taskDetails?.description;
    teamNameInput.value = taskDetails?.teamName;
    deadLineInput.value = this.#getDesiredDeadLineFormat(taskDetails?.deadline);
    progressInput.value = taskDetails?.progress;

    taskActionBtn.innerText = "Edit Task";
    taskActionBtn.dataset.action = "edit";
  }

  #handleEditTask({ taskId }) {
    // this.#updateUIForEditTask();
    console.log(taskId);
    this.#populateTaskData({ action: "edit", taskId });
  }

  #handleDeleteTask({ taskId }) {
    console.log("delete", taskId);
    const taskData = { id: taskId };
    this.#populateDataStorage({ taskData, action: "delete" });

    this.#populateUIAfterTaskUpdated({ action: "delete" });
  }

  #handleModalActions(e) {
    console.log(e.target);
    const action = e.target.dataset.action;
    console.log(action);

    switch (action) {
      case "create":
        this.#handleAddNewTask();
        break;

      case "edit":
        this.#handleEditTask({ taskId: e.target.dataset.id });
        break;

      case "delete":
        this.#handleDeleteTask({ taskId: e.target.dataset.id });
        break;

      case "cancel":
        this.#handleCloseModal();
        break;

      default:
        break;
    }
  }

  #emptyAllReqMsgOfInputs() {
    const {
      taskTitleInput,
      taskDescriptionInput,
      teamNameInput,
      deadLineInput,
    } = this.#loadSelector();
    const inputArr = [
      taskTitleInput,
      taskDescriptionInput,
      teamNameInput,
      deadLineInput,
    ];

    inputArr.forEach((input) => this.#hideInputRequiredMsg(input));
  }

  #handleOpenModal(e) {
    const { taskModalContainer } = this.#loadSelector();

    addStyle(taskModalContainer, { display: "flex" });
  }

  #handleCloseModal(e) {
    const { taskModalContainer, taskModal } = this.#loadSelector();

    taskModal.scroll(0, 0);

    addStyle(taskModalContainer, { display: "none" });

    this.#emptyModalInputs();
    this.#emptyAllReqMsgOfInputs();
  }

  #handleTaskCardView(e) {
    console.log(e.target);
    const targetElm = e.target;
    console.log(e.target.closest(".task-card"));
    const taskCardContainer = targetElm.closest(".task-card");

    if (taskCardContainer) {
      this.#handleOpenModal();
      if (taskCardContainer.classList.contains("add-new-task")) {
        console.log("Add new task");
        this.#updateUIForNewTask();
      }
      if (taskCardContainer.classList.contains("view-card")) {
        console.log("view task");
        const taskId = taskCardContainer.dataset.id;
        this.#updateUIForEditTask({ taskId });
      }
    }
  }

  #removePreviousActiveCategoryClass() {
    const { sidebarContainer } = this.#loadSelector();
    const allChild = sidebarContainer.children;

    Array.from(allChild).forEach((child) => {
      console.log(child, "child");
      if (child.classList.contains("active")) {
        child.classList.remove("active");
      }
    });
  }

  #populateURL({ query, value }) {
    const url = new URL(location.href);
    url.searchParams.delete(query);
    url.searchParams.set(query, value);
    console.log(url);
    history.pushState(null, "", url);
  }

  #populateUIForChangingCategory({ categoryName, classes }) {
    this.#removePreviousActiveCategoryClass();
    classes.add("active");
    this.#populateURL({ query: "category", value: categoryName });

    const { allTasks, newTasks, inProgressTasks, completedTasks } =
      this.#getTasksCategoryWise();

    switch (categoryName) {
      case "all":
        data.displayTasks = allTasks;
        break;
      case "new":
        data.displayTasks = newTasks;
        break;
      case "inProgress":
        data.displayTasks = inProgressTasks;
        break;
      case "complete":
        data.displayTasks = completedTasks;
        break;
    }

    this.#displayTasks();
  }

  #handleChangeTaskCategory(e) {
    console.log(e.target);
    const categoryParentElm = e.target.closest(".category");
    console.log(categoryParentElm);

    if (categoryParentElm) {
      const classes = categoryParentElm.classList;
      console.log(classes);

      if (classes.contains("all-tasks") && !classes.contains("active")) {
        this.#populateUIForChangingCategory({ categoryName: "all", classes });
      }
      if (classes.contains("new-tasks") && !classes.contains("active")) {
        this.#populateUIForChangingCategory({ categoryName: "new", classes });
      }
      if (
        classes.contains("in-progress-tasks") &&
        !classes.contains("active")
      ) {
        this.#populateUIForChangingCategory({
          categoryName: "inProgress",
          classes,
        });
      }
      if (classes.contains("complete-tasks") && !classes.contains("active")) {
        this.#populateUIForChangingCategory({
          categoryName: "complete",
          classes,
        });
      }
    }
  }

  #handleDisplayInitialTasks() {
    window.history.replaceState({}, document.title, "tasks?category=all");
    const tasks = storage.getFromStorage();
    if (tasks && tasks?.length) {
      data.allTasks = tasks;
      data.displayTasks = data.allTasks;
    }
    this.#displayTasks();
    this.#populateUIOfTaskCount();
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
      tasksCardContainer,
      sidebarContainer,
    } = this.#loadSelector();

    listenEvent(
      document,
      "DOMContentLoaded",
      this.#handleDisplayInitialTasks.bind(this)
    );

    listenEvent(
      addTaskBtn,
      "click",
      this.#handleOpenModalForNewTask.bind(this)
    );

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
      tasksCardContainer,
      "click",
      this.#handleTaskCardView.bind(this)
    );
    listenEvent(
      sidebarContainer,
      "click",
      this.#handleChangeTaskCategory.bind(this)
    );
  }
}

const ui = new UI();

export default ui;
