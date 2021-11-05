import React, { useState } from "react";
import MultipleSelectChips from "../../routes/viewProperty/MultipleSelectChips";
import { Button } from "@material-ui/core";
import { createRequestData } from "../editCreatePropertyForm/Confirmation/confirmationUtils";
import { actions } from "../../store";
import { urls } from "../../constants";
import {
  getGetPropertyUsingGETQueryKey,
  useEditPropertyUsingPUT,
  useSetTagsUsingPUT,
} from "../../api";
import { toast } from "react-toastify";

type MultipleSelectedProps = {
  id: string;
  selected: string[] | undefined;
};

export default function MultipleSelectChip({
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
      <div style={{ display: "flex" }}>
        <h5 style={{ margin: "0", paddingTop: "5px" }}>
          ¿Qué es lo que más te gusta de esta propiedad?
        </h5>
        <Button
          type={"submit"}
          onClick={handleOnClick}
          style={{ marginLeft: "5px" }}
        >
          Guardar
        </Button>
      </div>
      <MultipleSelectChips
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
