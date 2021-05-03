import { useForm } from "react-hook-form";

import styles from "./CreateProperty.module.scss";

interface FormData {
  price: number;
  condition: string;
  address: string;
  squareMeters: string;
  constructionDate: Date;
  style: string;
  ambientsQuantity: number;
  roomsQuantity: number;
  bathroomsQuantity: number;
  expensesPrice: number;
}

export function CreateProperty() {
  const { handleSubmit, register } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <input
        className={styles.textInput}
        type="number"
        id="price"
        placeholder="Precio"
        {...register("price")}
      />

      <label htmlFor="condition">Condicion:</label>
      <select id="conditions" {...register("condition")}>
        <option value="sale">Venta</option>
        <option value="rental">Alquiler</option>
      </select>

      <input
        type="text"
        id="adress"
        placeholder="Direccion"
        {...register("address")}
      />

      <input
        type="number"
        id="squareMeters"
        placeholder="Metros cuadrados"
        {...register("squareMeters")}
      />

      <input
        type="date"
        id="constructionDate"
        placeholder="Fecha de construccion"
        {...register("constructionDate")}
      />

      <input
        type="text"
        id="style"
        placeholder="Estilo"
        {...register("style")}
      />

      <input
        type="number"
        id="ambientsQuantity"
        placeholder="Cantidad de ambientes"
        {...register("ambientsQuantity")}
      />

      <input
        type="number"
        id="roomsQuantity"
        placeholder="Cantidad de habitaciones"
        {...register("roomsQuantity")}
      />

      <input
        type="number"
        id="bathroomsQuantity"
        placeholder="Cantidad de baños"
        {...register("bathroomsQuantity")}
      />

      <input
        type="number"
        id="expensesPrice"
        placeholder="Precio de expensas"
        {...register("expensesPrice")}
      />

      <input type="submit" value="submit" />
    </form>
  );
}
