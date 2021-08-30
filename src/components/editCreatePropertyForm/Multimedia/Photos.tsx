import styles from "./Photos.module.scss";
import ImageUploading from "react-images-uploading";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import { Button, IconButton } from "@material-ui/core";
import { TiDeleteOutline } from "react-icons/all";
import { actions, useAppDispatch, useAppSelector } from "../../../store";

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
  const dispatch = useAppDispatch();
  // const classes = useStyles();
  const [images, setImages] = useState([]);

  // @ts-ignore
  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      // @ts-ignore
      formData.append(`images[${i}]`, images[i].file);
    }
  };

  const handleFiles = (event: any) => {
    console.log(event.target.files);
    setImages(event.target.files);
    console.log(images);
    dispatch(actions.editPropertyForm.addImages(images));
  };

  return (
    <div>
      <div className={styles.container}>
        <h4>Fotos</h4>
        <div className={styles.comingSoon}>
          {/*<ImageUploading*/}
          {/*  multiple*/}
          {/*  value={images}*/}
          {/*  onChange={onChange}*/}
          {/*  maxNumber={maxNumber}*/}
          {/*  dataURLKey="data_url"*/}
          {/*>*/}
          {/*  {({*/}
          {/*    imageList,*/}
          {/*    onImageUpload,*/}
          {/*    onImageRemoveAll,*/}
          {/*    onImageRemove,*/}
          {/*    isDragging,*/}
          {/*    dragProps,*/}
          {/*  }) => (*/}
          {/*    // write your building UI*/}
          {/*    <div className="upload__image-wrapper">*/}
          {/*      <Button*/}
          {/*          variant="contained"*/}
          {/*          style={isDragging ? { color: "red" } : undefined}*/}
          {/*        onClick={onImageUpload}*/}
          {/*        {...dragProps}*/}
          {/*      >*/}
          {/*        Agregar imagen*/}
          {/*      </Button>*/}
          {/*      &nbsp;*/}
          {/*      <Button variant="contained"  onClick={onImageRemoveAll}>*/}
          {/*        Eliminar todas las imagenes*/}
          {/*      </Button>*/}
          {/*      <div className={classes.root}>*/}
          {/*        <ImageList className={classes.imageList} cols={4}>*/}
          {/*          {images.map((image, index) => (*/}
          {/*            <ImageListItem key={""}>*/}
          {/*              <img src={image["data_url"]} alt={"hola"} />*/}
          {/*              <ImageListItemBar*/}
          {/*                title={""}*/}
          {/*                classes={{*/}
          {/*                  root: classes.titleBar,*/}
          {/*                  title: classes.title,*/}
          {/*                }}*/}
          {/*                actionIcon={*/}
          {/*                  <IconButton>*/}
          {/*                    <TiDeleteOutline*/}
          {/*                      className={classes.title}*/}
          {/*                      onClick={() => onImageRemove(index)}*/}
          {/*                    />*/}
          {/*                  </IconButton>*/}
          {/*                }*/}
          {/*              />*/}
          {/*            </ImageListItem>*/}
          {/*          ))}*/}
          {/*        </ImageList>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  )}*/}
          {/*</ImageUploading>*/}
          <input type={"file"} onChange={handleFiles} multiple />
          {/*<Button variant="contained" onClick={handleSubmit}>Upload</Button>*/}
        </div>
      </div>
    </div>
  );
};
