import { lineType } from "../types/types";
const findX = (firstLine: lineType, y: number) => {
  const k =
    (firstLine.secondPoint.y - firstLine.firstPoint.y) /
    (firstLine.secondPoint.x - firstLine.firstPoint.x);

  const d =
    (firstLine.secondPoint.x * firstLine.firstPoint.y -
      firstLine.firstPoint.x * firstLine.secondPoint.y) /
    (firstLine.secondPoint.x - firstLine.firstPoint.x);

  const x = (y - d) / k;
  console.log({ y, x, d, k });
  return x;
};
export default findX;
