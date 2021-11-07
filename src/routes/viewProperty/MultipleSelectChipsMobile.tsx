import React from "react";
import PropTypes, { InferProps } from "prop-types";

import {
  makeStyles,
  FormLabel,
  Chip,
  Typography,
  FormHelperText,
  Tooltip,
} from "@material-ui/core";

import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "left",
    marginTop: ".5em",
  },
  chipsDiv: {
    marginTop: ".3rem 0 1 0",
    overflowX: "scroll",
    display: "flex",

    "&::-webkit-scrollbar": {
      display: "none",
    },

    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
  },

  chip: {
    marginRight: "10px",
    marginBottom: "0.1em",
  },
  formHelperText: {
    textAlign: "left",
  },
  helperTextIcon: {
    display: "inline",
    verticalAlign: "middle",
  },
  formLabel: {
    display: "flex",
    alignItems: "left",
    justifyContent: "left",
  },
}));

const MultipleSelectChips: React.FC<InferredProps> = ({
  value,
  setValue,
  options,
  label,
  error,
  setError,
  icon,
  helperText,
  disabled,
}) => {
  const classes = useStyles();

  const handleClick = (clickedValue: string | number) => {
    if (setError) {
      setError("");
    }
    if (value.find((e) => e === clickedValue)) {
      const index = value.findIndex((e) => e === clickedValue);
      let arr = [...value];
      arr.splice(index, 1);
      setValue(arr);
    } else {
      setValue([...value, clickedValue]);
    }
  };

  return (
    <>
      <div className={classes.container}>
        {label && (
          <FormLabel error={Boolean(error)} className={classes.formLabel}>
            {helperText && (
              <Tooltip title={helperText}>
                <InfoIcon className={classes.helperTextIcon} fontSize="small" />
              </Tooltip>
            )}
            <Typography variant="body1" display="inline">
              {`${label}${value.length ? ":" : ""} ${options
                .filter((option) => value.indexOf(option) !== -1)
                .map((option) => option)
                .join(", ")}`}
            </Typography>
          </FormLabel>
        )}
        {Boolean(error) && (
          <FormHelperText
            className={classes.formHelperText}
            error={Boolean(error)}
          >
            {error}
          </FormHelperText>
        )}
        <div className={classes.chipsDiv}>
          {options && options.length
            ? options.map((option, i) => (
                <Chip
                  className={classes.chip}
                  key={i}
                  color="primary"
                  variant={
                    value.find((e) => e === option) ? "default" : "outlined"
                  }
                  label={<Typography variant="body2">{`${option}`}</Typography>}
                  clickable={!Boolean(disabled)}
                  onClick={disabled ? undefined : () => handleClick(option)}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

const myTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  error: PropTypes.string,
  setError: PropTypes.func,
  icon: PropTypes.element,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
};

type InferredProps = InferProps<typeof myTypes>;

MultipleSelectChips.propTypes = myTypes;

export default MultipleSelectChips;
