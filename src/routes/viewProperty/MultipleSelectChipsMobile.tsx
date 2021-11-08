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
import { useSetTagsUsingPUT } from "../../api";
import { toast } from "react-toastify";
import { createTheme } from "@mui/material";

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
  root: {
    backgroundColor: "red",
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
  id,
}) => {
  const classes = useStyles();

  const { mutateAsync } = useSetTagsUsingPUT({
    mutation: {
      onSuccess() {
        toast.success(" ✅ Tags guardadas!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      },
      onError() {
        toast.error(" ❌ Error en el guardado de tags!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      },
    },
  });

  const handleClick = async (clickedValue: string | number) => {
    if (setError) {
      setError("");
    }
    if (value.find((e) => e === clickedValue)) {
      const index = value.findIndex((e) => e === clickedValue);
      let arr = [...value];
      arr.splice(index, 1);
      setValue(arr);
      try {
        console.log(arr);
        await mutateAsync({
          // @ts-ignore
          id,
          data: arr,
        });
      } catch (e) {
        throw Error;
      }
    } else {
      setValue([...value, clickedValue]);
      try {
        const data1 = value;
        data1.push(clickedValue);
        await mutateAsync({
          // @ts-ignore
          id,
          data: data1,
        });
      } catch (e) {
        throw Error;
      }
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
  id: PropTypes.string,
};

type InferredProps = InferProps<typeof myTypes>;

MultipleSelectChips.propTypes = myTypes;

export default MultipleSelectChips;
