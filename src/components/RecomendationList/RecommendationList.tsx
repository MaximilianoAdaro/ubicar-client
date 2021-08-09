import styles from "./RecommendationList.module.scss";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
} from "@material-ui/core";

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
    <div className={styles.imageList}>
      <ImageList cols={5}>
        {casas.map((item) => (
          <ImageListItem>
            <img
              src="https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg"
              alt={item.title}
            />
            <ImageListItemBar
              title={
                <div>
                  <Tooltip
                    title={
                      <span className={styles.tooltipTitle}>{item.title}</span>
                    }
                  >
                    <p className={styles.myPropertyTitle}>
                      $5.000.000 &nbsp; - &nbsp; {item.title}
                    </p>
                  </Tooltip>
                </div>
              }
              subtitle={<div>{item.dir}</div>}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
