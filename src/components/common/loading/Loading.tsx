import { CSSProperties } from "react";
import { ImSpinner9 } from "react-icons/im";
import styles from "./Loading.module.scss";

type LoadingProps = {
  additionalStyle?: CSSProperties;
};

export const Loading = ({ additionalStyle }: LoadingProps) => {
  return (
    <div className={styles.container}>
      <ImSpinner9 className={styles.spinner} style={additionalStyle} />
    </div>
  );
};
