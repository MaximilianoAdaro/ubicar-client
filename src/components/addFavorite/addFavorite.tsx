import { MdStarBorder } from "react-icons/all";
import { useLikePropertyUsingPUT } from "../../api/generated/property-user-controller/property-user-controller";
import styles from "./addFavorite.module.scss";

type AddFavoriteProps = {
  id: string;
};

export function AddFavorite({ id }: AddFavoriteProps) {
  const { mutate: likeProperty } = useLikePropertyUsingPUT();
  // const { mutate: dislikeProperty } = useDislikePropertyUsingPUT();

  return (
    <div className={styles.iconContainer} onClick={() => likeProperty({ id })}>
      <MdStarBorder className={styles.icon} />
    </div>
  );
}
