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
  const [load, setLoad] = useState(true);
  const [rightSideData, setRightSideData] = useState<PropertyPreviewDTO[]>();

  const dispatch = useDispatch();

  const query = useMemo(
    () => QueryString.parse(location.search) as any,
    [location.search]
  );

  const { data: houseStyles } = useGetStylesUsingGET();
  const { data: houseTypes } = useGetTypesUsingGET();

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

  const isAuthenticated = !!user;

  useEffect(() => {
    buildDataset();
  }, [bbox, query]);

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
            {!load && rightSideData && rightSideData.length > 0 ? (
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
        <HouseCard key={property.id} house={property} isLarge={isLargeCards} />
      ))}
    </div>
  );
};
