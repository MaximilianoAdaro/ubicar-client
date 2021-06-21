import styles from "./Photos.module.scss";

export const Photos = () => {
  return (
    <div>
      <div className={styles.container}>
        <h4>Fotos</h4>
        <div className={styles.comingSoon}>
          <h3>Proximamente...</h3>
        </div>
      </div>
    </div>
  );
};
