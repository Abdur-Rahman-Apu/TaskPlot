const selectElm = (className) => document.querySelector(className);

const insertAdjHTML = (parent, html) => {
  parent.insertAdjacentHTML("afterbegin", html);
};

const addStyle = (elm, newStyle) => Object.assign(elm.style, newStyle);

const listenEvent = (elm, event, handler) =>
  document.addEventListener(elm, event, handler);

const lowerCase = (str) => str.toLowerCase();

export { addStyle, insertAdjHTML, listenEvent, lowerCase, selectElm };
