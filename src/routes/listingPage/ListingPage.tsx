import Grid from "@material-ui/core/Grid";
import { ListingFilters } from "../../components/listingFilters/";
import { ListingHouse } from "../../components/listingHouse/";
import { MapComponent } from "../../components/Map/map";
import { useAppSelector } from "../../store";
import { selectView, selectZoom } from "../../store/slices/map/mapSlice";
import styles from "./ListingPage.module.scss";
import { useGetPropertiesFilteredUsingPOST } from "../../api/generated/property-controller/property-controller";
import { useEffect } from "react";

export function ListingPage() {
  const { mutateAsync } = useGetPropertiesFilteredUsingPOST();
  let data;

  useEffect(() => {
    data = mutateAsync({
      data: { minAmountSquareMeter: 1, maxAmountSquareMeter: 1300 },
      params: { page: 0, size: 15 },
    });
    console.log(data);
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
        <Grid item xl={3} sm={4} className={styles.propertyList}></Grid>
      </Grid>
    </div>
  );
}
