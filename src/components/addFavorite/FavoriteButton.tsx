import { MdStar, MdStarBorder } from "react-icons/all";
import {
  useDislikePropertyUsingPUT,
  useLikePropertyUsingPUT,
} from "../../api/generated/property-user-controller/property-user-controller";
import styles from "./FavoriteButton.module.scss";

type FavoriteButtonProps = {
  id: string;
  isLiked: boolean;
};

export function FavoriteButton({ id, isLiked }: FavoriteButtonProps) {
  const { mutate: likeProperty } = useLikePropertyUsingPUT();
  const { mutate: dislikeProperty } = useDislikePropertyUsingPUT();

  return (
    <div
      className={styles.iconContainer}
      onClick={() => {
        if (isLiked) dislikeProperty({ id });
        else likeProperty({ id });
      }}
    >
      {isLiked ? (
        <MdStar className={styles.icon} />
      ) : (
        <MdStarBorder className={styles.icon} />
      )}
    </div>
  );
}
