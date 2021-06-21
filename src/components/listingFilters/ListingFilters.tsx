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
import {
  GetTypesUsingGET200Item,
  PropertyFilterDto,
  StyleDTO,
} from "../../api/generated/endpoints.schemas";
import DropdownItem from "react-bootstrap/DropdownItem";
import { Dropdown } from "react-bootstrap";

type ListingFiltersProp = {
  filters: PropertyFilterDto;
  setFilters: (filters: PropertyFilterDto) => void;
  houseStyles: StyleDTO[] | null;
  houseTypes: GetTypesUsingGET200Item[] | null;
};

export function ListingFilters({
  filters,
  setFilters,
  houseStyles,
  houseTypes,
}: ListingFiltersProp) {
  const [anchorSale, setAnchorSale] = useState(null);
  const [anchorPrice, setAnchorPrice] = useState(null);
  const [anchorRooms, setAnchorRooms] = useState(null);
  const [anchorBaths, setAnchorBaths] = useState(null);
  const [anchorSqMts, setAnchorSqMts] = useState(null);
  const [anchorStyles, setAnchorStyles] = useState(null);
  const [anchorTypes, setAnchorTypes] = useState(null);

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

  const openStylePopover = (event: any) => {
    setAnchorStyles(event.currentTarget);
  };

  const openTypesPopover = (event: any) => {
    setAnchorTypes(event.currentTarget);
  };

  const clearFilters = () => {
    setFilters({});
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
          style={filters.condition ? { background: "antiquewhite" } : {}}
        >
          {filters.condition
            ? filters.condition === "SALE"
              ? "En Venta"
              : "En Alquiler"
            : "En Venta"}
        </Button>
        <Button
          className={styles.filtersButton}
          size="small"
          onClick={openPricePopover}
          style={
            filters.minPrice || filters.maxPrice
              ? { background: "antiquewhite" }
              : {}
          }
        >
          Precio
        </Button>
        <Button
          className={styles.filtersButton}
          size="small"
          onClick={openRoomsPopover}
          style={filters.minAmountRoom ? { background: "antiquewhite" } : {}}
        >
          {filters.minAmountRoom
            ? filters.minAmountRoom + "+ Habitaciones"
            : "Habitaciones"}
        </Button>
        <Button
          className={styles.filtersButton}
          size="small"
          onClick={openBathsPopover}
          style={
            filters.minAmountBathroom ? { background: "antiquewhite" } : {}
          }
        >
          {filters.minAmountBathroom
            ? filters.minAmountBathroom + "+ Baños"
            : "Baños"}
        </Button>
        <Button
          className={styles.filtersButton}
          size="small"
          onClick={openSqMtsPopover}
          style={
            filters.minAmountSquareMeter || filters.maxAmountSquareMeter
              ? { background: "antiquewhite" }
              : {}
          }
        >
          Metros Cuadrados
        </Button>
        <Button
          className={styles.filtersButton}
          size="small"
          onClick={openStylePopover}
          style={filters.style ? { background: "antiquewhite" } : {}}
        >
          Estilo
        </Button>

        <Button
          className={styles.filtersButton}
          size="small"
          onClick={openTypesPopover}
          style={filters.typeProperty ? { background: "antiquewhite" } : {}}
        >
          Tipo
        </Button>

        <Button
          className={styles.filtersButton}
          size="small"
          onClick={clearFilters}
        >
          Limpiar Filtros
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
          <ListItem
            onClick={() => setFilters({ ...filters, condition: "SALE" })}
            className={styles.conditionHovering}
          >
            En Venta
          </ListItem>
          <ListItem
            onClick={() => setFilters({ ...filters, condition: "RENT" })}
            className={styles.conditionHovering}
          >
            En Alquiler
          </ListItem>
        </List>
      </Popover>
      <Popover
        open={Boolean(anchorStyles)}
        anchorEl={anchorStyles}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => setAnchorStyles(null)}
      >
        <Dropdown>
          {houseStyles?.map((data) => {
            return (
              <DropdownItem
                onClick={() => setFilters({ ...filters, style: data })}
                style={
                  filters.style === data ? { background: "antiquewhite" } : {}
                }
              >
                {data.label}
              </DropdownItem>
            );
          })}
        </Dropdown>
      </Popover>
      <Popover
        open={Boolean(anchorTypes)}
        anchorEl={anchorTypes}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => setAnchorTypes(null)}
      >
        <Dropdown>
          {houseTypes?.map((data) => {
            return (
              <DropdownItem
                onClick={() => setFilters({ ...filters, typeProperty: data })}
                style={
                  filters.typeProperty === data
                    ? { background: "antiquewhite" }
                    : {}
                }
              >
                {data}
              </DropdownItem>
            );
          })}
        </Dropdown>
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
            value={filters.minPrice}
            size="small"
            onChange={(e) =>
              setFilters({ ...filters, minPrice: parseInt(e.target.value) })
            }
          />

          <TextField
            placeholder="Max"
            className={styles.priceMaxInp}
            variant="outlined"
            value={filters.maxPrice}
            size="small"
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: parseInt(e.target.value) })
            }
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
            style={
              filters.minAmountRoom === 1 ? { background: "antiquewhite" } : {}
            }
            onClick={() => setFilters({ ...filters, minAmountRoom: 1 })}
          >
            1+
          </Button>
          <Button
            style={
              filters.minAmountRoom === 2 ? { background: "antiquewhite" } : {}
            }
            onClick={() => setFilters({ ...filters, minAmountRoom: 2 })}
          >
            2+
          </Button>
          <Button
            style={
              filters.minAmountRoom === 3 ? { background: "antiquewhite" } : {}
            }
            onClick={() => setFilters({ ...filters, minAmountRoom: 3 })}
          >
            3+
          </Button>
          <Button
            style={
              filters.minAmountRoom === 4 ? { background: "antiquewhite" } : {}
            }
            onClick={() => setFilters({ ...filters, minAmountRoom: 4 })}
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
            style={
              filters.minAmountBathroom === 1
                ? { background: "antiquewhite" }
                : {}
            }
            onClick={() => setFilters({ ...filters, minAmountBathroom: 1 })}
          >
            1+
          </Button>
          <Button
            style={
              filters.minAmountBathroom === 2
                ? { background: "antiquewhite" }
                : {}
            }
            onClick={() => setFilters({ ...filters, minAmountBathroom: 2 })}
          >
            2+
          </Button>
          <Button
            style={
              filters.minAmountBathroom === 3
                ? { background: "antiquewhite" }
                : {}
            }
            onClick={() => setFilters({ ...filters, minAmountBathroom: 3 })}
          >
            3+
          </Button>
          <Button
            style={
              filters.minAmountBathroom === 4
                ? { background: "antiquewhite" }
                : {}
            }
            onClick={() => setFilters({ ...filters, minAmountBathroom: 3 })}
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
            value={filters.minAmountSquareMeter}
            size="small"
            onChange={(e) =>
              setFilters({
                ...filters,
                minAmountSquareMeter: parseInt(e.target.value),
              })
            }
          />
          <TextField
            placeholder="Max"
            className={styles.priceMaxInp}
            variant="outlined"
            value={filters.maxAmountSquareMeter}
            size="small"
            onChange={(e) =>
              setFilters({
                ...filters,
                maxAmountSquareMeter: parseInt(e.target.value),
              })
            }
          />
        </Grid>
      </Popover>
      {/*<Popover open={}>Otros</Popover>*/}
    </StylesProvider>
  );
}
