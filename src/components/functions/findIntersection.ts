import { lineType } from "../types/types";

function between(firstPar: number, secPar: number, num: number) {
  if (firstPar > secPar) return num >= secPar && num <= firstPar;
  if (secPar > firstPar) return num >= firstPar && num <= secPar;
}

function findLineIntersection(firstLine: lineType, secondLine: lineType) {
  // d2 = ( x22 * y21-x21 * y22) / (x22-x21).
  const k1 =
    (firstLine.secondPoint.y - firstLine.firstPoint.y) /
    (firstLine.secondPoint.x - firstLine.firstPoint.x);
  const k2 =
    (secondLine.secondPoint.y - secondLine.firstPoint.y) /
    (secondLine.secondPoint.x - secondLine.firstPoint.x);
  const d1 =
    (firstLine.secondPoint.x * firstLine.firstPoint.y -
      firstLine.firstPoint.x * firstLine.secondPoint.y) /
    (firstLine.secondPoint.x - firstLine.firstPoint.x);
  const d2 =
    (secondLine.secondPoint.x * secondLine.firstPoint.y -
      secondLine.firstPoint.x * secondLine.secondPoint.y) /
    (secondLine.secondPoint.x - secondLine.firstPoint.x);
  console.log(`k1 is ${k1}, k2 is ${k2}, d1 is ${d1}, d2 is ${d2}`);
  const x = (d2 - d1) / (k1 - k2);
  const y = (k1 * (d2 - d1)) / (k1 - k2) + d1;
  const xInRange =
    between(firstLine.firstPoint.x, firstLine.secondPoint.x, x) &&
    between(secondLine.firstPoint.x, secondLine.secondPoint.x, x);

  const yInRange =
    between(firstLine.firstPoint.y, firstLine.secondPoint.y, y) &&
    between(secondLine.firstPoint.y, secondLine.secondPoint.y, y);
  if (xInRange && yInRange) {
    return { x, y };
  }
}
export default findLineIntersection;
// findLineIntersection(O1, O2);
