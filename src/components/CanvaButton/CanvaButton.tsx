import { Component } from "react";
import Canva from "../Canva";
import CollapseButton from "../CollapseButton";
import drawLine from "../functions/drawLine";
import drawCircle from "../functions/drawCircle";
import isCollapsed from "../functions/isCollapsed";
import findY from "../functions/findY";
import approximateNumberEquals from "../functions/approximateNumberEqual";
import { CanvaButtonState } from "../types/types";
import findX from "../functions/findX";
const initialState = {
  arrayOfLines: [],
  intersectionsArray: [],
  collapse: {
    time: 0,
    isFirstTime: true,
  },
};

class CanvaButton extends Component {
  state: any = {
    arrayOfLines: [],
    intersectionsArray: [],
    collapse: {
      time: 0,
      isFirstTime: true,
    },
    canvasCurrent: null,
  };
  clearCanvas = () => {
    console.log("clearing");
    this.state.canvasCurrent
      ?.getContext("2d")
      .clearRect(
        0,
        0,
        this.state.canvasCurrent?.width,
        this.state.canvasCurrent?.height
      );
  };
  collapse = () => {
    // this.clearCanvas();
    if (this.state.collapse.isFirstTime) {
      this.setState({
        collapse: {
          time: new Date().getTime() as number,
          isFirstTime: true,
        },
      });
    }
    this.clearCanvas();
    const currentTime = new Date().getTime();

    const lessLinesArray = this.state.arrayOfLines.map((elem: any) => {
      //   const xCollapsed = isCollapsed(elem.firstPoint.x, elem.secondPoint.x);
      //   const yCollapsed = isCollapsed(elem.firstPoint.y, elem.secondPoint.y);
      let x1, x2, y1, y2;
      const xModule = Math.abs(elem.firstPoint.x - elem.secondPoint.x);
      const yModule = Math.abs(elem.firstPoint.y - elem.secondPoint.y);
      if (yModule > xModule) {
        console.log("module y is bigger than x");
        // x1 = elem.firstPoint.x;
        // x2 = elem.secondPoint.x;
        if (elem.firstPoint.y < elem.secondPoint.y) {
          y1 = elem.firstPoint.y + 1;
          y2 = elem.secondPoint.y - 1;
          x1 = findX(elem, y1);
          x2 = findX(elem, y2);
        }
        if (elem.firstPoint.y > elem.secondPoint.y) {
          y1 = elem.firstPoint.y - 1;
          y2 = elem.secondPoint.y + 1;
          x1 = findX(elem, y1);
          x2 = findX(elem, y2);
        }
        // console.log(y1, y2, x1, x2);
      }
      if (yModule < xModule) {
        console.log("module x is bigger than y");
        if (elem.firstPoint.x < elem.secondPoint.x) {
          x1 = elem.firstPoint.x + 1;
          x2 = elem.secondPoint.x - 1;
          y1 = findY(elem, x1);
          y2 = findY(elem, x2);
        }
        if (elem.firstPoint.x > elem.secondPoint.x) {
          x1 = elem.firstPoint.x - 1;
          x2 = elem.secondPoint.x + 1;
          y1 = findY(elem, x1);
          y2 = findY(elem, x2);
        }
      }

      //   if (approximateNumberEquals(elem.firstPoint.x, elem.secondPoint.x)) {
      //     x1 = elem.firstPoint.x;
      //     x2 = elem.secondPoint.x;
      //     if (elem.firstPoint.y < elem.secondPoint.y) {
      //       y1 = elem.firstPoint.y + 1;
      //       y2 = elem.secondPoint.y - 1;
      //     }
      //     if (elem.firstPoint.y > elem.secondPoint.y) {
      //       y1 = elem.firstPoint.y - 1;
      //       y2 = elem.secondPoint.y + 1;
      //     }
      //   }
      return {
        firstPoint: {
          x: x1,
          y: y1,
        },
        secondPoint: {
          x: x2,
          y: y2,
        },
      };
    });
    //   console.log("Repeating");
    this.setState({ arrayOfLines: lessLinesArray });
    this.state.arrayOfLines.forEach((elem: any) =>
      drawLine(this.state.canvasCurrent.getContext("2d"), elem)
    );
    //   console.log("Collapse time ", this.state.collapse.time);
    //   console.log(currentTime - this.state.collapse.time);
    if ((currentTime - this.state.collapse.time) / 1000 <= 3) {
      requestAnimationFrame(this.collapse);
    }
    if (
      (currentTime - this.state.collapse.time) / 1000 > 3 &&
      !this.state.collapse.isFirstTime
    ) {
      console.log("bigger than three worked");
      this.clearCanvas();
      this.setState(initialState);
    }
    if (this.state.collapse.isFirstTime) {
      this.setState((prevState: any) => ({
        collapse: { isFirstTime: false, time: prevState.collapse.time },
      }));
      requestAnimationFrame(this.collapse);
    }
  };

  render() {
    return (
      <>
        <Canva
          parentState={this.state}
          setParentState={this.setState.bind(this)}
          clearCanvas={this.clearCanvas.bind(this)}
        />
        <CollapseButton onButtonClick={this.collapse.bind(this)} />
      </>
    );
  }
}

export default CanvaButton;
