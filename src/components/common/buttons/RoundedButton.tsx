import { Button, withStyles } from "@material-ui/core";

export const RoundedButton = withStyles({
  root: {
    borderRadius: 15,
    border: "1px solid black",
    width: "100%",
    color: "black",
    backgroundColor: "#ff701f",
    opacity: 0.8,
  },
})(Button);
