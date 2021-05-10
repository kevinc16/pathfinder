import { rowCount, colCount } from "./constants";
import "../scss/index.scss";
import drawGrids from "./setMouseState";
import dfs from "./algorithms/dfs";
import { initializeButtons, disableButtons, enableButtons } from "./utils";

function init() {
  drawGrids();

  initializeButtons();
}

window.onload = () => {
  init();
};
