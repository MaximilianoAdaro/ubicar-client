import React, { useState } from "react";
import MultipleSelectChips from "../../routes/viewProperty/MultipleSelectChips";
import { Button, withStyles } from "@material-ui/core";
import { useSetTagsUsingPUT } from "../../api";
import { toast } from "react-toastify";
import MultipleSelectChipsMobile from "../../routes/viewProperty/MultipleSelectChipsMobile";

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

  return (
    <div style={{ margin: "15px 0 25px 0" }}>
      <div
        style={{ display: "flex", marginBottom: "1em", alignItems: "center" }}
      >
        <h6 style={{ margin: "0", paddingTop: "5px" }}>
          ¿Qué es lo que más te gusta de esta propiedad?
        </h6>
      </div>
      <MultipleSelectChips
        label=""
        value={value}
        setValue={setValue}
        options={options}
        error={error}
        setError={setError}
        id={id}
      />
    </div>
  );
}
