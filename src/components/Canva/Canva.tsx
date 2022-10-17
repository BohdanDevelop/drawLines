import React, { Component, createRef } from "react";
import { ICoordinate, MyProps, MyState } from "../types/types";
import findLineIntersection from "../functions/findIntersection";
import drawLine from "../functions/drawLine";
import drawCircle from "../functions/drawCircle";

class Canva extends Component<MyProps, MyState> {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvasCurrent: HTMLCanvasElement | null;
  context: any;

  constructor(props: MyProps) {
    super(props);
    this.canvasRef = createRef<HTMLCanvasElement>();
    this.canvasCurrent = this.canvasRef.current;
    this.context = this.canvasCurrent?.getContext("2d");
  }
  state: MyState = {
    clicked: 0,
    isRightMouseButtonClicked: false,
  };
  // clearCanvas = () => {
  //   console.log("clearing");
  //   this.context.clearRect(
  //     0,
  //     0,
  //     this.canvasCurrent?.width,
  //     this.canvasCurrent?.height
  //   );
  // };

  onRightMouseClick = (e: MouseEvent) => {
    e.preventDefault();
    document.removeEventListener("mousemove", this.onMouseMove);
    this.props.clearCanvas();
    this.setState({
      clicked: 2,
      isRightMouseButtonClicked: true,
      firstCoordinate: null,
    });
  };
  onMouseMove = (e: MouseEvent) => {
    const rect = this.canvasCurrent?.getBoundingClientRect();
    const left = rect?.left!;
    const top = rect?.top!;

    const firstCoordinate = this.state.firstCoordinate!;
    const currentPosition = {
      x: e.clientX - left,
      y: e.clientY - top,
    };
    const line = {
      firstPoint: {
        x: firstCoordinate.x,
        y: firstCoordinate.y,
      },
      secondPoint: { ...currentPosition },
    };
    this.props.clearCanvas();
    if (this.props.parentState.arrayOfLines.length) {
      this.props.parentState.arrayOfLines.forEach((elem: any) =>
        drawLine(this.context, elem)
      );
    }
    if (this.props.parentState.intersectionsArray.length) {
      this.props.parentState.intersectionsArray.forEach((elem: any) =>
        drawCircle(this.context, elem.x, elem.y)
      );
    }
    drawLine(this.context, line);
    if (this.props.parentState.arrayOfLines.length) {
      this.props.parentState.arrayOfLines.forEach((elem: any) => {
        const intersection = findLineIntersection(elem, line);
        if (intersection)
          drawCircle(this.context, intersection.x, intersection.y);
      });
    }
  };
  componentDidMount() {
    this.canvasCurrent = this.canvasRef.current;
    this.props.setParentState({ canvasCurrent: this.canvasRef.current });
  }
  componentDidUpdate(prevProps: any, prevState: any) {
    this.context = this.canvasCurrent?.getContext("2d");

    if (this.state.clicked === 1) {
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("contextmenu", this.onRightMouseClick);
    }

    if (this.state.clicked === 2 && this.state.isRightMouseButtonClicked) {
      this.setState({ isRightMouseButtonClicked: false, clicked: 0 });
      document.removeEventListener("contextmenu", this.onRightMouseClick);
      if (this.props.parentState.arrayOfLines?.length) {
        this.props.parentState.arrayOfLines.forEach((elem: any) =>
          drawLine(this.context, elem)
        );
      }
      if (this.props.parentState.intersectionsArray.length) {
        this.props.parentState.intersectionsArray.forEach((elem: any) =>
          drawCircle(this.context, elem.x, elem.y)
        );
      }
    }
    if (this.state.clicked === 2 && !this.state.isRightMouseButtonClicked) {
      console.log(this.props.setParentState);
      document.removeEventListener("mousemove", this.onMouseMove);

      const line = {
        firstPoint: this.state.firstCoordinate!,
        secondPoint: this.state.secondCoordinate!,
      };
      console.log("it Worked");
      drawLine(this.context, line);

      this.setState((prevState) => {
        return {
          clicked: 0,
          firstCoordinate: null,
          secondCoordinate: null,
        };
      });
      this.props.setParentState((prevState: any) => ({
        arrayOfLines: prevState.arrayOfLines
          ? [...prevState.arrayOfLines, line]
          : [line],
      }));
      /******************************************************** */
      this.props.setParentState((prevState: any) => {
        const varIntersectionArr: any = [];

        if (prevState.arrayOfLines.length > 1) {
          prevState.arrayOfLines.forEach((element: any, index: any) => {
            prevState.arrayOfLines.forEach(
              (nestedElement: any, nestedIndex: any) => {
                if (index !== nestedIndex) {
                  const intersection = findLineIntersection(
                    element,
                    nestedElement
                  );

                  if (intersection) {
                    console.log(intersection);
                    varIntersectionArr.push(intersection);
                  }
                }
              }
            );
          });
          varIntersectionArr.forEach((element: any) => {
            drawCircle(this.context, element.x, element.y);
          });
        }

        return { intersectionsArray: varIntersectionArr };
      });
    }
  }
  onClickHandle = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = this.canvasCurrent?.getBoundingClientRect();
    const left = rect?.left!;
    const top = rect?.top!;
    const x = e.clientX - left;
    const y = e.clientY - top;

    this.setState((prevState) => {
      return {
        ...prevState,
        clicked: prevState.clicked + 1,
        [prevState.clicked === 0 ? "firstCoordinate" : "secondCoordinate"]: {
          x,
          y,
        },
      };
    });

    // console.log(`X is ${x},Y is ${y}`);
  };
  render() {
    return (
      <>
        <canvas
          style={{
            border: "2px solid black",
          }}
          onClick={this.onClickHandle}
          width="1000"
          height="500"
          ref={this.canvasRef}
        />
      </>
    );
  }
}

export default Canva;
