import Grid from "@material-ui/core/Grid";
import { ListingFilters } from "../../components/listingFilters/";
import { ListingHouse } from "../../components/listingHouse/";
import { MapComponent } from "../../components/Map/map";
import { useAppSelector } from "../../store";
import { selectView, selectZoom } from "../../store/slices/map/mapSlice";
import styles from "./ListingPage.module.scss";
import { useEffect, useMemo, useState } from "react";
import {
  PagePropertyPreviewDTO,
  useGetStylesUsingGET,
  useGetTypesUsingGET,
  useGetPropertiesFilteredUsingPOST,
} from "../../api";
import { useLocation } from "react-router-dom";
import QueryString from "query-string";

const checkNotUndefined = (value: any) => {
  return value ? value : null;
};

export function ListingPage() {
  const location = useLocation();

  const query = useMemo(
    () => QueryString.parse(location.search) as any,
    [location.search]
  );

  const [data, setData] = useState<PagePropertyPreviewDTO | null>(null);

  const { data: houseStyles } = useGetStylesUsingGET();
  const { data: houseTypes } = useGetTypesUsingGET();

  const { mutateAsync: getFilteredProperties } =
    useGetPropertiesFilteredUsingPOST();

  useEffect(() => {
    const f = async () => {
      const data = await getFilteredProperties({
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
      setData(data);
    };
    f();
  }, [getFilteredProperties, query]);

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
          {data && data.content !== null ? (
            <MapComponent
              properties={data.content}
              zoom={zoom}
              view={view}
              renderLayers={true}
            />
          ) : null}
        </Grid>
        <Grid item xl={3} sm={4} className={styles.propertyList}>
          {!data && <h2>There was an error retrieving the properties</h2>}
          {data && data.content && data.content.length > 0 ? (
            data.content.map((casa) => (
              <ListingHouse key={casa.id} house={casa} />
            ))
          ) : (
            <h2>There are no properties with these filters</h2>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
