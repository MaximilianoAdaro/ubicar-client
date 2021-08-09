import Grid from "@material-ui/core/Grid";
import { ListingFilters } from "../../components/listingFilters/";
import { ListingHouse } from "../../components/listingHouse/";
import { MapComponent } from "../../components/Map/map";
import { useAppSelector } from "../../store";
import { selectView, selectZoom } from "../../store/slices/map/mapSlice";
import styles from "./ListingPage.module.scss";
import { useMemo } from "react";
import {
  PropertyPreviewDTO,
  useGetFilteredProperties,
  useGetStylesUsingGET,
  useGetTypesUsingGET,
} from "../../api";
import { Switch, useLocation } from "react-router-dom";
import QueryString from "query-string";
import { Loading } from "../../components/common/loading/Loading";

const checkNotUndefined = (value: any) => {
  return value ? value : null;
};

export function ListingPage() {
  const location = useLocation();

  const query = useMemo(
    () => QueryString.parse(location.search) as any,
    [location.search]
  );

  const { data: houseStyles } = useGetStylesUsingGET();
  const { data: houseTypes } = useGetTypesUsingGET();

  const { data, isLoading, isError } = useGetFilteredProperties({
    params: { page: 0 },
    data: {
      condition: checkNotUndefined(query.condition),
      typeProperty: checkNotUndefined(query.typeProperty),
      minPrice: parseFloat(checkNotUndefined(query.minPrice)),
      maxPrice: parseFloat(checkNotUndefined(query.maxPrice)),
      style: checkNotUndefined(query.style),
      minAmountBathroom: checkNotUndefined(query.minAmountBathroom),
      minAmountRoom: checkNotUndefined(query.minAmountRoom),
      minAmountSquareMeter: checkNotUndefined(query.minAmountSquareMeter),
      maxAmountSquareMeter: checkNotUndefined(query.maxAmountSquareMeter),
    },
  });

  const zoom = useAppSelector(selectZoom);
  const view = useAppSelector(selectView);
  return (
    <div>
      <ListingFilters
        houseStyles={houseStyles ? houseStyles : null}
        houseTypes={houseTypes ? houseTypes : null}
      />
      <Grid container className={styles.mapAndProperties}>
        <Grid item xl={9} sm={8} className={styles.map}>
          <MapComponent
            properties={data?.content}
            zoom={zoom}
            view={view}
            renderLayers={true}
          />
        </Grid>
        <Grid item xl={3} sm={4} className={styles.propertyList}>
          <Switch>
            {isLoading && <Loading />}
            {isError && <h2>Hubo un error</h2>}
            {data?.content && data?.content.length > 0 ? (
              <PropertyList properties={data.content} />
            ) : (
              <h2>No hay publicaciones disponibles</h2>
            )}
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
}

type PropertyListProps = {
  properties: PropertyPreviewDTO[];
};

const PropertyList = ({ properties }: PropertyListProps) => {
  return (
    <>
      {properties.map((property) => (
        <ListingHouse key={property.id} house={property} />
      ))}
    </>
  );
};
