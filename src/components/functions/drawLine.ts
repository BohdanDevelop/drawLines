import { lineType } from "../types/types";
const drawLine = (context: any, line: lineType) => {
  context.beginPath();
  context.moveTo(line.firstPoint.x, line.firstPoint.y);
  context.lineTo(line.secondPoint.x, line.secondPoint.y);
  context.strokeStyle = "red";
  context.stroke();
};
export default drawLine;
