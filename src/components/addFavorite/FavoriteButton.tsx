import { MdStar, MdStarBorder } from "react-icons/all";
import { useLikePropertyUsingPUT, useDislikePropertyUsingPUT } from "../../api";
import styles from "./FavoriteButton.module.scss";
import { useQueryClient } from "react-query";
import { getGetPropertyUsingGETQueryKey } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.success(" ✅ Propiedad guardada en favoritos!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      },
      onError() {
        toast.error(
          " ❌ Error durante el guardado de propiedad en favoritos!",
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
      },
    },
  });
  const { mutate: dislikeProperty } = useDislikePropertyUsingPUT({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries(getGetPropertyUsingGETQueryKey(id));
        toast.success(" ✅ Propiedad borrada de favoritos!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      },
      onError() {
        toast.error(" ❌ Error en el borrado de favoritos!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      },
    },
  });

  return (
    <>
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
    </>
  );
}
