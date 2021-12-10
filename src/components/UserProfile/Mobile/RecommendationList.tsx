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
    <Grid>
      <div className={styles.propertyList}>
        <h5 style={{ padding: "0 1em 0", fontSize: "1.1em" }}>
          Por que guardaste <a onClick={handleOpen}>estos filtros</a>y te gusto{" "}
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
          <DialogContent dividers>
            {data[listNumber].filer.map((filter: any) => (
              <Typography>{filter}</Typography>
            ))}
          </DialogContent>
        </BootstrapDialog>
      </div>
    </Grid>
  );
}
