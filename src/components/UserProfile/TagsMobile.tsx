import React, { useState } from "react";
import { Button, withStyles } from "@material-ui/core";
import { useSetTagsUsingPUT } from "../../api";
import { toast } from "react-toastify";
import MultipleSelectChipsMobile from "../../routes/viewProperty/MultipleSelectChipsMobile";

type MultipleSelectedProps = {
  id: string;
  selected: string[] | undefined;
};

const StyledButton = withStyles({
  root: {
    color: "white",
    paddingLeft: "0.7em",
    paddingRight: "0.7em",
    textTransform: "none",
    marginLeft: "1em",
    border: "1px #3f51b5 solid ",
    backgroundColor: "#3f51b5",
    "&:hover": {
      background: "rgba(63,81,181,0.75)",
    },
  },
})(Button);

export default function MultipleSelectChipMobile({
  id,
  selected,
}: MultipleSelectedProps) {
  const [value, setValue] = useState(selected!);
  const [error, setError] = useState("");
  const options = [
    "Ubicación",
    "Precio",
    "Comodidades",
    "Metros Cuadrados",
    "Seguridad",
    "Año de construcción",
    "Material de construcción",
  ];

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

  const handleOnClick = async () => {
    try {
      await mutateAsync({
        id,
        data: value,
      });
    } catch (e) {
      throw Error;
    }
  };

  return (
    <div style={{ margin: "15px 0 25px 0" }}>
      <div
        style={{ display: "flex", marginBottom: "1em", alignItems: "center" }}
      >
        <h6 style={{ margin: "0", paddingTop: "5px" }}>
          ¿Qué es lo que más te gusta de esta propiedad?
        </h6>
        <StyledButton size={"small"} type={"submit"} onClick={handleOnClick}>
          Guardar
        </StyledButton>
      </div>
      <MultipleSelectChipsMobile
        label=""
        value={value}
        setValue={setValue}
        options={options}
        error={error}
        setError={setError}
      />
    </div>
  );
}
