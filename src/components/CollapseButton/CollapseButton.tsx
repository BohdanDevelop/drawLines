import { Component } from "react";
import { ButtonProps } from "../types/types";
class CollapseButton extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }
  render() {
    return <button onClick={this.props.onButtonClick}>Collapse </button>;
  }
}
export default CollapseButton;
