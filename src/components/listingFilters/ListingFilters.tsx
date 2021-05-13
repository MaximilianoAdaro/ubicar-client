import styles from './ListingFilters.module.scss'
import {Row, Button, DropdownButton, Dropdown, Form, FormControl} from "react-bootstrap";
import React from "react";

export function ListingFilters() {
  return (
            <Row className={styles.OptionsFilters}>
                <Form inline className={styles.searchBar}>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </Form>
                <DropdownButton title="En Venta" variant='dark' className={styles.dropdownButtons}>
                    <Dropdown.Item href="#/action-1">En Venta</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">En Alquiler</Dropdown.Item>
                </DropdownButton>
                <DropdownButton title="Precio" variant='dark' className={styles.dropdownButtons}>
                    <Dropdown.Item href="#/action-1">Orden ascendente</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Orden descendente</Dropdown.Item>
                </DropdownButton>
                <DropdownButton title="Estilo" variant='dark' className={styles.dropdownButtons}>
                    <Dropdown.Item href="#/action-1">Colonial</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Clasico</Dropdown.Item>
                </DropdownButton>
                <DropdownButton title="Numero de habitaciones" variant='dark' className={styles.dropdownButtons}>
                    <Form>
                        <Button variant='light'>1</Button>
                        <Button variant='light'>2</Button>
                        <Button variant='light'>3</Button>
                        <Button variant='light'>4</Button>
                        <Button variant='light'>5+</Button>
                    </Form>
                </DropdownButton>
                <DropdownButton title="Numero de baños" variant='dark' className={styles.dropdownButtons}>
                    <Form>
                        <Button variant='light'>1</Button>
                        <Button variant='light'>2</Button>
                        <Button variant='light'>3</Button>
                        <Button variant='light'>4+</Button>
                    </Form>
                </DropdownButton>
                <DropdownButton title="Metros cuadrados" variant='dark' className={styles.dropdownButtons}>
                    <fieldset>
                        <p>Desde</p>
                        <select>
                            <option>150</option>m²
                            <option>300</option>
                            <option>500</option>
                            <option>750</option>
                        </select>
                        <p>Hasta</p>
                        <select>
                            <option>500</option>
                            <option>750</option>
                            <option>1000</option>
                            <option>1500</option>
                        </select>
                    </fieldset>
                </DropdownButton>
                <DropdownButton title="Jardin" variant='dark' className={styles.dropdownButtons}>
                    <Dropdown.Item href="#/action-1">Si</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">No</Dropdown.Item>
                </DropdownButton>
            </Row>
  );
}
