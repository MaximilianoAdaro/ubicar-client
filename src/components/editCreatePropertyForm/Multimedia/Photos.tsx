import styles from "./Photos.module.scss";
import ImageUploading from "react-images-uploading";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import { IconButton } from "@material-ui/core";
import { TiDeleteOutline } from "react-icons/all";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export const Photos = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  // @ts-ignore
  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);
  };

  console.log(images);
  return (
    <div>
      <div className={styles.container}>
        <h4>Fotos</h4>
        <div className={styles.comingSoon}>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
                &nbsp;
                <button onClick={onImageRemoveAll}>Remove all images</button>
                <div className={classes.root}>
                  <ImageList className={classes.imageList} cols={4}>
                    {imageList.map((image, index) => (
                      // <div key={index} className="image-item">
                      //     <img src={image['data_url']} alt="" width="100" />
                      //     <div className="image-item__btn-wrapper">
                      //         <button onClick={() => onImageUpdate(index)}>Update</button>
                      //         <button onClick={() => onImageRemove(index)}>Remove</button>
                      //     </div>
                      // </div>
                      <ImageListItem key={image.img}>
                        <img src={image["data_url"]} alt={image.title} />
                        <ImageListItemBar
                          title={image.title}
                          classes={{
                            root: classes.titleBar,
                            title: classes.title,
                          }}
                          actionIcon={
                            <IconButton aria-label={`star ${image.title}`}>
                              <TiDeleteOutline
                                className={classes.title}
                                onClick={() => onImageRemove(index)}
                              />
                            </IconButton>
                          }
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
              </div>
            )}
          </ImageUploading>
        </div>
      </div>
    </div>
  );
};
