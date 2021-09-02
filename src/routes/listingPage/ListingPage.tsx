import Grid from "@material-ui/core/Grid";
import { ListingFilters } from "../../components/listingFilters/";
import { ListingHouse } from "../../components/listingHouse/";
import { MapComponent } from "../../components/Map/map";
import { actions, useAppSelector } from "../../store";
import { selectView, selectZoom } from "../../store/slices/map/mapSlice";
import styles from "./ListingPage.module.scss";
import { useEffect, useMemo, useState } from "react";
import {
  PropertyPreviewDTO,
  useGetStylesUsingGET,
  useGetTypesUsingGET,
} from "../../api";
import { Switch, useLocation } from "react-router-dom";
import QueryString from "query-string";
import { Loading } from "../../components/common/loading/Loading";
import { useDispatch } from "react-redux";

const checkNotUndefined = (value: any) => {
  return value ? value : null;
};

export const ListingPage = () => {
  const location = useLocation();

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
        body: JSON.stringify({
          condition: checkNotUndefined(query.condition),
          typeProperty: checkNotUndefined(query.typeProperty),
          minPrice: parseFloat(checkNotUndefined(query.minPrice)),
          maxPrice: parseFloat(checkNotUndefined(query.maxPrice)),
          style: checkNotUndefined(query.style),
          minAmountBathroom: checkNotUndefined(query.minAmountBathroom),
          minAmountRoom: checkNotUndefined(query.minAmountRoom),
          minAmountSquareMeter: checkNotUndefined(query.minAmountSquareMeter),
          maxAmountSquareMeter: checkNotUndefined(query.maxAmountSquareMeter),
        }),
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

  return (
    <div>
      <ListingFilters
        houseStyles={houseStyles ? houseStyles : null}
        houseTypes={houseTypes ? houseTypes : null}
        setZoom={setter1}
        setView={setter2}
      />
      <Grid container className={styles.mapAndProperties}>
        <Grid item xl={9} sm={8} className={styles.map}>
          <MapComponent
            zoom={zoom}
            view={view}
            renderLayers={true}
            editable={false}
            setZoom={setter1}
            setView={setter2}
            setBbox={setBbox}
          />
        </Grid>
        <Grid item xl={3} sm={4} className={styles.propertyList}>
          <Switch>
            {load && <Loading />}
            {!load && rightSideData && rightSideData.length > 0 ? (
              <PropertyList properties={rightSideData} />
            ) : (
              <h2>No hay publicaciones disponibles</h2>
            )}
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
};

type PropertyListProps = {
  properties?: PropertyPreviewDTO[] | null;
};

const PropertyList = ({ properties }: PropertyListProps) => {
  return (
    <>
      {properties?.map((property) => (
        <ListingHouse key={property.id} house={property} />
      ))}
    </>
  );
};
