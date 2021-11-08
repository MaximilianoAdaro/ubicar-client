import { useParams } from "react-router-dom";
import styles from "./ViewPropertyMobile.module.scss";
import React, { Suspense, useState } from "react";
import pluralize from "pluralize";
import ChatIcon from "@mui/icons-material/Chat";
import {
  AddressDTO,
  useContactPropertyOwnerUsingPOST,
  useGetLoggedUsingGET,
  useGetPropertyUsingGET,
  useGetSelectedTagsUsingGET,
  UserDTO,
} from "../../api";
import { formatPrice } from "../../utils/utils";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { errorMessages } from "../../constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { HookFormTextField } from "../../components/common/forms/HookFormTextField";
import { Loading } from "../../components/common/loading/Loading";
import { toast } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { photos } from "./photos";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Fab from "@mui/material/Fab";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  buildTabs,
  CharacterContainerTab,
  CharacteristicsItems,
} from "./viewPropertyUtils";
import { TabsBar } from "../../components/common/tabsBar/TabsBar";
import { FavoriteButton } from "../../components/addFavorite/FavoriteButton";
import MultipleSelectChipMobile from "../../components/UserProfile/TagsMobile";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

export const ViewPropertyMobile = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Suspense fallback={<Loading />}>
      <ViewMobile id={id} />
    </Suspense>
  );
};

export const ViewMobile = ({ id }: ViewProps) => {
  // const { data: currentUser } = useGetLoggedUsingGET();
  const { data: property } = useGetPropertyUsingGET(id, {
    query: {
      suspense: true,
    },
  });

  if (!property) return <h4>Error</h4>;

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
  const [open, setOpen] = React.useState(false);
  const { data: currentUser } = useGetLoggedUsingGET();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const [currentImage, setCurrentImage] = useState(0);
  // const [viewerIsOpen, setViewerIsOpen] = useState(false);
  // const[images,setImages] = useState([])
  // const { data: currentUser } = useGetLoggedUsingGET();
  const { data: property } = useGetPropertyUsingGET(id, {
    query: {
      suspense: true,
    },
  });

  const { data: selected } = useGetSelectedTagsUsingGET(id, {
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

  const baths = pluralize("baño", property.fullBaths);
  const environments = pluralize("amb", property.environments);
  const houseAddress = property.address;
  const stateCity =
    houseAddress?.city && houseAddress.state
      ? `${houseAddress?.city}, ${houseAddress.state}`
      : "";
  const houseStreetNumber = `${houseAddress?.street ?? ""} ${
    houseAddress?.number ?? ""
  }`;

  return (
    <Grid className={styles.view_property_container}>
      <Grid container>
        <Grid xs={11}>
          <h4 style={{ fontSize: "1.6em" }}>{property.title}</h4>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "0.5em" }}>
        <Grid
          style={{ marginBottom: "1em", borderRight: "2px dashed #ff701f" }}
          xs={7}
        >
          <h4 style={{ marginBottom: "0" }}>
            {property.condition === "SALE" ? "Venta" : "Alquiler"}
          </h4>
          U$D&nbsp;&nbsp;
          <span className={styles.view_property_price}>
            {formatPrice(property.price)}
          </span>
        </Grid>
        <Grid xs style={{ marginLeft: "1.5em" }}>
          <h5>Expensas</h5>
          $&nbsp;&nbsp;
          <span className={styles.view_property_expenses}>
            {formatPrice(property.expenses!)}
          </span>
        </Grid>
      </Grid>
      <Grid container className={styles.view_property_info}>
        <Grid className={styles.view_property_characteristics} xs>
          {property.squareFoot} m² Total
        </Grid>
        <Grid className={styles.view_property_characteristics} xs>
          {property.coveredSquareFoot} m² Cub.
        </Grid>
        <Grid className={styles.view_property_characteristics} xs={3}>
          {property.environments} {environments}.
        </Grid>
        <Grid className={styles.view_property_characteristics} xs={2}>
          {property.fullBaths} {baths}
        </Grid>
      </Grid>
      <Grid className={styles.photos_container}>
        <div className={classes.root}>
          <ImageList className={classes.imageList} cols={2.2}>
            {photos.map((image) => (
              <ImageListItem key={1}>
                <img src={image.src} alt={"Foto de la casa"} />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </Grid>

      <Grid className={styles.view_property_property_comment}>
        <Grid container>
          <Grid xs={10}>
            <h5
              className={styles.view_property_address_title}
              style={{ marginBottom: "0", fontSize: "1.4em" }}
            >
              {stateCity.toLowerCase()}
            </h5>
            <Grid container>
              <h5 className={styles.view_property_address_title}>
                {houseStreetNumber}
              </h5>
              <LocationOnIcon
                style={{
                  fontSize: "1.4em",
                  color: "#ff4000",
                  marginLeft: "0.5em",
                }}
              />
            </Grid>
          </Grid>
          <Grid style={{ alignItems: "center" }} xs={2}>
            {currentUser && <FavoriteButton id={id} isLiked={property.liked} />}
          </Grid>
        </Grid>
        <span>
          {property.comments?.length < 2
            ? "Impecable departamento de 1 ambiente con balcon a la calle, cocina integrada, agua caliente individual, baño completo con box de ducha / Ubicado a pocas cuadras de la estación San Pedrito (Subte A), y en esquina sobre la Av. 5 años de antigüedad.\n" +
              "Directorio con múltiples lineas de transporte / OPORTUNIDD DE INVERSOR - IDEAL RENTA! /"
            : property.comments}
        </span>
      </Grid>
      <div style={{ marginBottom: "0.5em" }}>
        {currentUser && property.liked && (
          <MultipleSelectChipMobile id={id} selected={selected} />
        )}
      </div>
      <Grid>
        {characteristicsTabs.length > 0 && (
          <div>
            <div className={styles.thirdSection}>
              <CharacteristicsContainer tabs={characteristicsTabs} />
            </div>
          </div>
        )}
      </Grid>
      <Grid className={styles.addressSection}>
        <AddressSection address={property.address!} />
      </Grid>
      <div>
        <Fab
          style={{
            backgroundColor: "#ff701f",
            color: "white",
            top: "auto",
            right: 20,
            bottom: 20,
            left: "auto",
            position: "fixed",
          }}
          aria-label="add"
          onClick={handleClickOpen}
          size={"medium"}
        >
          <ChatIcon fontSize={"medium"} />
        </Fab>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <ContactSection id={id} />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </Grid>
  );
};

interface CharacteristicsContainerProps {
  tabs: CharacterContainerTab[];
}

const CharacteristicsContainer = ({ tabs }: CharacteristicsContainerProps) => {
  const [currentBarItem, setCurrentBarItem] = useState(tabs[0]);
  return (
    <Grid>
      {/*<h4 className={styles.sectionTitle}>Caracteristicas</h4>*/}
      <Grid className={styles.tabSection} xs>
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
      </Grid>
    </Grid>
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
          <span className={styles.characteristics_names}>{displayName}</span>
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
      <h4 className={styles.sectionTitle}>Ubicación</h4>
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
        <h6 style={{ textTransform: "capitalize" }}>{name}: </h6>
      </td>
      <td>
        <span
          className={styles.address_value}
          style={{ textTransform: "capitalize" }}
        >
          {value.toLowerCase()}
        </span>
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
        <h3 className={styles.contactFormTitle}>Escribir un mensaje</h3>
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
            <Button
              style={{
                background: "#ff701f",
                width: "100%",
                color: "white",
                borderRadius: "5px",
              }}
            >
              {isLoading ? (
                <Loading additionalStyle={{ fontSize: 20, color: "blue" }} />
              ) : (
                "Enviar"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
