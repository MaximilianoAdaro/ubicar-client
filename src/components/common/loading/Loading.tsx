import { ImSpinner9 } from "react-icons/im";
import styles from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles.container}>
      <ImSpinner9 className={styles.spinner} />
    </div>
  );
};
