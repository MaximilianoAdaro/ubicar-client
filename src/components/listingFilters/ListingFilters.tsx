import styles from "./ListingFilters.module.scss";
import { useState } from "react";
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
import { MdSearch as SearchIcon } from "react-icons/md";
import { useGetLoggedUsingGET } from "../../api/generated/auth-controller/auth-controller";

export function ListingFilters() {
  const [anchorSale, setAnchorSale] = useState(null);
  const [anchorPrice, setAnchorPrice] = useState(null);
  const [anchorRooms, setAnchorRooms] = useState(null);
  const [anchorBaths, setAnchorBaths] = useState(null);
  const [anchorSqMts, setAnchorSqMts] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minSqMts, setMinSqMts] = useState("");
  const [maxSqMts, setMaxSqMts] = useState("");
  const [baths, setBaths] = useState("");
  const [rooms, setRooms] = useState("");

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

  const { data: user } = useGetLoggedUsingGET();

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
          style={minPrice || maxPrice ? { background: "antiquewhite" } : {}}
        >
          Precio
        </Button>
        <Button
          className={styles.filtersButton}
          size="small"
          onClick={openRoomsPopover}
          style={rooms ? { background: "antiquewhite" } : {}}
        >
          Habitaciones
        </Button>
        <Button
          className={styles.filtersButton}
          size="small"
          onClick={openBathsPopover}
          style={baths ? { background: "antiquewhite" } : {}}
        >
          Baños
        </Button>
        <Button
          className={styles.filtersButton}
          size="small"
          onClick={openSqMtsPopover}
          style={minSqMts || maxSqMts ? { background: "antiquewhite" } : {}}
        >
          Metros Cuadrados
        </Button>
        <div style={{ marginLeft: "auto", marginRight: 0 }}>
          {user && (
            <h5 style={{ color: "dimgrey", margin: 0 }}>{user.userName}</h5>
          )}
        </div>
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
            value={minPrice}
            size="small"
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <TextField
            placeholder="Max"
            className={styles.priceMaxInp}
            variant="outlined"
            value={maxPrice}
            size="small"
            onChange={(e) => setMaxPrice(e.target.value)}
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
        <Grid
          className={styles.roomsBathsButtons}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={rooms === "1" ? { background: "antiquewhite" } : {}}
            onClick={() => setRooms("1")}
          >
            1+
          </Button>
          <Button
            style={rooms === "2" ? { background: "antiquewhite" } : {}}
            onClick={() => setRooms("2")}
          >
            2+
          </Button>
          <Button
            style={rooms === "3" ? { background: "antiquewhite" } : {}}
            onClick={() => setRooms("3")}
          >
            3+
          </Button>
          <Button
            style={rooms === "4" ? { background: "antiquewhite" } : {}}
            onClick={() => setRooms("4")}
          >
            4+
          </Button>
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
        <Grid
          className={styles.roomsBathsButtons}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={baths === "1" ? { background: "antiquewhite" } : {}}
            onClick={() => setBaths("1")}
          >
            1+
          </Button>
          <Button
            style={baths === "2" ? { background: "antiquewhite" } : {}}
            onClick={() => setBaths("2")}
          >
            2+
          </Button>
          <Button
            style={baths === "3" ? { background: "antiquewhite" } : {}}
            onClick={() => setBaths("3")}
          >
            3+
          </Button>
          <Button
            style={baths === "4" ? { background: "antiquewhite" } : {}}
            onClick={() => setBaths("4")}
          >
            4+
          </Button>
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
            value={minSqMts}
            size="small"
            onChange={(e) => setMinSqMts(e.target.value)}
          />
          <TextField
            placeholder="Max"
            className={styles.priceMaxInp}
            variant="outlined"
            value={maxSqMts}
            size="small"
            onChange={(e) => setMaxSqMts(e.target.value)}
          />
        </Grid>
      </Popover>
      {/*<Popover open={}>Otros</Popover>*/}
    </StylesProvider>
  );
}
