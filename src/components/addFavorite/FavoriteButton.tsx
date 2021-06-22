import { MdStar, MdStarBorder } from "react-icons/all";
import { useLikePropertyUsingPUT, useDislikePropertyUsingPUT } from "../../api";
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
