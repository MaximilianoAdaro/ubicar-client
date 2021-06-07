import styles from "./addFavorite.module.scss";
import { Button, Grid } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { likeProperty, dislikeProperty } from "../../api/propertyUser";

const id = "4028803e79e80cd40179e823a67b004b";
export function AddFavorite() {
  return (
    <div>
      <Grid>
        <Button onClick={() => likeProperty(id)}>
          <StarBorderIcon className={styles.unfavorite} />
        </Button>
        <Button onClick={() => dislikeProperty(id)}>
          <StarIcon className={styles.favorite} />
        </Button>
      </Grid>
    </div>
  );
}
