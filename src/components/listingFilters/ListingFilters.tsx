import styles from "./ListingFilters.module.scss";
import React, { useState } from "react";
import {
  Button,
  Grid,
  InputBase,
  List,
  ListItem,
  Popover,
  StylesProvider,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export function ListingFilters() {
  // const [city, setCity] = useState();
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
            <InputBase
              placeholder="Buscar"
              inputProps={{ "aria-label": "search" }}
            />
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
        {/*<Button className={styles.filtersButton} size="small">*/}
        {/*  Otros*/}
        {/*</Button>*/}
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
        <List>
          <ListItem>En Venta</ListItem>
          <ListItem>En Alquiler</ListItem>
        </List>
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
        <Grid className={styles.popoversTitles}>Precio</Grid>
        <Grid container className={styles.price}>
          <TextField
            placeholder="Min"
            className={styles.priceMinInp}
            variant="outlined"
            size="small"
          />

          <TextField
            placeholder="Max"
            className={styles.priceMaxInp}
            variant="outlined"
            size="small"
          />
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
        <Grid className={styles.popoversTitles}>Habitaciones</Grid>
        <Grid className={styles.roomsBathsButtons}>
          <Button>1+</Button>
          <Button>2+</Button>
          <Button>3+</Button>
          <Button>4+</Button>
        </Grid>
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
        <Grid className={styles.popoversTitles}>Baños</Grid>
        <Grid className={styles.roomsBathsButtons}>
          <Button>1+</Button>
          <Button>2+</Button>
          <Button>3+</Button>
          <Button>4+</Button>
        </Grid>
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
        <Grid className={styles.popoversTitles}>Metros Cuadrados</Grid>
        <Grid container className={styles.price}>
          <TextField
            placeholder="Min"
            className={styles.priceMinInp}
            variant="outlined"
            size="small"
          />
          <TextField
            placeholder="Max"
            className={styles.priceMaxInp}
            variant="outlined"
            size="small"
          />
        </Grid>
      </Popover>
      {/*<Popover open={}>Otros</Popover>*/}
    </StylesProvider>
  );
}
