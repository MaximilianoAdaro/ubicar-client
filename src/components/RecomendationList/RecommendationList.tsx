import styles from "./RecommendationList.module.scss";
import { ImageList, ImageListItem, ImageListItemBar } from "@material-ui/core";

const casa1 = {
  title: "La mejor casa en belgrano",
  dir: "Intendente Alfaro 127",
  img: "https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg",
};
const casa2 = {
  title: "La mejor casa en belgrano",
  dir: "Intendente Alfaro 127",
  img: "https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg",
};
const casa3 = {
  title: "La mejor casa en belgrano",
  dir: "Intendente Alfaro 127",
  img: "https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg",
};
const casa4 = {
  title: "La mejor casa en belgrano",
  dir: "Intendente Alfaro 127",
  img: "https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg",
};
const casa5 = {
  title: "La mejor casa en belgrano",
  dir: "Intendente Alfaro 127",
  img: "https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg",
};

const casas = [casa1, casa2, casa3, casa4, casa5];

export function RecommendationList() {
  return (
    <div>
      <h1>Hola</h1>
      <ImageList cols={5} className={styles.imageList}>
        {casas.map((item) => (
          <ImageListItem>
            <img
              src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
              alt={item.title}
            />
            <ImageListItemBar
              title={<div>$5.000.000 &nbsp; - &nbsp; {item.title} </div>}
              subtitle={<div>{item.dir}</div>}
            />
          </ImageListItem>
        ))}
      </ImageList>
      {/*<ImageList cols={2.5}>*/}
      {/*{itemData.map((item) => (*/}
      {/*    <ImageListItem key={item.img}>*/}
      {/*        <img src={item.img} alt={item.title} />*/}
      {/*        <ImageListItemBar*/}
      {/*            title={item.title}*/}
      {/*            actionIcon={*/}
      {/*                <IconButton aria-label={`star ${item.title}`}>*/}
      {/*                    <StarBorderIcon  />*/}
      {/*                </IconButton>*/}
      {/*            }*/}
      {/*        />*/}
      {/*    </ImageListItem>*/}
      {/*))}*/}
      {/*</ImageList>*/}
    </div>
  );
}
