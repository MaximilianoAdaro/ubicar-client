import Grid from "@material-ui/core/Grid";
import { useGetPropertiesUsingGET } from "../../api/generated/property-public-controller/property-public-controller";
import { ListingFilters } from "../../components/listingFilters/";
import { ListingHouse } from "../../components/listingHouse/";
import { MapComponent } from "../../components/Map/map";
import { useAppSelector } from "../../store";
import { selectView, selectZoom } from "../../store/slices/map/mapSlice";
import styles from "./ListingPage.module.scss";

export function ListingPage() {
  const data = useGetPropertiesUsingGET({
    page: 0,
  });
  const zoom = useAppSelector(selectZoom);
  const view = useAppSelector(selectView);
  return (
    <div>
      <ListingFilters />
      <Grid container className={styles.mapAndProperties}>
        <Grid item xl={9} sm={8} className={styles.map}>
          <MapComponent zoom={zoom} view={view} />
        </Grid>
        <Grid item xl={3} sm={4} className={styles.propertyList}>
          {data.status === "error" && (
            <h1>There was an error retrieving the properties</h1>
          )}
          {data.status === "success" &&
            data?.data.content?.map((casa) => (
              <ListingHouse key={casa.id} house={casa} />
            ))}
        </Grid>
      </Grid>
    </div>
  );
}
