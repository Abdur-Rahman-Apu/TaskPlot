class Storage {
  getFromStorage() {
    return JSON.parse(localStorage.getItem("TaskPlot"));
  }

  setIntoStorage(data) {
    localStorage.setItem("TaskPlot", JSON.stringify(data));
  }
}

const storage = new Storage();

export default storage;
