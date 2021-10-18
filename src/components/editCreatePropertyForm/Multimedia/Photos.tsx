import styles from "./Photos.module.scss";
import ImageUploading from "react-images-uploading";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import { Button, Grid, IconButton } from "@material-ui/core";
import { TiDeleteOutline } from "react-icons/all";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
// import { useDropzone } from "react-dropzone";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "rgba(196, 196, 196, 0.1)",
    marginTop: "1em",
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
  const classes = useStyles();
  const [images, setImages] = useState([]);
  // console.log(images);

  // @ts-ignore
  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);
    console.log(images);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      // @ts-ignore
      formData.append(`images[${i}]`, images[i].file);
    }
  };

  const handleFiles = (event: any) => {
    dispatch(actions.editPropertyForm.addImages(event.target.files));
  };

  return (
    <div>
      <div className={styles.container}>
        <h4>Fotos</h4>
        <Grid container className={styles.comingSoon}>
          <Grid xs={12} className={styles.photos_input}>
            {/*<input type={"file"} onChange={handleFiles} multiple />*/}
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={30}
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
                  <Button
                    variant="contained"
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                    className={styles.add_image}
                  >
                    Agregar imagen
                  </Button>
                  &nbsp;
                  <Button variant="contained" onClick={onImageRemoveAll}>
                    Eliminar todas las imagenes
                  </Button>
                  <div className={classes.root}>
                    <ImageList className={classes.imageList} cols={4}>
                      {images.map((image, index) => (
                        <ImageListItem key={""}>
                          <img
                            src={image["data_url"]}
                            alt={"hola"}
                            className={styles.photo}
                          />
                          <ImageListItemBar
                            title={""}
                            classes={{
                              root: classes.titleBar,
                              title: classes.title,
                            }}
                            actionIcon={
                              <IconButton>
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
          </Grid>
          <Grid className={styles.photos_description} xs>
            <p>Admite hasta 1 mb por foto</p>
            <p>Se pide un mínimo de 5 fotos y un máximo de 30</p>
          </Grid>

          {/*<div {...getRootProps()}>*/}
          {/*  <input {...getInputProps()} />*/}
          {/*  {*/}
          {/*    isDragActive ?*/}
          {/*        <p>Drop the files here ...</p> :*/}
          {/*        <p>Drag 'n' drop some files here, or click to select files</p>*/}
          {/*  }*/}
          {/*</div>*/}
          {/*<Button variant="contained" onClick={handleSubmit}>Upload</Button>*/}
        </Grid>
      </div>
    </div>
  );
};
