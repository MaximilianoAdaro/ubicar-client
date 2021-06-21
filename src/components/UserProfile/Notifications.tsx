import styles from "./UserProfile.module.scss";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";

export function Notifications() {
  return (
    <div>
      <Grid>
        <h1>Notificaciones</h1>
        <p>
          Aqui puedes cambiar las notificaciones que quieres que te lleguen.
        </p>
      </Grid>
    </div>
  );
}
