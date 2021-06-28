import { MdStar, MdStarBorder } from "react-icons/all";
import { useLikePropertyUsingPUT, useDislikePropertyUsingPUT } from "../../api";
import styles from "./FavoriteButton.module.scss";
import { useQueryClient } from "react-query";
import { getGetPropertyUsingGETQueryKey } from "../../api/generated/endpoints";

type FavoriteButtonProps = {
  id: string;
  isLiked: boolean;
};

export function FavoriteButton({ id, isLiked }: FavoriteButtonProps) {
  const queryClient = useQueryClient();
  const { mutate: likeProperty } = useLikePropertyUsingPUT({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries(getGetPropertyUsingGETQueryKey(id));
      },
    },
  });
  const { mutate: dislikeProperty } = useDislikePropertyUsingPUT({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries(getGetPropertyUsingGETQueryKey(id));
      },
    },
  });

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
