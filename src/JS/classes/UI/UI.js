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
import { addStyle, listenEvent, lowerCase, selectElm } from "../../utils/utils";
import data from "../Data/Data";
import storage from "../Storage/Storage";

class UI {
  #loadSelector() {
    const dateShowELm = selectElm(".date");
    const timeShowELm = selectElm(".timer p");

    const searchInput = selectElm("#search");
    const searchBtn = selectElm(".search-btn");

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

    const modalActionsContainer = selectElm(".modal-actions");
    const toastContainer = selectElm(".toast-section");
    const toastMsg = selectElm(".toast-message");
    const tasksCardContainer = selectElm(".tasks");

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
      taskActionName,
      deleteTaskBtn,
      taskActionBtn,
      taskModal,
      allTaskCountElm,
      newTaskCountElm,
      inProgressTaskCountElm,
      completeTaskCountElm,
      sidebarContainer,
      searchInput,
      searchBtn,
      timeShowELm,
      dateShowELm,
    };
  }

  // display the toast message
  #showToast(msg) {
    const { toastContainer, toastMsg } = this.#loadSelector();

    // set the toast message
    toastMsg.innerText = msg;

    addStyle(toastContainer, { display: "flex" });
  }

  // hide the toast message
  #hideToast() {
    const { toastContainer } = this.#loadSelector();

    // hide the toast message after 2 seconds
    setTimeout(() => {
      addStyle(toastContainer, { display: "none" });
    }, 2000);
  }

  // display toast message based on action like new task added, edit a task, and delete a task
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

    // show toast message
    this.#showToast(toastMsg);

    // hide the toast message
    this.#hideToast();
  }

  // this handler is used to open the modal
  #handleOpenModal() {
    const { taskModalContainer } = this.#loadSelector();

    addStyle(taskModalContainer, { display: "flex" });
  }

  // hide input fields required message element
  #hideInputRequiredMsg(targetElm) {
    addStyle(targetElm.nextElementSibling, { display: "none" });
  }

  // hide all input fields required message
  #emptyAllReqMsgOfInputs() {
    const {
      taskTitleInput,
      taskDescriptionInput,
      teamNameInput,
      deadLineInput,
    } = this.#loadSelector();

    // get all input fields into an array
    const inputArr = [
      taskTitleInput,
      taskDescriptionInput,
      teamNameInput,
      deadLineInput,
    ];

    // hide all input fields required message
    inputArr.forEach((input) => this.#hideInputRequiredMsg(input));
  }

  // clear the input fields value of the modal
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

  // this handler is used to close the modal
  #handleCloseModal() {
    const { taskModalContainer, taskModal } = this.#loadSelector();

    // scroll to the top of the modal
    taskModal.scroll(0, 0);

    addStyle(taskModalContainer, { display: "none" });

    // set all the input fields are empty
    this.#emptyModalInputs();

    // hide all required message of the inputs
    this.#emptyAllReqMsgOfInputs();
  }

  // get category wise tasks like: all, new, in progress, and completed tasks
  #getTasksCategoryWise() {
    // get all tasks
    const allTasks = data.allTasks;

    // filtered  new tasks
    const newTasks = allTasks?.filter((task) => task.progress == 0);

    // filtered  in progress tasks
    const inProgressTasks = allTasks?.filter(
      (task) => task.progress > 0 && task.progress < 100
    );

    // filtered completed tasks
    const completedTasks = allTasks?.filter((task) => task.progress == 100);

    return { allTasks, newTasks, inProgressTasks, completedTasks };
  }

  // update UI of the sidebars task category count
  #populateUIOfTaskCount() {
    const {
      allTaskCountElm,
      newTaskCountElm,
      inProgressTaskCountElm,
      completeTaskCountElm,
    } = this.#loadSelector();

    // get category wise tasks data
    const { allTasks, newTasks, inProgressTasks, completedTasks } =
      this.#getTasksCategoryWise();

    // update the UI
    allTaskCountElm.innerText = allTasks?.length ?? 0;
    newTaskCountElm.innerText = newTasks?.length ?? 0;
    inProgressTaskCountElm.innerText = inProgressTasks?.length ?? 0;
    completeTaskCountElm.innerText = completedTasks?.length ?? 0;
  }

  // update style of the progress percentage value indicator
  #updateStyleOfTheProgress() {
    // get all displayed tasks
    const tasks = data.displayTasks;

    tasks.forEach((task) => {
      // get the progress percentage element
      const elm = document.querySelector(`.progress-percentage-${task.id}`);

      // get the progress value from the html
      const progressValue = elm.firstElementChild.innerText.split("%").join("");

      /*
      find the indicator degree
       calculation:
       ------------
      100 percentage=360 deg
      1 percentage = 360/100 deg
      progressValue percentage= (360*progressValue)/100 deg
      */
      const violetIndicatorDeg = (Number(progressValue) * 360) / 100;

      // added style into the progress value
      addStyle(elm, {
        background: `conic-gradient(var(--violet-color) ${violetIndicatorDeg}deg, #d2cdcd 0deg)`,
      });
    });
  }

  // get team member image url
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

  // get task cards html
  #getTaskCardsHTML() {
    const tasks = data.displayTasks;

    // if tasks has value then get html in array format otherwise set empty array into the cards variable
    const cards = tasks?.length
      ? tasks.map((task) => {
          return `<div class="task-card view-card" data-id="${task?.id}">
          <div class="task-card-left-side" data-id="${task?.id}">
            <p class="task-title">${task?.title}</p>
            <p class="task-team-name">${task?.teamName}</p>
            <div class="team">
              <p class="team-title">Team</p>
              <div class="team-img">
                <img src=${this.#getTeamMemImg(
                  task?.teamPic[0]
                )} alt="This image is indicating the first team members image" />

                <img src=${this.#getTeamMemImg(
                  task?.teamPic[1]
                )} alt="This image is indicating the second team members image" />

                <img src=${this.#getTeamMemImg(
                  task?.teamPic[2]
                )}.png" alt="This image is indicating the third team members image" />

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
            <div class="progress-percentage progress-percentage-${task.id}">
              <p class="percentage-value">${task?.progress}%</p>
            </div>
          </div>
        </div>`;
        })
      : [];

    // added task type card html
    cards.push(`<div class="task-card add-new-task">
                    <div class="add-icon">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <p>Add New Task</p>
                </div>`);

    // return the html
    return cards.join("");
  }

  // display all task cards into the task section
  #displayTasks() {
    const { tasksCardContainer } = this.#loadSelector();

    // get all task cards html
    const taskCardsHTML = this.#getTaskCardsHTML();

    // set into the UI
    tasksCardContainer.innerHTML = taskCardsHTML;

    // update the style of the task progress
    this.#updateStyleOfTheProgress();
  }

  // update the ui after task data update action
  #populateUIAfterTaskUpdated({ action }) {
    // display task cards
    this.#displayTasks();

    // update the task count into the sidebar
    this.#populateUIOfTaskCount();

    // display a toast message
    this.#displayToastMsg(action);

    // close the modal
    this.#handleCloseModal();

    // set input fields are empty
    this.#emptyModalInputs();
  }

  // update the data and storage
  #populateDataStorage({ taskData, action }) {
    if (action === "new") {
      // added new task
      data.allTasks = taskData;
      data.displayTasks = data.allTasks;
    }

    if (action === "edit") {
      // edit a task
      const taskId = taskData?.id;
      const allTaskData = data.allTasks;

      // find the index of the task
      const findIndex = allTaskData.findIndex((task) => task.id == taskId);

      if (findIndex !== -1) {
        // update with the new data
        allTaskData[findIndex] = taskData;
      }

      // update the data
      data.emptyAllTasks = [];
      data.allTasks = allTaskData;
      data.displayTasks = data.allTasks;
    }

    if (action === "delete") {
      // delete a task
      const taskId = taskData?.id;
      const allTaskData = data.allTasks;

      // filter data without the specific taskId
      const filteredData = allTaskData.filter((task) => task.id != taskId);

      // update the data
      data.emptyAllTasks = [];
      data.allTasks = filteredData;
      data.displayTasks = data.allTasks;
    }

    // update the localStorage
    storage.setIntoStorage(data.allTasks);
  }

  // 10 team members avatar is stored into the assets folder. Image name format is 1.png/2.png and so on
  // get three random pic into an array
  #getRandomTeamPic() {
    const teamPicArr = [];

    // get three random pic number
    for (let i = 0; i < 3; i++) {
      // i=0 -> start=0 and end=3
      // i=1 -> start=4 and end=7
      // i=2 -> start=8 and end=10
      const start = i * 4;
      const end = i * 3 + 3 + i > 10 ? 10 : i * 3 + 3 + i;

      // get random value from start to end
      const picNumb = Math.ceil(Math.random() * (end - start) + start);

      // store the value
      teamPicArr.push(picNumb);
    }

    // return the team pic number array
    return teamPicArr;
  }

  // get desired input format: 12-11-2024
  #getDesiredDeadLineFormat(value) {
    // now date format is : 2024-11-12
    const dateArr = value.split("-");
    return dateArr.reverse().join("-");
  }

  // get id of the task data
  #getId() {
    const allTasks = data.allTasks;

    if (allTasks?.length) {
      // allTasks has data and get the last task id and return the increment value of the id
      const id = Number(allTasks[allTasks.length - 1]?.id);
      return id + 1;
    } else {
      // allTasks variable is empty
      return 1;
    }
  }

  // display input required message into the UI
  #displayInputRequiredMsg(input) {
    // focus the input
    input.focus();

    // get the error message element
    const errMsgElm = input.nextElementSibling;

    // show the error message element
    addStyle(errMsgElm, { display: "block" });
  }

  // this method is for checking input has value or not
  #isInputFieldEmpty(input) {
    return Number(input.value) === 0 ? true : false;
  }

  // this method is used for validating input fields
  #inputValidation() {
    const {
      taskTitleInput,
      taskDescriptionInput,
      teamNameInput,
      deadLineInput,
    } = this.#loadSelector();

    // check title input is empty or not
    const isTitleEmpty = this.#isInputFieldEmpty(taskTitleInput);

    if (isTitleEmpty) {
      // if title input is empty display the required message
      this.#displayInputRequiredMsg(taskTitleInput);
      return;
    }

    // check description input field is empty or not
    const isDescriptionEmpty = this.#isInputFieldEmpty(taskDescriptionInput);

    if (isDescriptionEmpty) {
      // if description input is empty display the required message
      this.#displayInputRequiredMsg(taskDescriptionInput);
      return;
    }

    // check team name input field is empty or not
    const isTeamNameEmpty = this.#isInputFieldEmpty(teamNameInput);

    if (isTeamNameEmpty) {
      // if team name input is empty display the required message
      this.#displayInputRequiredMsg(teamNameInput);
      return;
    }

    // check deadline input field is empty or not
    const isDeadLineEmpty = this.#isInputFieldEmpty(deadLineInput);

    if (isDeadLineEmpty) {
      // if deadline input is empty display the required message
      this.#displayInputRequiredMsg(deadLineInput);
      return;
    }

    // if input fields are not empty then return true
    return true;
  }

  // update task data and UI after updating the task data
  #populateTaskData({ action, taskId }) {
    const {
      taskTitleInput,
      taskDescriptionInput,
      teamNameInput,
      deadLineInput,
      progressInput,
    } = this.#loadSelector();

    // input validation: check all input fields have value or not
    const isSuccessValidation = this.#inputValidation();

    // if any input field is empty then return from the function
    if (!isSuccessValidation) return;

    // all input fields have value
    const taskData = {
      id: action === "new" ? this.#getId() : Number(taskId),
      title: taskTitleInput?.value,
      description: taskDescriptionInput?.value,
      teamName: teamNameInput?.value,
      deadline: this.#getDesiredDeadLineFormat(deadLineInput?.value),
      progress: progressInput?.value,
      teamPic: this.#getRandomTeamPic(),
    };

    // update the task data
    this.#populateDataStorage({ taskData, action });

    // update the UI after task updated
    this.#populateUIAfterTaskUpdated({ action });
  }

  // update UI of the modal to add new task
  #updateUIForNewTask() {
    const { taskActionName, deleteTaskBtn, taskActionBtn } =
      this.#loadSelector();

    // update the title of the modal
    taskActionName.innerText = "Create a New Task";

    // change task action button name and dataset value
    taskActionBtn.innerText = "Create Task";
    taskActionBtn.dataset.action = "create";
    delete taskActionBtn.dataset.id;

    // hide the delete button of the modal
    if (!deleteTaskBtn?.classList.contains("hidden")) {
      deleteTaskBtn.classList.add("hidden");
    }
  }

  // added new task after clicking on the modal create task button
  #handleAddNewTask() {
    // update UI of the modal for adding new task
    this.#updateUIForNewTask();

    // update task data and the UI
    this.#populateTaskData({ action: "new" });
  }

  // open modal for adding new task after clicking on the navbar add task button
  #handleOpenModalForNewTask() {
    // update UI of the modal for adding new task
    this.#updateUIForNewTask();

    // open the modal
    this.#handleOpenModal();
  }

  // edit the specific task
  #handleEditTask({ taskId }) {
    this.#populateTaskData({ action: "edit", taskId });
  }

  // delete the specific task
  #handleDeleteTask({ taskId }) {
    const taskData = { id: taskId };

    // update data
    this.#populateDataStorage({ taskData, action: "delete" });

    // update the UI after task data modified
    this.#populateUIAfterTaskUpdated({ action: "delete" });
  }

  // this handler is used to handle modal action buttons functionality
  #handleModalActions(e) {
    // get the action name from the target element
    const action = e.target.dataset.action;

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
    }
  }

  // update UI of the modal for editing an existing task
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

    // update the title of the modal
    taskActionName.innerText = "Edit Task";

    // get the task detail information
    const taskDetails = data.allTasks.find((task) => task.id == taskId);

    // update the inputs value with the task details
    taskTitleInput.value = taskDetails?.title;
    taskDescriptionInput.value = taskDetails?.description;
    teamNameInput.value = taskDetails?.teamName;
    deadLineInput.value = this.#getDesiredDeadLineFormat(taskDetails?.deadline);
    progressInput.value = taskDetails?.progress;

    // added id of the task into the edit task button
    taskActionBtn.dataset.id = taskId;
    taskActionBtn.innerText = "Edit Task";
    taskActionBtn.dataset.action = "edit";

    // display the delete task button and add id of the task
    deleteTaskBtn.classList.remove("hidden");
    deleteTaskBtn.dataset.id = taskId;
  }

  // This handler is used to handle view of the modal for editing or adding the task
  #handleTaskCardView(e) {
    // get the target element
    const targetElm = e.target;

    // get the closest parent which has task-card class
    const taskCardContainer = targetElm.closest(".task-card");

    if (taskCardContainer) {
      // found the element which has task-card class

      // open the modal
      this.#handleOpenModal();

      if (taskCardContainer.classList.contains("add-new-task")) {
        // update the UI of the modal for creating a new task
        this.#updateUIForNewTask();
      }

      if (taskCardContainer.classList.contains("view-card")) {
        // get the task id for editing the existing task
        const taskId = taskCardContainer.dataset.id;

        // update the UI of the modal for editing a task
        this.#updateUIForEditTask({ taskId });
      }
    }
  }

  // update the URL of the application
  #populateURL({ query, value, action }) {
    const url = new URL(location.href);

    // delete the previous query param value
    url.searchParams.delete(query);

    if (action === "set") {
      // if action is set then set the new query value
      url.searchParams.set(query, value);
    }

    // update the url
    history.pushState(null, "", url);
  }

  // update displayTasks data based on the category value
  #updateDataBasedOnCategory(categoryName) {
    // get category wise tasks
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
  }

  // update the current active category div style
  #updateActiveCategoryInSidebar() {
    const url = new URL(location.href);
    // get category value from the searchParams
    const category = url.searchParams.get("category");

    let elm;
    switch (category) {
      case "all":
        elm = document.querySelector(".all-tasks");
        break;

      case "new":
        elm = document.querySelector(".new-tasks");
        break;

      case "inProgress":
        elm = document.querySelector(".in-progress-tasks");
        break;

      case "complete":
        elm = document.querySelector(".complete-tasks");
        break;
    }

    // added the active class into the current category div
    elm.classList.add("active");
  }

  // update UI based on the searchParams
  #populateUIBasedOnQueryParams() {
    const { searchInput } = this.#loadSelector();

    const url = new URL(location.href);

    // get current category query params value
    const category = url.searchParams.get("category");

    // get current search query params value
    const search = url.searchParams.get("search");

    if (category) {
      // if category present, update the UI of the category sidebar and task section

      // update style of the current category's div
      this.#updateActiveCategoryInSidebar(category);

      // update UI based on the task category
      this.#updateDataBasedOnCategory(category);

      if (search) {
        // if search query param has value

        // set the search value into the search input
        searchInput.value = search;

        const tasks = data.displayTasks;

        // filtered tasks based on the search value
        const filteredTasks = tasks.filter((task) =>
          lowerCase(task.title).includes(lowerCase(search))
        );

        // update the data state
        data.displayTasks = filteredTasks;
      }
    } else {
      // if url has no category query params then update the url
      window.history.replaceState({}, document.title, "tasks?category=all");
    }

    // display tasks into the UI
    this.#displayTasks();
  }

  // remove the active class from the previous active category div
  #removePreviousActiveCategoryClass() {
    const { sidebarContainer } = this.#loadSelector();

    // get all child of the sidebar
    const allChild = sidebarContainer.children;

    Array.from(allChild).forEach((child) => {
      // if the child has active class then remove it
      if (child.classList.contains("active")) {
        child.classList.remove("active");
      }
    });
  }

  // update UI for changing category
  #populateUIForChangingCategory({ categoryName, classes }) {
    // remove the previous active class
    this.#removePreviousActiveCategoryClass();

    // added active class into the current parent
    classes.add("active");

    // update the URL
    this.#populateURL({
      query: "category",
      value: categoryName,
      action: "set",
    });

    // update the UI based on searchParams
    this.#populateUIBasedOnQueryParams();
  }

  // This handler is used to handle the change of the task category
  #handleChangeTaskCategory(e) {
    // get the parent elm
    const categoryParentElm = e.target.closest(".category");

    if (categoryParentElm) {
      // parent elm is found which has category class
      // get all classes of the parent elm
      const classes = categoryParentElm.classList;

      // check click on all-task div or not
      if (classes.contains("all-tasks") && !classes.contains("active")) {
        // update ui
        this.#populateUIForChangingCategory({ categoryName: "all", classes });
      }

      // check click on new-task div or not
      if (classes.contains("new-tasks") && !classes.contains("active")) {
        // update ui
        this.#populateUIForChangingCategory({ categoryName: "new", classes });
      }

      // check click on in-progress div or not
      if (
        classes.contains("in-progress-tasks") &&
        !classes.contains("active")
      ) {
        // update ui
        this.#populateUIForChangingCategory({
          categoryName: "inProgress",
          classes,
        });
      }

      // check click on complete-task div or not
      if (classes.contains("complete-tasks") && !classes.contains("active")) {
        // update ui
        this.#populateUIForChangingCategory({
          categoryName: "complete",
          classes,
        });
      }
    }
  }

  // this handler is used to find search task
  #handleSearchTask() {
    const { searchInput } = this.#loadSelector();

    // get search input value
    const searchValue = searchInput.value;

    if (searchValue) {
      // search input has some value
      this.#populateURL({
        query: "search",
        value: searchValue,
        action: "set",
      });
    } else {
      // search input is empty
      this.#populateURL({
        query: "search",
        value: searchValue,
        action: "delete",
      });
    }

    // update the UI based on the searchParams
    this.#populateUIBasedOnQueryParams();
  }

  // this handler is used to handle the initial visit of the user
  #handleDisplayInitialTasks() {
    // get previous tasks from the localStorage
    const tasks = storage.getFromStorage();

    // update the Data
    if (tasks && tasks?.length) {
      data.allTasks = tasks;
      data.displayTasks = data.allTasks;
    }

    // update the UI
    this.#populateUIBasedOnQueryParams();
    this.#populateUIOfTaskCount();
    this.#updateActiveCategoryInSidebar();
  }

  // display date into the UI
  #displayDate() {
    const { dateShowELm } = this.#loadSelector();

    setInterval(() => {
      const date = new Date();

      // localDate format: Wed, 11 Nov, 2024
      const localDate = date.toUTCString().slice(0, 16);

      // show into the UI
      dateShowELm.innerText = localDate;
    }, 3600 * 1000);
  }

  // display time into the UI
  #displayTimer() {
    const { timeShowELm } = this.#loadSelector();

    setInterval(() => {
      const date = new Date();

      // get local time
      const localTime = date.toLocaleTimeString();

      // show into the UI
      timeShowELm.innerText = localTime;
    }, 1000);
  }

  // To hide the the deadline input required message
  #handleHideDeadlineErrMsg(e) {
    if (e.target.value) {
      // if the deadline input field has value then hide the required message
      this.#hideInputRequiredMsg(e.target);
    }
  }

  // To detect the change of the input field and hide the required message
  #handleInputChangeAndHideErrMsg(e) {
    const targetElm = e.target;
    const tagName = lowerCase(targetElm.tagName);

    if (tagName === "input" || tagName === "textarea") {
      // if target element is input or textarea
      if (targetElm.value && targetElm.type !== "number") {
        // if targetElm has value and targetElm is not number input then hide the required message
        this.#hideInputRequiredMsg(targetElm);
      }
    }
  }

  // handle progress value input: min value is 0 and maximum value is 100 and negative value is not allowed
  #handleProgressValue(e) {
    const progressInput = e.target;

    // get the progress inputs value
    const value = Number(progressInput.value);

    // handle negative value
    if (value < 0) {
      progressInput.value = 0;
    }

    // handle value which is greater than 100
    if (value > 100) {
      progressInput.value = 100;
    }
  }

  // this is the initialize function
  init() {
    const {
      addTaskBtn,
      modalCloseIcon,
      progressInput,
      modalActionsContainer,
      taskModalBody,
      deadLineInput,
      tasksCardContainer,
      sidebarContainer,
      searchBtn,
    } = this.#loadSelector();

    // display date into the UI
    this.#displayDate();

    // display time into the UI
    this.#displayTimer();

    // handle initial state of the website
    listenEvent(
      document,
      "DOMContentLoaded",
      this.#handleDisplayInitialTasks.bind(this)
    );

    // handle close of the modal
    listenEvent(modalCloseIcon, "click", this.#handleCloseModal.bind(this));

    // handle search functionality
    listenEvent(searchBtn, "click", this.#handleSearchTask.bind(this));

    // handle open modal for adding new task after clicking on the navbar add task button
    listenEvent(
      addTaskBtn,
      "click",
      this.#handleOpenModalForNewTask.bind(this)
    );

    // To handle progress value input: min value is 0 and maximum value is 100 and negative value is not allowed
    listenEvent(progressInput, "keyup", this.#handleProgressValue.bind(this));

    // To hide the deadline input fields required message
    listenEvent(
      deadLineInput,
      "change",
      this.#handleHideDeadlineErrMsg.bind(this)
    );

    // To detect the change of the input field and hide the required message
    listenEvent(
      taskModalBody,
      "keyup",
      this.#handleInputChangeAndHideErrMsg.bind(this)
    );

    // To handle modal action buttons like cancel,create,delete
    listenEvent(
      modalActionsContainer,
      "click",
      this.#handleModalActions.bind(this)
    );

    // To handle view of the modal. For example, for editing existing task or adding a new task
    listenEvent(
      tasksCardContainer,
      "click",
      this.#handleTaskCardView.bind(this)
    );

    // To handle the change of the task category
    listenEvent(
      sidebarContainer,
      "click",
      this.#handleChangeTaskCategory.bind(this)
    );
  }
}

const ui = new UI();

export default ui;
