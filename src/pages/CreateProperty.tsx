import React from "react";

function CreateProperty() {
  return (
    <>
      <form>
        <input type="number" name="price" id="price" placeholder="Precio" />

        <label htmlFor="condition">Condicion:</label>

        <select id="conditions">
          <option value="sale">Venta</option>
          <option value="rental">Alquiler</option>
        </select>

        <input type="text" name="address" id="adress" placeholder="Direccion" />

        <input
          type="number"
          name="squareMeters"
          id="squareMeters"
          placeholder="Metros cuadrados"
        />

        <input
          type="text"
          name="constructionDate"
          id="constructionDate"
          placeholder="Fecha de construccion"
        />

        <input type="text" name="style" id="style" placeholder="Estilo" />

        <input
          type="number"
          name="ambientsQuantity"
          id="ambientsQuantity"
          placeholder="Cantidad de ambientes"
        />

        <input
          type="number"
          name="roomsQuantity"
          id="roomsQuantity"
          placeholder="Cantidad de habitaciones"
        />

        <input
          type="number"
          name="bathroomsQuantity"
          id="bathroomsQuantity"
          placeholder="Cantidad de baños"
        />

        <input
          type="number"
          name="expensesPrice"
          id="expensesPrice"
          placeholder="Precio de expensas"
        />
      </form>
    </>
  );
}
