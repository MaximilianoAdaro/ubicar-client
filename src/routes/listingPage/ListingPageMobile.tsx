import { useEffect, useMemo, useState } from "react";
import { Switch, useHistory, useLocation } from "react-router";
import {
  PropertyPreviewDTO,
  useGetStylesUsingGET,
  useGetTypesUsingGET,
} from "../../api";
import styles from "./ListingPageMobile.module.scss";
import { ReactComponent as OneGridIcon } from "../../assets/listingPageGridOne.svg";
import { ReactComponent as OneGridIconSelected } from "../../assets/listingPageGridOneSelected.svg";
import { ReactComponent as TwoGridIcon } from "../../assets/listingPageGridTwo.svg";
import { ReactComponent as TwoGridIconSelected } from "../../assets/listingPageGridTwoSelected.svg";
import clsx from "clsx";
import { HouseCardMobile } from "../../components/newListingHouse";
import { actions, useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import QueryString from "query-string";
import { selectView, selectZoom } from "../../store/slices/map/mapSlice";
import { MapComponent } from "../../components/Map/map";
import { CircularProgress, TextField } from "@material-ui/core";
import { convertCoordinates } from "../../components/Map/utils";
import { Autocomplete } from "@material-ui/lab";
import { selectOption } from "../../store/slices/session";
import { ListingFiltersMobile } from "../../components/listingFilters";

const checkNotUndefined = (value: any) => {
  return value ? value : null;
};

export const ListingPageMobile = () => {
  const [isMapView, setIsMapView] = useState(true);
  const [isTwoColumns, setIsTwoColums] = useState(false);
  const [isLargeCards, setIsLargeCards] = useState(true);

  const { data: houseStyles } = useGetStylesUsingGET();
  const { data: houseTypes } = useGetTypesUsingGET();

  const location = useLocation();

  const [zoom, setZoom] = useState(useAppSelector(selectZoom));
  const [view, setView] = useState(useAppSelector(selectView));
  const [bbox, setBbox] = useState([0]);
  const [load, setLoad] = useState(true);
  const [rightSideData, setRightSideData] = useState<PropertyPreviewDTO[]>([]);

  const dispatch = useDispatch();

  const query = useMemo(
    () => QueryString.parse(location.search) as any,
    [location.search]
  );

  const body = JSON.stringify({
    condition: checkNotUndefined(query.condition),
    typeProperty: checkNotUndefined(query.typeProperty),
    minPrice: parseFloat(checkNotUndefined(query.minPrice)),
    maxPrice: parseFloat(checkNotUndefined(query.maxPrice)),
    style: checkNotUndefined(query.style),
    minAmountBathroom: checkNotUndefined(query.minAmountBathroom),
    minAmountRoom: checkNotUndefined(query.minAmountRoom),
    minAmountSquareMeter: checkNotUndefined(query.minAmountSquareMeter),
    maxAmountSquareMeter: checkNotUndefined(query.maxAmountSquareMeter),
  });

  const buildDataset = async () => {
    setLoad(true);

    const mapData = await fetch(
      "http://localhost:3000/public/property/preview/by-filter?b1=" +
        bbox[0] +
        "&b2=" +
        bbox[1] +
        "&b3=" +
        bbox[2] +
        "&b4=" +
        bbox[3],
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      }
    );

    const response2 = await mapData.json();
    if (response2) {
      if (response2.content?.length > 0) {
        setRightSideData(response2.content);
      } else {
        setRightSideData([]);
      }
      setLoad(false);
    }
  };

  const setter1 = (number: number) => {
    setZoom(number);
    dispatch(actions.map.setZoom(zoom));
  };

  const setter2 = (arg0: { longitude: number; latitude: number }) => {
    setView({ longitude: arg0.longitude, latitude: arg0.latitude });
    dispatch(
      actions.map.setView({
        longitude: arg0.longitude,
        latitude: arg0.latitude,
      })
    );
  };

  useEffect(() => {
    buildDataset();
  }, [bbox, query]);

  const history = useHistory();

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
    setter2({ longitude, latitude });
    setter1(12);
    // dispatch(actions.map.setView({ longitude: longitude, latitude: latitude }));
    // dispatch(actions.map.setZoom(12));
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

  const handleOption = (value: any) => {
    dispatch(actions.session.setOption(value));
    history.push("/listing-page");
  };

  const search = useAppSelector(selectOption);

  return (
    <div className={styles.container}>
      {isMapView && (
        <>
          <div className={styles.searchContainer}>
            <Autocomplete
              id="asyncState"
              size={"small"}
              style={{}}
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
              getOptionSelected={(option: any, value: any) =>
                option.id === value.id
              }
              getOptionLabel={(option: any) => handleOptionLabel(option)}
              options={options}
              loading={loading}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  color={"secondary"}
                  onChange={(ev: any) => {
                    // dont fire API if the user delete or not entered anything
                    if (ev.target.value !== "" || ev.target.value !== null) {
                      onChangeHandle(ev.target.value);
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </div>
          <div className={styles.filtersContainer}>
            <ListingFiltersMobile
              houseStyles={houseStyles ? houseStyles : null}
              houseTypes={houseTypes ? houseTypes : null}
              setZoom={setter1}
              setView={setter2}
            />
          </div>
        </>
      )}
      <div className={styles.map}>
        <MapComponent
          zoom={zoom}
          view={view}
          renderLayers={false}
          editable={false}
          setZoom={setter1}
          setView={setter2}
          setBbox={setBbox}
          body={body}
          showControls={false}
        />
      </div>
      <div
        className={clsx(styles.listContainer, {
          [styles.listUp]: !isMapView,
        })}
      >
        <div
          className={styles.changeViewButton}
          onClick={() => setIsMapView((b) => !b)}
        >
          <div />
        </div>
        <div className={styles.titleAndButtonsContainer}>
          <span className={styles.title}>Propiedades</span>
          <div className={styles.gridIcons}>
            {isLargeCards ? (
              <OneGridIconSelected />
            ) : (
              <OneGridIcon
                className={styles.gridButton}
                onClick={() => setIsLargeCards(true)}
              />
            )}

            {isLargeCards ? (
              <TwoGridIcon
                className={styles.gridButton}
                onClick={() => setIsLargeCards(false)}
              />
            ) : (
              <TwoGridIconSelected />
            )}
          </div>
        </div>
        <div className={styles.propertyList}>
          <Switch>
            {rightSideData.length > 0 ? (
              <div className={styles.buttonsAndProps}>
                <PropertyList
                  properties={rightSideData}
                  expanded={isTwoColumns}
                  isLargeCards={isLargeCards}
                />
              </div>
            ) : (
              <h2>No hay publicaciones disponibles</h2>
            )}
          </Switch>
        </div>
      </div>
    </div>
  );
};

type PropertyListProps = {
  properties?: PropertyPreviewDTO[] | null;
  expanded?: boolean;
  isLargeCards?: boolean;
};

const PropertyList = ({
  properties,
  expanded = false,
  isLargeCards = false,
}: PropertyListProps) => {
  return (
    <div
      className={clsx(styles.propList, {
        [styles.expanded]: !isLargeCards && expanded,
      })}
    >
      {properties?.map((property) => (
        <HouseCardMobile
          key={property.id}
          house={property}
          isLarge={isLargeCards}
        />
      ))}
    </div>
  );
};
