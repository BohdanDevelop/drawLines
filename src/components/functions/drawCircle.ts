const drawCircle = (context: any, x: number, y: number) => {
  context.beginPath();
  context.arc(x, y, 3, 0, 2 * Math.PI);
  context.fillStyle = "green";
  context.fill();
  context.strokeStyle = "green";
  context.stroke();
};
export default drawCircle;
