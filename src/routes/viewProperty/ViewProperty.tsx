import { useParams } from "react-router-dom";
import styles from "./ViewProperty.module.scss";
import { Typography } from "@material-ui/core";
import { TabsBar } from "../../components/common/tabsBar/TabsBar";
import { ReactNode, Suspense, useState } from "react";
import pluralize from "pluralize";
import {
  buildTabs,
  CharacterContainerTab,
  CharacteristicsItems,
  getYearDistance,
  translateCondition,
} from "./viewPropertyUtils";
import { AddressDTO, UserDTO } from "../../api";
import { formatPrice } from "../../utils/utils";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { errorMessages } from "../../constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { HookFormTextField } from "../../components/common/forms/HookFormTextField";
import { RoundedButton } from "../../components/common/buttons/RoundedButton";
import { Loading } from "../../components/common/loading/Loading";
import { FcHome } from "react-icons/all";
import { FavoriteButton } from "../../components/addFavorite/FavoriteButton";
import surfaceIcon from "../../assets/surfaceIcon.png";
import bathroomIcon from "../../assets/bathroomIcon.svg";
import toiletIcon from "../../assets/toiletIcon.svg";
import roomIcon from "../../assets/roomIcon.svg";
import {
  useGetLoggedUsingGET,
  useGetPropertyUsingGET,
  useContactPropertyOwnerUsingPOST,
} from "../../api";
import { toast } from "react-toastify";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { photos } from "./photos";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
}));

export const ViewProperty = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Suspense fallback={<Loading />}>
      <View id={id} />
    </Suspense>
  );
};

type ViewProps = {
  id: string;
};

const View = ({ id }: ViewProps) => {
  const classes = useStyles();
  // const [currentImage, setCurrentImage] = useState(0);
  // const [viewerIsOpen, setViewerIsOpen] = useState(false);
  // const[images,setImages] = useState([])
  const { data: currentUser } = useGetLoggedUsingGET();
  const { data: property } = useGetPropertyUsingGET(id, {
    query: {
      suspense: true,
    },
  });

  // const openPhotos = () => {
  //   setViewerIsOpen(true);
  // };
  //
  // const close = () => {
  //   setViewerIsOpen(false);
  // };

  if (!property) return <h4>Error</h4>;

  const characteristicsTabs = buildTabs(
    property.amenities,
    property.materials,
    property.security
  );

  const streetCity = `${property.address!.street} ${property.address!.number} ${
    property.address!.city
  }               `;

  return (
    <div className={styles.container}>
      {/*<div className={styles.mediaContainer}>*/}
      {/*  <img src="https://timberhavenloghomes.com/wp-content/uploads/2017/07/Barth-Log-Home-Greatroom-1030x687.jpg" />*/}
      {/*  <div>*/}
      {/*    <img src="https://media.architecturaldigest.com/photos/58f7cf1a8bfbf566da78acc2/master/pass/IShvzncvwa127j0000000000.jpg" />*/}
      {/*    <img src="https://shawhomes.com/wp-content/uploads/Exterior-Twilight-2-Shaw-Homes-12801-S.-Date-Street-Jenks-OK-Yorktown.jpg" />*/}
      {/*    <img src="https://www.maids.com/cleaning-hacks/wp-content/uploads/2018/01/Entire2-house-featured.jpg" />*/}
      {/*    <img src="https://media.architecturaldigest.com/photos/59382d7a3176b35c589a6af3/master/pass/adelman-house-frank-lloyd-wright-03.jpg" />*/}
      {/*    <img src="https://cdn.architecturendesign.net/wp-content/uploads/2014/07/House-in-Gorki-08.jpg" />*/}
      {/*    <img src="http://www.passivehousecanada.com/wp-content/uploads/2016/05/Alta-Lake-Passive-House-1024x637.jpg" />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {property.images.length < 1 ? (
        <div className={styles.mediaContainer}>
          <img src="https://timberhavenloghomes.com/wp-content/uploads/2017/07/Barth-Log-Home-Greatroom-1030x687.jpg" />
          <div>
            <img src="https://media.architecturaldigest.com/photos/58f7cf1a8bfbf566da78acc2/master/pass/IShvzncvwa127j0000000000.jpg" />
            <img src="https://shawhomes.com/wp-content/uploads/Exterior-Twilight-2-Shaw-Homes-12801-S.-Date-Street-Jenks-OK-Yorktown.jpg" />
            <img src="https://www.maids.com/cleaning-hacks/wp-content/uploads/2018/01/Entire2-house-featured.jpg" />
            <img src="https://media.architecturaldigest.com/photos/59382d7a3176b35c589a6af3/master/pass/adelman-house-frank-lloyd-wright-03.jpg" />
            <img src="https://cdn.architecturendesign.net/wp-content/uploads/2014/07/House-in-Gorki-08.jpg" />
            <img src="http://www.passivehousecanada.com/wp-content/uploads/2016/05/Alta-Lake-Passive-House-1024x637.jpg" />
          </div>
        </div>
      ) : (
        <div className={classes.root}>
          <ImageList className={classes.imageList} cols={5}>
            {property.images.map((imageId) => (
              <ImageListItem key={imageId}>
                <img
                  src={`http://localhost:8080/public/image/${imageId}`}
                  alt={imageId}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      )}

      {/*<div>*/}
      {/*<div>*/}
      {/*  <div className={classes.root}>*/}
      {/*    <ImageList className={classes.imageList} cols={5}>*/}
      {/*      {property.images.map((imageId) => (*/}
      {/*        <ImageListItem key={imageId} onClick={openPhotos}>*/}
      {/*          <img src={`http://localhost:8080/public/image/${imageId}`} alt={imageId} />*/}
      {/*        </ImageListItem>*/}
      {/*      ))}*/}
      {/*    </ImageList>*/}
      {/*  </div>*/}
      {/*<ModalGateway>*/}
      {/*  {viewerIsOpen ? (*/}
      {/*    <Modal onClose={close}>*/}
      {/*      <Carousel views={property.images} />*/}
      {/*    </Modal>*/}
      {/*  ) : null}*/}
      {/*</ModalGateway>*/}
      {/*</div>*/}
      <div className={styles.infoContainer}>
        <div className={styles.leftInfo}>
          <div className={styles.divider} />
          <div className={styles.firstSection}>
            <div className={styles.titleSection}>
              <Typography variant={"h5"} className={styles.mainTitle}>
                {streetCity.toLowerCase()}
              </Typography>
              {currentUser && (
                <FavoriteButton id={id} isLiked={property.liked} />
              )}
              {/*<Link to={urls.editProperty.byId(id)}>*/}
              {/*  <Button*/}
              {/*    variant={"outlined"}*/}
              {/*    style={{*/}
              {/*      marginLeft: "1em",*/}
              {/*      textTransform: "none",*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    Editar Propiedad*/}
              {/*  </Button>*/}
              {/*</Link>*/}
            </div>
            <span className={styles.subtitle}>{property.type}</span>
            <div className={styles.facts}>
              {makeFact("Estilo", property.style!.label, true, <FcHome />)}
              {makeFact(
                "Total",
                `${property.squareFoot}m²`,
                false,
                <img src={surfaceIcon} alt="surface icon" />
              )}
              {makeFact("Cubierta", `${property.coveredSquareFoot}m²`, false)}
              {makeFact(
                pluralize("Ambiente", property.environments),
                `${property.environments}`,
                false
              )}
              {makeFact(
                pluralize("Baño", property.fullBaths),
                `${property.fullBaths}`,
                false,
                <img src={bathroomIcon} alt="bathroom icon" />
              )}
              {makeFact(
                pluralize("Toilets", property.toilets),
                `${property.toilets}`,
                false,
                <img src={toiletIcon} alt="toilet icon" />
              )}
              {makeFact(
                pluralize("Piso", property.levels),
                `${property.levels}`,
                false
              )}
              {makeFact(
                pluralize("Cuarto", property.rooms),
                `${property.rooms}`,
                false,
                <img src={roomIcon} alt="toilet icon" />
              )}
              {makeFact(
                `${pluralize(
                  "Año",
                  getYearDistance(property.constructionDate!)
                )} de
                antiguedad`,
                `${getYearDistance(property.constructionDate!)}`,
                false
              )}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.secondSection}>
            <h4 className={styles.sectionTitle}>{property.title}</h4>
            <div className={styles.body}>
              <div>
                <span>{property.comments}</span>
              </div>
              {property.parkDescription!.length !== 0 && (
                <div className={styles.parkDescription}>
                  <h6>Descripcion del parque</h6>
                  <span>{property.parkDescription}</span>
                </div>
              )}
            </div>
          </div>

          {characteristicsTabs.length > 0 && (
            <div>
              <div className={styles.divider} />
              <div className={styles.thirdSection}>
                <CharacteristicsContainer tabs={characteristicsTabs} />
              </div>
            </div>
          )}

          <div className={styles.divider} />
          <div className={styles.addressSection}>
            <AddressSection address={property.address!} />
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.priceInfo}>
            <div className={styles.priceSection}>
              <h2 className={styles.condition}>
                {translateCondition(property.condition)}
              </h2>
              <h3 className={styles.price}>
                <span className={styles.priceSymbol}>$</span>{" "}
                <span className={styles.priceColor}>
                  {formatPrice(property.price)}
                </span>
              </h3>
              <div className={styles.expenses}>
                <span>Expensas </span>{" "}
                <div>
                  <span className={styles.priceSymbol}>$</span>
                  <span className={styles.priceColor}>
                    {formatPrice(property.expenses!)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ContactSection id={id} />
        </div>
      </div>
    </div>
  );
};

const makeFact = (
  keyWord: string,
  value: string,
  left: boolean,
  icon?: ReactNode
) => (
  <div className={styles.factContainer}>
    <div className={styles.factIcon}>{icon}</div>
    <div>
      {left && <span className={styles.factKeyWord}>{keyWord}</span>}
      {left && " "}
      <span className={styles.factValue}>{value}</span>{" "}
      {!left && <span className={styles.factKeyWord}>{keyWord}</span>}
    </div>
  </div>
);

interface CharacteristicsContainerProps {
  tabs: CharacterContainerTab[];
}

const CharacteristicsContainer = ({ tabs }: CharacteristicsContainerProps) => {
  const [currentBarItem, setCurrentBarItem] = useState(tabs[0]);
  return (
    <div>
      <h4 className={styles.sectionTitle}>Caracteristicas</h4>
      <div className={styles.tabSection}>
        <TabsBar
          items={tabs}
          current={currentBarItem.value}
          onClick={(tabBarItem) => {
            const tab =
              tabs.find((tab) => tab.value === tabBarItem.value) ?? tabs[0];
            setCurrentBarItem(tab);
          }}
          additionalClasses={{
            container: styles.tabsBarContainerAdditional,
          }}
        />
        <div className={styles.characteristicsItemsContainer}>
          <CharacteristicsTab items={currentBarItem.data} />
        </div>
      </div>
    </div>
  );
};

interface CharacteristicsTabProps {
  items: CharacteristicsItems;
}

const CharacteristicsTab = ({ items }: CharacteristicsTabProps) => {
  return (
    <>
      {items.map(({ value, displayName }) => (
        <div key={value} className={styles.tabBodyItem}>
          <div className={styles.bulletPoint} />
          <span>{displayName}</span>
        </div>
      ))}
    </>
  );
};

interface AddressSectionProps {
  address: AddressDTO;
}

const AddressSection = ({ address }: AddressSectionProps) => {
  return (
    <div>
      <h4 className={styles.sectionTitle}>Direccion</h4>
      <div className={styles.addressItemsSection}>
        <table>
          <tbody>
            {getAddressItem("Provincia", address.state!)}
            {getAddressItem("Localidad", address.city!)}
            {getAddressItem("Calle", address.street)}
            {getAddressItem("Numero", address.number.toString())}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getAddressItem = (name: string, value: string) => {
  return (
    <tr>
      <td>
        <h5 style={{ textTransform: "capitalize" }}>{name}: </h5>
      </td>
      <td>
        <span>{value.toLowerCase()}</span>
      </td>
    </tr>
  );
};

const schema = yup.object({
  name: yup.string().required(errorMessages.required),
  email: yup.string().required(errorMessages.required),
  cellphone: yup.string(),
  message: yup.string().required(errorMessages.required),
});

type ContactForm = yup.InferType<typeof schema>;

type ContactSectionProps = {
  id: string;
};

const defaultContactValues = (user: UserDTO | undefined): ContactForm => ({
  name: user?.userName ?? "",
  email: user?.email ?? "",
  cellphone: "",
  message: "",
});

const ContactSection = ({ id }: ContactSectionProps) => {
  const { data: currentUser } = useGetLoggedUsingGET();

  const { control, handleSubmit, reset, getValues } = useForm<ContactForm>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: defaultContactValues(currentUser),
  });

  const { mutate: sendMessage, isLoading } = useContactPropertyOwnerUsingPOST({
    mutation: {
      onSuccess() {
        reset({
          ...getValues(),
          message: "",
        });
        toast.success(" ✅ Se ha enviado al dueño de la propiedad!", {
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
        toast.error(" ❌ Error enviando los datos al dueño de la propiedad!", {
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

  const onSubmit = handleSubmit((data) => {
    sendMessage({
      id,
      data: {
        ...data,
        cellphone: data.cellphone ?? "",
      },
    });
  });

  return (
    <div className={styles.contactSection}>
      <div>
        <h5 className={styles.contactFormTitle}>Escribir un mensaje</h5>
      </div>
      <div className={styles.contactForm}>
        <form onSubmit={onSubmit}>
          <div className={styles.contactInputContainer}>
            <HookFormTextField
              label={"Nombre"}
              name={"name"}
              control={control}
              additionalStyles={{
                borderRadius: "10px",
              }}
            />
          </div>
          <div className={styles.contactInputContainer}>
            <HookFormTextField
              label={"Email"}
              name={"email"}
              control={control}
              additionalStyles={{
                borderRadius: "10px",
              }}
            />
          </div>
          <div className={styles.contactInputContainer}>
            <HookFormTextField
              label={"Telefono (opcional)"}
              name={"cellphone"}
              control={control}
              additionalStyles={{
                borderRadius: "10px",
              }}
            />
          </div>
          <div className={styles.contactInputContainer}>
            <HookFormTextField
              label={"Mensaje"}
              name={"message"}
              control={control}
              multiline
              rows={4}
              additionalStyles={{
                borderRadius: "10px",
              }}
            />
          </div>
          <div>
            <RoundedButton
              className={styles.submitButton}
              type={"submit"}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loading additionalStyle={{ fontSize: 20, color: "blue" }} />
              ) : (
                "Enviar"
              )}
            </RoundedButton>
          </div>
        </form>
      </div>
    </div>
  );
};
