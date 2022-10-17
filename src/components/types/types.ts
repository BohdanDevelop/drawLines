export type lineType = {
  firstPoint: ICoordinate;
  secondPoint: ICoordinate;
};
export interface ICoordinate {
  x: number;
  y: number;
}

export type MyProps = {
  clearCanvas: () => any;
  setParentState: (prevState: any) => any;
  parentState: {
    arrayOfLines?: any;
    intersectionsArray?: any;
  };
};
export type ButtonProps = {
  onButtonClick: () => any;
};
export type MyState = {
  clicked: number;
  firstCoordinate?: ICoordinate | null;
  secondCoordinate?: ICoordinate | null;
  arrayOfLines?: any;
  intersectionsArray?: any;
  isRightMouseButtonClicked: boolean;
};

export type CanvaButtonState = {
  arrayOfLines?: any;
  intersectionsArray?: any;
  canvasCurrent?: any | null;
  collapse: {
    time: number;
    isFirstTime: boolean;
  };
};
