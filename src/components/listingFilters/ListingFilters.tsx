import styles from "./ListingFilters.module.scss";
import React from "react";
import { Button, Grid, StylesProvider, TextField } from "@material-ui/core";

export function ListingFilters() {
  return (
    <StylesProvider injectFirst>
      <Grid container className={styles.OptionsFilters}>
        <form>
          <TextField
            variant="outlined"
            size="small"
            className={styles.searchBar}
          />
        </form>
        <Button className={styles.filtersButton} id="buttonForm" size="small">
          En Venta
        </Button>
        <Button className={styles.filtersButton} size="small">
          Precio
        </Button>
        <Button className={styles.filtersButton} size="small">
          Habitaciones
        </Button>
        <Button className={styles.filtersButton} size="small">
          Baños
        </Button>
        <Button className={styles.filtersButton} size="small">
          Metros Cuadrados
        </Button>
        <Button className={styles.filtersButton} size="small">
          Otros
        </Button>
      </Grid>
    </StylesProvider>
    // <Row className={styles.OptionsFilters}>
    //     <Form inline className={styles.searchBar}>
    //         <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    //     </Form>
    //     <DropdownButton title="En Venta" variant='dark' className={styles.dropdownButtons}>
    //         <Dropdown.Item href="" value='SALE'>En Venta</Dropdown.Item>
    //         <Dropdown.Item href="" value='RENT'>En Alquiler</Dropdown.Item>
    //     </DropdownButton>
    //     <DropdownButton title="Precio" variant='dark' className={styles.dropdownButtons}>
    //         <Dropdown.Item href="">Orden ascendente</Dropdown.Item>
    //         <Dropdown.Item href="">Orden descendente</Dropdown.Item>
    //     </DropdownButton>
    //     <DropdownButton title="Estilo" variant='dark' className={styles.dropdownButtons}>
    //         <Dropdown.Item href="#/action-1" value='Colonial'>Colonial</Dropdown.Item>
    //         <Dropdown.Item href="#/action-2" value='Clasico'>Clasico</Dropdown.Item>
    //     </DropdownButton>
    //     <DropdownButton title="Numero de habitaciones" variant='dark' className={styles.dropdownButtons}>
    //         <Form>
    //             <Button variant='light'>1</Button>
    //             <Button variant='light'>2</Button>
    //             <Button variant='light'>3</Button>
    //             <Button variant='light'>4</Button>
    //             <Button variant='light'>5+</Button>
    //         </Form>
    //     </DropdownButton>
    //     <DropdownButton title="Numero de baños" variant='dark' className={styles.dropdownButtons}>
    //         <Form>
    //             <Button variant='light'>1</Button>
    //             <Button variant='light'>2</Button>
    //             <Button variant='light'>3</Button>
    //             <Button variant='light'>4+</Button>
    //         </Form>
    //     </DropdownButton>
    //     <DropdownButton title="Metros cuadrados" variant='dark' className={styles.dropdownButtons}>
    //         <fieldset>
    //             <p>Desde</p>
    //             <select>
    //                 <option>150</option>m²
    //                 <option>300</option>
    //                 <option>500</option>
    //                 <option>750</option>
    //             </select>
    //             <p>Hasta</p>
    //             <select>
    //                 <option>500</option>
    //                 <option>750</option>
    //                 <option>1000</option>
    //                 <option>1500</option>
    //             </select>
    //         </fieldset>
    //     </DropdownButton>
    //     <DropdownButton title="Jardin" variant='dark' className={styles.dropdownButtons}>
    //         <Dropdown.Item href="#/action-1">Si</Dropdown.Item>
    //         <Dropdown.Item href="#/action-2">No</Dropdown.Item>
    //     </DropdownButton>
    // </Row>
  );
}
