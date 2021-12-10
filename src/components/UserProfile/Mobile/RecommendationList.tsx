import styles from "./UserProfileMobile.module.scss";

import React, { useState } from "react";
import { Grid, styled, Typography } from "@material-ui/core";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import { PropretyCardMyFavoritesMobile } from "./PropertyCardMyFavoritesMobile";
import { urls } from "../../../constants";
import { useGetRecommendations } from "../../../api";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

type RecommendationListProps = {
  listNumber: number;
};

export const formatPrice = (price: number) =>
  new Intl.NumberFormat(undefined).format(price);

export function RecommendationList({ listNumber }: RecommendationListProps) {
  // console.log(data[listNumber])
  const { data } = useGetRecommendations();
  const [open, setOpen] = useState(false);
  if (!data) return <h1>Loading...</h1>;

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

  function printThis(key: string) {
    return filterCreation(key, data[listNumber].filter);
  }

  function filterCreation(key: any, filter: any) {
    switch (key) {
      case "condition":
        return `${
          filter.condition
            ? `Tipo de operacion : ${
                filter.condition === "Sale" ? "Venta" : "Alquiler"
              }`
            : ""
        }`;
      case "minAmountBathroom":
        return `${
          filter.minAmountBathroom
            ? `Cantidad de baños: ${filter.minAmountBathroom} o más`
            : ""
        }`;
      case "minAmountRoom":
        return `${
          filter.minAmountRoom
            ? `${
                filter.maxAmountRoom
                  ? `Cantidad de habitaciones: ${filter.minAmountRoom}`
                  : `Cantidad de habitaciones: desde ${filter.minAmountRoom}`
              }`
            : ""
        } ${
          filter.maxAmountRoom
            ? `${
                filter.minAmountRoom
                  ? ` a ${filter.maxAmountRoom}`
                  : `Cantidad de habitaciones: hasta ${filter.maxAmountRoom}`
              }`
            : ""
        }`;
      case "minPrice":
        return ` ${
          filter.minPrice
            ? `${
                filter.maxPrice
                  ? `Precio: U$D${formatPrice(filter.minPrice)}`
                  : `Precio: desde U$D${formatPrice(filter.minPrice)}`
              }`
            : ""
        } ${
          filter.maxPrice
            ? `${
                filter.minPrice
                  ? ` a U$D${formatPrice(filter.maxPrice)}`
                  : `Precio: hasta U$D${formatPrice(filter.maxPrice)}`
              }`
            : ""
        }`;
      case "minAmountSquareMeter":
        return `${
          filter.minAmountSquareMeter
            ? `${
                filter.maxAmountSquareMeter
                  ? `Metros cuadrados: ${filter.minAmountSquareMeter}m²`
                  : `Metros cuadrados: desde ${filter.minAmountSquareMeter}m²`
              }`
            : ""
        } ${
          filter.maxAmountSquareMeter
            ? `${
                filter.minAmountSquareMeter
                  ? ` a ${filter.maxAmountSquareMeter}m²`
                  : `Metros cuadrados: hasta ${filter.maxAmountSquareMeter}m²`
              }`
            : ""
        }`;
    }

    // return `${filter.condition ? `Tipo de operacion : ${filter.condition === 'Sale' ? "En Venta" : "En Alquiler"}`: ""}`
    // +`${filter.condition ? `Tipo de operacion : ${filter.condition === 'Sale' ? "En Venta" : "En Alquiler"}`: ""}`
    // return `
    // ${filter.condition ? `Tipo de operacion : ${filter.condition === 'Sale' ? "En Venta" : "En Alquiler"}`: ""}
    // ${filter.minAmountBathroom ? `Cantidad de baños: ${filter.minAmountBathroom}` : ""}
    // ${filter.minAmountRoom ? `${filter.maxAmountRoom ? `Cantidad de habitaciones: ${filter.minAmountRoom}` : `Cantidad de habitaciones: desde ${filter.minAmountRoom}`}` : ""} ${filter.maxAmountRoom ? `${filter.minAmountRoom ? ` a ${filter.maxAmountRoom}` : `Cantidad de habitaciones: hasta ${filter.maxAmountRoom}`}` : ""}
    // ${filter.minPrice ? `${filter.maxPrice ? `Precio: U$D${filter.minPrice}` : `Precio: desde U$D${filter.minPrice}`}` : ""} ${filter.maxPrice ? `${filter.minPrice ? ` a U$D${filter.maxPrice}` : `Precio: hasta U$D${filter.maxPrice}`}` : ""}
    // ${filter.minAmountSquareMeter ? `${filter.maxAmountSquareMeter ? `Metros cuadrados: ${filter.minAmountSquareMeter}m²` : `Metros cuadrados: desde ${filter.minAmountSquareMeter}m²`}` : ""} ${filter.maxAmountSquareMeter ? `${filter.minAmountSquareMeter ? ` a ${filter.maxAmountSquareMeter}m²` : `Metros cuadrados: hasta ${filter.maxAmountSquareMeter}m²`}` : ""}
    // `;
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

  console.log(data[listNumber].filter);

  return (
    <Grid>
      <div className={styles.propertyList}>
        <h5 style={{ padding: "0 1em 0", fontSize: "1.1em" }}>
          Por que guardaste{" "}
          <a onClick={handleOpen} style={{ color: "#007bff" }}>
            estos filtros
          </a>{" "}
          y te gusto{" "}
          <a href={urls.viewProperty.byId(data[listNumber].liked.id)}>
            esta propidead
          </a>{" "}
          te recomendamos:
        </h5>
        {data[listNumber]?.properties.length > 0 ? (
          <div>
            <List>
              {data[listNumber]?.properties
                .filter((casa: any) => casa.step == 7)
                .map((casa: any) => (
                  <ListItem style={{ width: "20em" }}>
                    <PropretyCardMyFavoritesMobile
                      key={casa.id}
                      house={casa}
                      from={"properties"}
                      state={""}
                    />
                  </ListItem>
                ))}
            </List>
          </div>
        ) : (
          <h5 style={{ color: "gray" }}>
            Empieza likeando propiedades para poder recomendarte propiedades.
          </h5>
        )}
      </div>
      <div style={{ display: "flex" }}>
        <Typography variant={"h6"} style={{ textAlign: "left" }}>
          Tipo de usuario
        </Typography>
        <HelpOutlineIcon
          fontSize="small"
          style={{ margin: "auto 5px" }}
          onClick={handleOpen}
        />
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
          <DialogContent dividers style={{ padding: "1em" }}>
            {Object.entries(data[listNumber].filter).map(([key, value]) => (
              <Typography style={{ marginBottom: "0.75em" }}>
                {printThis(key)}
              </Typography>
            ))}
          </DialogContent>
        </BootstrapDialog>
      </div>
    </Grid>
  );
}
