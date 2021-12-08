import styles from "./HomePage.module.scss";
import React, { useState } from "react";
import { Grid, List, ListItem, styled, Typography } from "@material-ui/core";
import { PropretyCardMyFavorites } from "../UserProfile/Web/PropertyCardMyFavorites";
import { useGetRecommendations } from "../../api";
import { urls } from "../../constants";
import { useHistory } from "react-router-dom";
import { MostLiked } from "./MostLiked";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type RecommendationsProps = {
  recommendationNumber: number;
};

function filterCreation(filter: any) {
  return `Estas buscando
         ${
           filter.typeProperty
             ? `${
                 filter.typeProperty === "Casa" ? "una" : "un"
               } ${filter.typeProperty.toLowerCase()}`
             : "una propiedad"
         }
         ${
           filter.condition
             ? `en ${filter.condition === "SALE" ? "venta" : "alquiler"}`
             : ""
         }
         ${
           filter.minPrice
             ? `${
                 filter.maxPrice
                   ? `con precios entre U$D${filter.minPrice}`
                   : `con precio desde U$D${filter.minPrice},`
               }`
             : ""
         }
         ${
           filter.maxPrice
             ? `${
                 filter.minPrice
                   ? `y U$D${filter.maxPrice},`
                   : `con precio hasta U$D${filter.maxPrice},`
               }`
             : ""
         }
         ${
           filter.minAmountBathroom
             ? ` con más de ${filter.minAmountBathroom} baños, `
             : ""
         }
         ${
           filter.minAmountRoom
             ? `${
                 filter.maxAmountRoom
                   ? `con ${filter.minAmountRoom}`
                   : `con ${filter.minAmountRoom} ambientes,`
               }`
             : ""
         }
         ${
           filter.maxAmountRoom
             ? `${
                 filter.minAmountRoom
                   ? `- ${filter.maxAmountRoom} ambientes,`
                   : ` con hasta ${filter.maxAmountRoom} ambientes,`
               }`
             : ""
         }
         ${
           filter.minAmountSquareMeter
             ? `${
                 filter.maxAmountSquareMeter
                   ? `con ${filter.minAmountSquareMeter}`
                   : `con ${filter.minAmountSquareMeter} metros cuadrados,`
               }`
             : ""
         }
         ${
           filter.maxAmountSquareMeter
             ? `${
                 filter.minAmountSquareMeter
                   ? `-${filter.maxAmountSquareMeter} metros cuadrados,`
                   : `con hasta ${filter.maxAmountSquareMeter} metros cuadrados,`
               }`
             : ""
         }
         ${filter.style ? `con estilo ${filter.style}` : ""}`;
}

export function Recommendations({
  recommendationNumber,
}: RecommendationsProps) {
  const { data: properties } = useGetRecommendations();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  if (!properties) return <h1>Loading...</h1>;

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }

  const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  return (
    <div>
      {properties[recommendationNumber] &&
      properties[recommendationNumber].properties.length > 0 ? (
        <div className={styles.personalDataMainDiv}>
          <Grid className={styles.properties}>
            <div className={styles.propertyList}>
              <div>
                <h2 style={{ margin: "0px" }}>
                  {filterCreation(properties[recommendationNumber].filter)}y te
                  gustó{" "}
                  <a
                    href={urls.viewProperty.byId(
                      properties[recommendationNumber].liked.id
                    )}
                  >
                    esta propiedad
                  </a>{" "}
                  te recomendamos:
                </h2>
              </div>
              <List
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 0,
                  overflow: "auto",
                  margin: "0",
                }}
              >
                {properties[recommendationNumber]?.properties.map(
                  (casa: any) => (
                    <ListItem
                      style={{ width: "20em", marginRight: "2em" }}
                      onClick={() =>
                        history.push(urls.viewProperty.byId(casa.id))
                      }
                    >
                      <PropretyCardMyFavorites
                        key={casa.id}
                        house={casa}
                        from={"properties"}
                        state={""}
                      />
                    </ListItem>
                  )
                )}
              </List>
            </div>
          </Grid>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              Filtros
            </BootstrapDialogTitle>
            <DialogContent dividers>
              {properties[recommendationNumber].filter &&
                Object.entries(properties[recommendationNumber].filter).map(
                  ([key, value]) => (
                    <Typography>
                      {value !== null && `${key} : ${value}`}
                    </Typography>
                  )
                )}

              {/*<Typography gutterBottom>*/}
              {/*  <b>Inpector:</b> Usuarios dedicados a la inspección de*/}
              {/*  propiedades que se publican en la aplicación antes de que*/}
              {/*  estén al alcance del público para asegurar la calidad del*/}
              {/*  servicio que proveemos.*/}
              {/*</Typography>*/}
              {/*<Typography gutterBottom>*/}
              {/*  <b>Inversor:</b> Usuarios interesados en encontrar*/}
              {/*  oportunidades de inversión en inmuebles publicados alrededor*/}
              {/*  de toda la Argentina.*/}
              {/*</Typography>*/}
              {/*<Typography gutterBottom>*/}
              {/*  <b>Inmobiliaria:</b> Usuarios interesados en utilizar otros*/}
              {/*  medios de comunicación para promocionar un inmueble que se les*/}
              {/*  ha sido encargado vender.*/}
              {/*</Typography>*/}
            </DialogContent>
          </BootstrapDialog>
        </div>
      ) : (
        <MostLiked />
      )}
    </div>
  );
}
