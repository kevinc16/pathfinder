import "../scss/index.scss";
import drawGrids from "./setMouseState";
import { initializeButtons } from "./utils";

function init() {
  drawGrids();

  initializeButtons();
}

window.onload = () => {
  init();
};
