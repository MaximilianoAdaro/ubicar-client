import { ListingFilters } from "../../components/listingFilters/";
import { MapComponent } from "../../components/Map/map";
import { actions, useAppSelector } from "../../store";
import { selectView, selectZoom } from "../../store/slices/map/mapSlice";
import styles from "./ListingPage.module.scss";
import { useEffect, useMemo, useState } from "react";
import {
  PropertyPreviewDTO,
  useGetLoggedUsingGET,
  useGetStylesUsingGET,
  useGetTypesUsingGET,
} from "../../api";
import { Switch, useLocation } from "react-router-dom";
import QueryString from "query-string";
import { Loading } from "../../components/common/loading/Loading";
import { useDispatch } from "react-redux";
import { HouseCard } from "../../components/newListingHouse";
import clsx from "clsx";
import { ReactComponent as OneGridIcon } from "../../assets/listingPageGridOne.svg";
import { ReactComponent as OneGridIconSelected } from "../../assets/listingPageGridOneSelected.svg";
import { ReactComponent as TwoGridIcon } from "../../assets/listingPageGridTwo.svg";
import { ReactComponent as TwoGridIconSelected } from "../../assets/listingPageGridTwoSelected.svg";
import SignUp from "../../components/PopUp/SignUp";
import { useInfiniteQuery, useQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";

const checkNotUndefined = (value: any) => {
  return value ? value : null;
};

export const ListingPage = () => {
  const location = useLocation();
  const { data: user } = useGetLoggedUsingGET();

  const [isTwoColumns, setIsTwoColums] = useState(false);
  const [isLargeCards, setIsLargeCards] = useState(true);

  const [zoom, setZoom] = useState(useAppSelector(selectZoom));
  const [view, setView] = useState(useAppSelector(selectView));
  const [bbox, setBbox] = useState([0]);
  // const [load, setLoad] = useState(true);
  // const [rightSideData, setRightSideData] = useState<PropertyPreviewDTO[]>();

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
    isLoading: load,
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

  // const rightSideData = data?.content;
  console.log(data);

  const { data: houseStyles } = useGetStylesUsingGET();
  const { data: houseTypes } = useGetTypesUsingGET();

  // const buildDataset = async () => {
  //   setLoad(true);

  //   const mapData = await fetch(
  //     "http://localhost:3000/public/property/preview/by-filter?b1=" +
  //       bbox[0] +
  //       "&b2=" +
  //       bbox[1] +
  //       "&b3=" +
  //       bbox[2] +
  //       "&b4=" +
  //       bbox[3],
  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body,
  //     }
  //   );

  //   const response2 = await mapData.json();
  //   if (response2) {
  //     if (response2.content?.length > 0) {
  //       setRightSideData(response2.content);
  //     } else {
  //       setRightSideData([]);
  //     }
  //     setLoad(false);
  //   }
  // };

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

  const isAuthenticated = !!user;

  // useEffect(() => {
  //   buildDataset();
  // }, [bbox, query]);

  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setIsOpened(true);
  }, [isAuthenticated]);

  return (
    <div>
      {!isAuthenticated && (
        <SignUp isOpened={isOpened} setIsOpened={setIsOpened} />
      )}
      <ListingFilters
        houseStyles={houseStyles ? houseStyles : null}
        houseTypes={houseTypes ? houseTypes : null}
        setZoom={setter1}
        setView={setter2}
      />
      <div
        className={clsx(styles.mapAndProperties, {
          [styles.largeCards]: isLargeCards,
          [styles.twoColumns]: isTwoColumns,
        })}
      >
        <div className={styles.map}>
          <MapComponent
            zoom={zoom}
            view={view}
            renderLayers={true}
            editable={false}
            setZoom={setter1}
            setView={setter2}
            setBbox={setBbox}
            body={body}
          />
        </div>
        {!isLargeCards && (
          <div className={styles.changeSizeButtonContainer}>
            <div onClick={() => setIsTwoColums((b) => !b)}>
              <div />
              <div />
            </div>
          </div>
        )}
        <div className={styles.propertyList}>
          <Switch>
            {load && <Loading />}
            {!load && data && data.pages.length > 0 ? (
              <div className={styles.buttonsAndProps}>
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
            <HouseCard
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
