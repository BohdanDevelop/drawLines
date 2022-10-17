import { lineType } from "../types/types";
const findY = (firstLine: lineType, x: number) => {
  const k =
    (firstLine.secondPoint.y - firstLine.firstPoint.y) /
    (firstLine.secondPoint.x - firstLine.firstPoint.x);

  const d =
    (firstLine.secondPoint.x * firstLine.firstPoint.y -
      firstLine.firstPoint.x * firstLine.secondPoint.y) /
    (firstLine.secondPoint.x - firstLine.firstPoint.x);

  const y = k * x + d;
  return y;
};

export default findY;
