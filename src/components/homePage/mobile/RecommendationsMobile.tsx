import styles from "./HomePageMobile.module.scss";
import React, { useState } from "react";
import { Grid, List, ListItem, styled, Typography } from "@material-ui/core";
import { PropretyCardMyFavorites } from "../../UserProfile/Web/PropertyCardMyFavorites";
import { useGetRecommendations } from "../../../api";
import { urls } from "../../../constants";
import { useHistory } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { HouseCardMobile } from "../../newListingHouse";
import { RiArrowRightSLine } from "react-icons/all";

type RecommendationsProps = {
  recommendationNumber: number;
};

export const formatPrice = (price: number) =>
  new Intl.NumberFormat(undefined).format(price);

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
                   ? `con precios entre U$D${formatPrice(filter.minPrice)}`
                   : `con precio desde U$D${formatPrice(filter.minPrice)},`
               }`
             : ""
         }
         ${
           filter.maxPrice
             ? `${
                 filter.minPrice
                   ? `y U$D${filter.maxPrice},`
                   : `con precio hasta U$D${formatPrice(filter.maxPrice)},`
               }`
             : ""
         }
         ${
           filter.minAmountBathroom
             ? ` con más de ${filter.minAmountBathroom} ${
                 filter.minAmountBathroom === 1 ? "baño" : "baños"
               }, `
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

export function RecommendationsMobile({
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
              <h4 className={styles.title}>Propiedades recomendadas</h4>
              <div className={styles.propertyCard}>
                {properties[recommendationNumber]?.properties
                  .slice(0, 4)
                  .map((casa: any) => (
                    <div
                      onClick={() =>
                        history.push(urls.viewProperty.byId(casa.id))
                      }
                    >
                      <HouseCardMobile
                        key={casa.id}
                        house={casa}
                        isLarge={true}
                        // from={"properties"}
                        // state={""}
                      />
                    </div>
                  ))}
                {properties && (
                  <Grid>
                    <Button
                      style={{
                        justifyContent: "left",
                        textTransform: "none",
                        marginBottom: "0.5em",
                        paddingTop: "0",
                      }}
                      onClick={() =>
                        history.push(urls.userProfile.recommendations)
                      }
                    >
                      Ver más
                      <RiArrowRightSLine style={{ marginTop: "0.2em" }} />
                    </Button>
                  </Grid>
                )}
              </div>
            </div>
          </Grid>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
