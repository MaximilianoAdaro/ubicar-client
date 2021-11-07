import styles from "./FooterMobile.module.scss";
import React from "react";
import { Link } from "react-router-dom";
import { urls } from "../../../constants";

export function FooterMobile() {
  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.footer_navigation_title}>Ubicar</h3>
        <Link
          to={urls.listingPage}
          className={styles.footer_navigation_links_style}
        >
          Propiedades
        </Link>
        <Link
          to={urls.userProfile.path}
          className={styles.footer_navigation_links_style}
        >
          Mi cuenta
        </Link>
      </div>
      <div>
        <h3 className={styles.footer_navigation_title}>Contacto</h3>
        <p>
          Puede contactarnos al email ubicar.austral2021@gmail.com para
          cualquier consulta
        </p>
      </div>
    </div>
  );
}
