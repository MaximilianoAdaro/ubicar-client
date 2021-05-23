import styles from "./ListingFilters.module.scss";
import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  Popover,
  StylesProvider,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";

export function ListingFilters() {
  const [city, setCity] = useState("Belgrano");
  const [anchorSale, setAnchorSale] = useState(null);
  const [anchorPrice, setAnchorPrice] = useState(null);
  const [anchorRooms, setAnchorRooms] = useState(null);
  const [anchorBaths, setAnchorBaths] = useState(null);
  const [anchorSqMts, setAnchorSqMts] = useState(null);

  const openSalePopover = (event: any) => {
    setAnchorSale(event.currentTarget);
  };
  const openPricePopover = (event: any) => {
    setAnchorPrice(event.currentTarget);
  };
  const openRoomsPopover = (event: any) => {
    setAnchorRooms(event.currentTarget);
  };
  const openBathsPopover = (event: any) => {
    setAnchorBaths(event.currentTarget);
  };
  const openSqMtsPopover = (event: any) => {
    setAnchorSqMts(event.currentTarget);
  };

  return (
    <StylesProvider injectFirst>
      <Grid container className={styles.OptionsFilters}>
        <Grid className={styles.searchBar}>
          <Grid>
            <InputBase value={city} inputProps={{ "aria-label": "search" }} />
            <SearchIcon />
          </Grid>
        </Grid>
        <Button
          className={styles.filtersButton}
          id="buttonForm"
          size="small"
          onClick={openSalePopover}
        >
          En Venta
        </Button>
        {/*<FormControl>*/}
        {/*  <Select className={styles.selectSale}>*/}
        {/*    <MenuItem>En Venta</MenuItem>*/}
        {/*    <MenuItem>En Alquiler</MenuItem>*/}
        {/*  </Select>*/}
        {/*</FormControl>*/}
        <Button
          className={styles.filtersButton}
          size="small"
          onClick={openPricePopover}
        >
          Precio
        </Button>
        <Button
          className={styles.filtersButton}
          size="small"
          onClick={openRoomsPopover}
        >
          Habitaciones
        </Button>
        <Button
          className={styles.filtersButton}
          size="small"
          onClick={openBathsPopover}
        >
          Baños
        </Button>
        <Button
          className={styles.filtersButton}
          size="small"
          onClick={openSqMtsPopover}
        >
          Metros Cuadrados
        </Button>
        <Button className={styles.filtersButton} size="small">
          Otros
        </Button>
      </Grid>
      {/*<Popover open={}>En Venta</Popover>*/}
      <Popover
        open={Boolean(anchorSale)}
        anchorEl={anchorSale}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => setAnchorSale(null)}
      >
        <FormControl>
          <InputLabel id="sale-select">En Venta</InputLabel>
          <Select labelId="sale-select">
            <MenuItem>En Venta</MenuItem>
            <MenuItem>En Alquiler</MenuItem>
          </Select>
        </FormControl>
      </Popover>
      <Popover
        open={Boolean(anchorPrice)}
        anchorEl={anchorPrice}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => setAnchorPrice(null)}
      >
        <Grid container className={styles.price}>
          <label>Desde</label>
          <input />
          <label>Hasta</label>
          <input />
        </Grid>
      </Popover>
      <Popover
        open={Boolean(anchorRooms)}
        anchorEl={anchorRooms}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => setAnchorRooms(null)}
      >
        Rooms
      </Popover>
      <Popover
        open={Boolean(anchorBaths)}
        anchorEl={anchorBaths}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => setAnchorBaths(null)}
      >
        Baños
      </Popover>
      <Popover
        open={Boolean(anchorSqMts)}
        anchorEl={anchorSqMts}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => setAnchorSqMts(null)}
      >
        <Grid className={styles.sqtMtsPopover}>
          From *label* - Hasta *label
        </Grid>
      </Popover>
      {/*<Popover open={}>Otros</Popover>*/}
    </StylesProvider>
  );
}
