class Storage {
  // get data from the localStorage
  getFromStorage() {
    return JSON.parse(localStorage.getItem("TaskPlot"));
  }

  // set data into the localStorage
  setIntoStorage(data) {
    localStorage.setItem("TaskPlot", JSON.stringify(data));
  }
}

const storage = new Storage();

export default storage;
