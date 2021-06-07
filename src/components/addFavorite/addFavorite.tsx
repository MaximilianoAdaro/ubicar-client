import styles from "./addFavorite.module.scss";
import { Button, Grid } from "@material-ui/core";
import axios from "axios";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { useQuery } from "react-query";

const propertyId = 5;

// const likeProperty = () => {
//     axios.put("https://localhost:8080/like/" + propertyId, propertyId);
// };
//
// const unlikeProperty = () => {
//     return useQuery("unlikeProperty", async () => {
//         const { data } = await axios.put("https://localhost:8080/dislike/" + propertyId, propertyId);
//         return data;
//     });
// };

export function AddFavorite() {
  return (
    <div>
      <Grid>
        <Button>
          <StarBorderIcon className={styles.unfavorite} />
        </Button>
        <Button>
          <StarIcon className={styles.favorite} />
        </Button>
      </Grid>
    </div>
  );
}
