import React, { useState } from "react";
import MultipleSelectChipsMobile from "../../routes/viewProperty/MultipleSelectChipsMobile";

type MultipleSelectedProps = {
  id: string;
  selected: string[] | undefined;
};

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

  return (
    <div style={{ margin: "15px 0 25px 0" }}>
      <div
        style={{ display: "flex", marginBottom: "1em", alignItems: "center" }}
      >
        <h5 style={{ margin: "0", paddingTop: "5px" }}>
          ¿Qué es lo que más te gusta de esta propiedad?
        </h5>
      </div>
      <MultipleSelectChipsMobile
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
