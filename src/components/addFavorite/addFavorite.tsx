import { Button, Grid } from "@material-ui/core";
import axios from "axios";

const propertyId = 5;
const handleClick = () => {
  axios.put("https://localhost:8080/like/" + propertyId, propertyId);
};

const handleClick2 = () => {
  axios.put("https://localhost:8080/dislike/" + propertyId, propertyId);
};

export function adddFavorite() {
  return (
    <div>
      <Grid>
        <Button onClick={handleClick} />
      </Grid>
    </div>
  );
}
