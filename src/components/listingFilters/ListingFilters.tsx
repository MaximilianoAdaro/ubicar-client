import styles from "./ListingFilters.module.scss";
import React, { useMemo, useCallback, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Popover,
  TextField,
  withStyles,
} from "@material-ui/core";
import DropdownItem from "react-bootstrap/DropdownItem";
import { Dropdown } from "react-bootstrap";
import { StyleDTO, GetTypesUsingGET200Item } from "../../api";
import { useHistory, useLocation } from "react-router-dom";
import QueryString from "query-string";
import { actions, useAppDispatch, useAppSelector } from "../../store";
import { selectOption } from "../../store/slices/session";
import { convertCoordinates } from "../Map/utils";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MapView } from "../../store/slices/map/mapSlice";

const parseIntOrUndefined = (n: string) => (n !== "" ? parseInt(n) : undefined);

type ListingFiltersProp = {
  houseStyles: StyleDTO[] | null;
  houseTypes: GetTypesUsingGET200Item[] | null;
  setZoom: (arg0: number) => void;
  setView: (arg0: MapView) => void;
};

const StyledButton = withStyles({
  root: {
    background: "white",
    paddingLeft: "0.7em",
    paddingRight: "0.7em",
    textTransform: "none",
    marginLeft: "1.5rem",
    border: "1px #4a636c solid",
    "&:hover": {
      background: "#f2f2f2",
    },
  },
})(Button);

export function ListingFilters({
  houseStyles,
  houseTypes,
  setZoom,
  setView,
}: ListingFiltersProp) {
  const [anchorSale, setAnchorSale] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorPrice, setAnchorPrice] =
    React.useState<HTMLButtonElement | null>(null);
  const [anchorRooms, setAnchorRooms] =
    React.useState<HTMLButtonElement | null>(null);
  const [anchorBaths, setAnchorBaths] =
    React.useState<HTMLButtonElement | null>(null);
  const [anchorSqMts, setAnchorSqMts] =
    React.useState<HTMLButtonElement | null>(null);
  const [anchorStyles, setAnchorStyles] =
    React.useState<HTMLButtonElement | null>(null);
  const [anchorTypes, setAnchorTypes] =
    React.useState<HTMLButtonElement | null>(null);

  const openSalePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorSale(event.currentTarget);
  };

  const openPricePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorPrice(event.currentTarget);
  };

  const openRoomsPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorRooms(event.currentTarget);
  };

  const openBathsPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorBaths(event.currentTarget);
  };

  const openSqMtsPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorSqMts(event.currentTarget);
  };

  const openStylePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorStyles(event.currentTarget);
  };

  const openTypesPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorTypes(event.currentTarget);
  };

  const location = useLocation();
  const history = useHistory();
  const search = useAppSelector(selectOption);
  const dispatch = useAppDispatch();

  const clearFilters = useCallback(() => {
    history.push({
      pathname: location.pathname,
      search: QueryString.stringify({}),
    });
  }, [history, location.pathname]);

  const pushQueryParams = useCallback(
    (params: Record<string, string | number | undefined>) => {
      const query = { ...QueryString.parse(location.search), ...params };
      history.push({
        pathname: location.pathname,
        search: QueryString.stringify(query),
      });
    },
    [history, location.pathname, location.search]
  );

  const query = useMemo(
    () => QueryString.parse(location.search) as any,
    [location.search]
  );

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([
    { id: "", name: "", stateName: "", centroid: { lat: 0, long: 0 } },
  ]);
  const loading = open && options.length === 0;

  const onChangeHandle = async (value: any) => {
    const response = await fetch(
      "http://localhost:3000/public/cities-and-states?name=" + value
    );

    const citiesAndStates = await response.json();
    if (citiesAndStates && citiesAndStates.content) {
      const options = citiesAndStates.content.map((option: any) => {
        if (option.type === "STATE") {
          return option.state;
        } else {
          return option.city;
        }
      });
      setOptions(options);
    }
  };

  const handleChangeView = (longitude: number, latitude: number) => {
    setView({ longitude: longitude, latitude: latitude });
    setZoom(12);
  };
  const handleChangeName = (name: string) => {
    dispatch(actions.session.setSearchBar(name));
  };

  const handleOptionLabel = (option: any) => {
    if (option.id !== "") {
      if (option.stateName)
        return (
          option.name[0].toUpperCase() +
          option.name.substr(1).toLowerCase() +
          ", " +
          option.stateName
        );
      return option.name[0].toUpperCase() + option.name.substr(1).toLowerCase();
    }
    return "";
  };

  return (
    <div>
      <Grid container className={styles.OptionsFilters}>
        <Grid className={styles.searchBar}>
          <Grid>
            <Autocomplete
              id="asyncState"
              style={{ width: "500px" }}
              open={open}
              defaultValue={search}
              onChange={(e, value) => {
                if (value) {
                  let coords = convertCoordinates(
                    value.centroid.long,
                    value.centroid.lat
                  );
                  handleChangeName(handleOptionLabel(value));
                  handleChangeView(coords[0], coords[1]);
                }
              }}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              getOptionSelected={(option, value) => option.id === value.id}
              getOptionLabel={(option) => handleOptionLabel(option)}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  color={"secondary"}
                  onChange={(ev) => {
                    // dont fire API if the user delete or not entered anything
                    if (ev.target.value !== "" || ev.target.value !== null) {
                      onChangeHandle(ev.target.value);
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
        <StyledButton
          id="buttonForm"
          size="small"
          onClick={openSalePopover}
          style={query.condition ? { background: "antiquewhite" } : {}}
        >
          {query.condition
            ? query.condition === "SALE"
              ? "En Venta"
              : "En Alquiler"
            : "En Venta"}
        </StyledButton>
        <StyledButton
          size="small"
          onClick={openPricePopover}
          style={
            query.minPrice || query.maxPrice
              ? { background: "antiquewhite" }
              : {}
          }
        >
          Precio
        </StyledButton>
        <StyledButton
          size="small"
          onClick={openRoomsPopover}
          style={query.minAmountRoom ? { background: "antiquewhite" } : {}}
        >
          {query.minAmountRoom
            ? query.minAmountRoom + "+ Habitaciones"
            : "Habitaciones"}
        </StyledButton>
        <StyledButton
          size="small"
          onClick={openBathsPopover}
          style={query.minAmountBathroom ? { background: "antiquewhite" } : {}}
        >
          {query.minAmountBathroom
            ? query.minAmountBathroom + "+ Baños"
            : "Baños"}
        </StyledButton>
        <StyledButton
          size="small"
          onClick={openSqMtsPopover}
          style={
            query.minAmountSquareMeter || query.maxAmountSquareMeter
              ? { background: "antiquewhite" }
              : {}
          }
        >
          Metros Cuadrados
        </StyledButton>
        <StyledButton
          size="small"
          onClick={openStylePopover}
          style={query.style ? { background: "antiquewhite" } : {}}
        >
          Estilo
        </StyledButton>

        <StyledButton
          size="small"
          onClick={openTypesPopover}
          style={query.typeProperty ? { background: "antiquewhite" } : {}}
        >
          Tipo
        </StyledButton>

        <StyledButton size="small" onClick={clearFilters}>
          Limpiar Filtros
        </StyledButton>
      </Grid>
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
            onClick={() =>
              query.condition === "SALE"
                ? pushQueryParams({ condition: undefined })
                : pushQueryParams({ condition: "SALE" })
            }
            className={styles.conditionHover}
          >
            En Venta
          </ListItem>
          <ListItem
            onClick={() =>
              query.condition === "RENT"
                ? pushQueryParams({ condition: undefined })
                : pushQueryParams({ condition: "RENT" })
            }
            className={styles.conditionHover}
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
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={() => setAnchorStyles(null)}
      >
        <Dropdown>
          {houseStyles?.map((data) => {
            return (
              <DropdownItem
                key={data.id}
                onClick={() =>
                  query.style === data.id
                    ? pushQueryParams({ style: undefined })
                    : pushQueryParams({ style: data.id })
                }
                style={
                  query.style === data.id ? { background: "antiquewhite" } : {}
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
                key={data}
                onClick={() =>
                  query.typeProperty === data
                    ? pushQueryParams({ typeProperty: undefined })
                    : pushQueryParams({ typeProperty: data })
                }
                style={
                  query.typeProperty === data
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
            type="number"
            value={query.minPrice}
            size="small"
            onChange={(e) =>
              pushQueryParams({ minPrice: parseIntOrUndefined(e.target.value) })
            }
          />

          <TextField
            placeholder="Max"
            className={styles.priceMaxInp}
            variant="outlined"
            type="number"
            value={query.maxPrice}
            size="small"
            onChange={(e) =>
              pushQueryParams({ maxPrice: parseIntOrUndefined(e.target.value) })
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
              Number(query.minAmountRoom) === 1
                ? { background: "antiquewhite" }
                : {}
            }
            onClick={() =>
              Number(query.minAmountRoom) === 1
                ? pushQueryParams({ minAmountRoom: undefined })
                : pushQueryParams({ minAmountRoom: 1 })
            }
          >
            1+
          </Button>
          <Button
            style={
              Number(query.minAmountRoom) === 2
                ? { background: "antiquewhite" }
                : {}
            }
            onClick={() =>
              Number(query.minAmountRoom) === 2
                ? pushQueryParams({ minAmountRoom: undefined })
                : pushQueryParams({ minAmountRoom: 2 })
            }
          >
            2+
          </Button>
          <Button
            style={
              Number(query.minAmountRoom) === 3
                ? { background: "antiquewhite" }
                : {}
            }
            onClick={() =>
              Number(query.minAmountRoom) === 3
                ? pushQueryParams({ minAmountRoom: undefined })
                : pushQueryParams({ minAmountRoom: 3 })
            }
          >
            3+
          </Button>
          <Button
            style={
              Number(query.minAmountRoom) === 4
                ? { background: "antiquewhite" }
                : {}
            }
            onClick={() =>
              Number(query.minAmountRoom) === 4
                ? pushQueryParams({ minAmountRoom: undefined })
                : pushQueryParams({ minAmountRoom: 4 })
            }
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
              Number(query.minAmountBathroom) === 1
                ? { background: "antiquewhite" }
                : {}
            }
            onClick={() =>
              Number(query.minAmountBathroom) === 1
                ? pushQueryParams({ minAmountBathroom: undefined })
                : pushQueryParams({ minAmountBathroom: 1 })
            }
          >
            1+
          </Button>
          <Button
            style={
              Number(query.minAmountBathroom) === 2
                ? { background: "antiquewhite" }
                : {}
            }
            onClick={() =>
              Number(query.minAmountBathroom) === 2
                ? pushQueryParams({ minAmountBathroom: undefined })
                : pushQueryParams({ minAmountBathroom: 2 })
            }
          >
            2+
          </Button>
          <Button
            style={
              Number(query.minAmountBathroom) === 3
                ? { background: "antiquewhite" }
                : {}
            }
            onClick={() =>
              Number(query.minAmountBathroom) === 3
                ? pushQueryParams({ minAmountBathroom: undefined })
                : pushQueryParams({ minAmountBathroom: 3 })
            }
          >
            3+
          </Button>
          <Button
            style={
              Number(query.minAmountBathroom) === 4
                ? { background: "antiquewhite" }
                : {}
            }
            onClick={() =>
              Number(query.minAmountBathroom) === 4
                ? pushQueryParams({ minAmountBathroom: undefined })
                : pushQueryParams({ minAmountBathroom: 4 })
            }
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
            type="number"
            value={query.minAmountSquareMeter}
            size="small"
            onChange={(e) => {
              return pushQueryParams({
                minAmountSquareMeter: parseIntOrUndefined(e.target.value),
              });
            }}
          />
          <TextField
            placeholder="Max"
            className={styles.priceMaxInp}
            variant="outlined"
            type="number"
            value={query.maxAmountSquareMeter}
            size="small"
            onChange={(e) =>
              pushQueryParams({
                maxAmountSquareMeter: parseIntOrUndefined(e.target.value),
              })
            }
          />
        </Grid>
      </Popover>
      {/*<Popover open={}>Otros</Popover>*/}
    </div>
  );
}
