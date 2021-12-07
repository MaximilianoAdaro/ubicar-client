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
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";

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
  // const [load, setLoad] = useState(true);
  // const [rightSideData, setRightSideData] = useState<PropertyPreviewDTO[]>([]);

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
    maxAmountRoom: checkNotUndefined(query.maxAmountRoom),
    minAmountSquareMeter: checkNotUndefined(query.minAmountSquareMeter),
    maxAmountSquareMeter: checkNotUndefined(query.maxAmountSquareMeter),
    minDistanceSchools: checkNotUndefined(query.minDistanceSchools),
    maxDistanceSchool: checkNotUndefined(query.maxDistanceSchool),
    minDistanceUniversity: checkNotUndefined(query.minDistanceUniversity),
    maxDistanceUniversity: checkNotUndefined(query.maxDistanceUniversity),
    minDistanceHospital: checkNotUndefined(query.minDistanceHospital),
    maxDistanceHospital: checkNotUndefined(query.maxDistanceHospital),
    minDistanceFireStation: checkNotUndefined(query.minDistanceFireStation),
    maxDistanceFireStation: checkNotUndefined(query.maxDistanceFireStation),
    minDistancePenitentiary: checkNotUndefined(query.minDistancePenitentiary),
    maxDistanceCommissary: checkNotUndefined(query.maxDistanceCommissary),
    minDistanceSubway: checkNotUndefined(query.minDistanceSubway),
    maxDistanceSubway: checkNotUndefined(query.maxDistanceSubway),
  });

  const {
    data,
    // isLoading: load,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["by-filter", body, bbox],
    async ({ pageParam = 0 }) => {
      const mapData = await fetch(
        "http://localhost:3000/public/property/preview/by-filter?b1=" +
          bbox[0] +
          "&b2=" +
          bbox[1] +
          "&b3=" +
          bbox[2] +
          "&b4=" +
          bbox[3] +
          "&page=" +
          pageParam,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body,
        }
      );

      // if (mapData.status !== 200) {
      //   return null;
      // }

      const response2 = await mapData.json();
      return response2;
    },
    {
      getNextPageParam: (page) => {
        if (!page) return 0;
        return page.last ? undefined : page.number + 1;
      },
    }
  );

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

  // useEffect(() => {
  //   buildDataset();
  // }, [bbox, query]);

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
          showProperties={true}
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
            {data && data?.pages.length > 0 ? (
              <div className={styles.buttonsAndProps}>
                <PropertyList
                  pages={data.pages}
                  expanded={isTwoColumns}
                  isLargeCards={isLargeCards}
                  fetchNextPage={fetchNextPage}
                  hasNextPage={hasNextPage}
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
  pages?: any;
  expanded?: boolean;
  isLargeCards?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
};

const PropertyList = ({
  pages,
  expanded = false,
  isLargeCards = false,
  hasNextPage = false,
  fetchNextPage = () => {},
}: PropertyListProps) => {
  console.log({ pages });
  return (
    <InfiniteScroll
      hasMore={hasNextPage}
      loadMore={() => {
        console.log("fetching next page");
        fetchNextPage();
      }}
      style={{
        border: "1px solid red",
      }}
    >
      <div
        className={clsx(styles.propList, {
          [styles.expanded]: !isLargeCards && expanded,
        })}
      >
        {pages?.flatMap((page: any) => {
          if (!page.content) {
            return null;
          }
          return page.content.map((property: any) => (
            <HouseCardMobile
              key={property.id}
              house={property}
              isLarge={isLargeCards}
            />
          ));
        })}
        {/* {properties?.map((property) => (
        <HouseCard key={property.id} house={property} isLarge={isLargeCards} />
      ))} */}
      </div>
    </InfiniteScroll>
  );
};
