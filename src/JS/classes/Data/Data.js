class Data {
  // private variables
  #allTasks = [];
  #displayTasks;

  // allTasks variable holds all tasks data

  // two type data can be received array or single object
  set allTasks(data) {
    this.#allTasks = Array.isArray(data)
      ? [...this.#allTasks, ...data]
      : [...this.#allTasks, data];
  }

  // get all tasks
  get allTasks() {
    return this.#allTasks;
  }

  // set allTask empty
  set emptyAllTasks(data) {
    this.#allTasks = data;
  }

  // displayTasks variable holds data which need to be displayed into the UI

  set displayTasks(data) {
    this.#displayTasks = data;
  }

  get displayTasks() {
    return this.#displayTasks;
  }
}

const data = new Data();

export default data;
