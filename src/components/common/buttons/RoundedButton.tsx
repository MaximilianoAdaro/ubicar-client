import { Button, withStyles } from "@material-ui/core";

export const RoundedButton = withStyles({
  root: {
    borderRadius: 30,
    border: "1px solid black",
    width: "100%",
    backgroundColor: "#FFE6B6",
    opacity: 0.7,
  },
})(Button);
