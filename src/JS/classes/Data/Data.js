class Data {
  #allTasks;
  #displayTasks;

  set allTasks(data) {
    this.#allTasks = data;
  }
  get allTasks() {
    return this.#allTasks;
  }
  set displayTasks(data) {
    this.#displayTasks = data;
  }
  get displayTasks() {
    return this.#displayTasks;
  }
}

const data = new Data();

export default data;