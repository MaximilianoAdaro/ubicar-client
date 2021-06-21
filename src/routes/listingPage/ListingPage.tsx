import Grid from "@material-ui/core/Grid";
import { useGetPropertiesUsingGET } from "../../api/generated/property-public-controller/property-public-controller";
import { ListingFilters } from "../../components/listingFilters/";
import { ListingHouse } from "../../components/listingHouse/";
import { MapComponent } from "../../components/Map/map";
import { useAppSelector } from "../../store";
import { selectView, selectZoom } from "../../store/slices/map/mapSlice";
import styles from "./ListingPage.module.scss";
import { useEffect, useState } from "react";
import { useGetPropertiesFilteredUsingPOST } from "../../api/generated/property-public-controller/property-public-controller";
import {
  PagePropertyPreviewDTO,
  PropertyFilterDto,
} from "../../api/generated/endpoints.schemas";
import {
  useGetStylesUsingGET,
  useGetTypesUsingGET,
} from "../../api/generated/optionals-controller/optionals-controller";

export function ListingPage() {
  const [filters, setFilters] = useState<PropertyFilterDto>({});

  const [data, setData] = useState<PagePropertyPreviewDTO | null>(null);

  const { data: houseStyles } = useGetStylesUsingGET();
  const { data: houseTypes } = useGetTypesUsingGET();

  const checkNotUndefined = (value: any) => {
    return value ? value : null;
  };

  const { mutateAsync: getFilteredProperties } =
    useGetPropertiesFilteredUsingPOST();
  useEffect(() => {
    const f = async () => {
      const data = await getFilteredProperties({
        params: { page: 0 },
        data: {
          condition: checkNotUndefined(filters.condition),
          typeProperty: checkNotUndefined(filters.typeProperty),
          minPrice: parseFloat(checkNotUndefined(filters.minPrice)),
          maxPrice: parseFloat(checkNotUndefined(filters.maxPrice)),
          style: checkNotUndefined(filters.style),
          minAmountBathroom: checkNotUndefined(filters.minAmountBathroom),
          minAmountRoom: checkNotUndefined(filters.minAmountRoom),
          minAmountSquareMeter: checkNotUndefined(filters.minAmountSquareMeter),
          maxAmountSquareMeter: checkNotUndefined(filters.maxAmountSquareMeter),
        },
      });
      setData(data);
    };
    f();
  }, [filters]);

  const zoom = useAppSelector(selectZoom);
  const view = useAppSelector(selectView);
  return (
    <div>
      <ListingFilters
        filters={filters}
        setFilters={setFilters}
        houseStyles={houseStyles ? houseStyles : null}
        houseTypes={houseTypes ? houseTypes : null}
      />
      <Grid container className={styles.mapAndProperties}>
        <Grid item xl={9} sm={8} className={styles.map}>
          <MapComponent zoom={zoom} view={view} />
        </Grid>
        <Grid item xl={3} sm={4} className={styles.propertyList}>
          {!data && <h1>There was an error retrieving the properties</h1>}
          {data &&
            data.content?.map((casa) => (
              <ListingHouse key={casa.id} house={casa} />
            ))}
        </Grid>
      </Grid>
    </div>
  );
}
