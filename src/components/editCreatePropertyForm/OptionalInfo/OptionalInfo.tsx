import { actions, useAppDispatch, useAppSelector } from "../../../store";
import { CheckInputList } from "../../forms/CheckInputList";
import { Step } from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import styles from "./OptionalInfo.module.scss";
import { StepButtons } from "../StepButtons/StepButtons";
import {
  useGetAmenitiesUsingGET,
  useGetSecuritiesUsingGET,
  useGetMaterialsUsingGET,
} from "../../../api";
import { Grid } from "@material-ui/core";

export const OptionalInfo = () => {
  const defaults = useAppSelector(
    ({ editPropertyForm: { amenities, securities, materials } }) => ({
      amenities,
      securities,
      materials,
    })
  );
  const dispatch = useAppDispatch();

  const { data: amenities } = useGetAmenitiesUsingGET();
  const { data: securities } = useGetSecuritiesUsingGET();
  const { data: materials } = useGetMaterialsUsingGET();

  const handleClick = () => {
    dispatch(actions.editPropertyForm.setStep(Step.Multimedia));
  };

  const handlePreviousButton = () => {
    dispatch(actions.editPropertyForm.setStep(Step.Characteristics));
  };

  const canSave = async () => {
    return true;
  };

  return (
    <Grid className={styles.optional_info_container}>
      <Grid container>
        <Grid xs={6} xl={7}>
          <h3>Seleccioná los servicios que ofrece tu propiedad</h3>
          <div className={styles.checkContainer}>
            {amenities && (
              <CheckInputList
                items={amenities}
                onCheck={(id) =>
                  dispatch(actions.editPropertyForm.addAmenity(id))
                }
                onUncheck={(id) =>
                  dispatch(actions.editPropertyForm.removeAmenity(id))
                }
                defaultValues={defaults.amenities}
              />
            )}
          </div>
        </Grid>
        <Grid xs={1} xl={1} />
        <Grid xs={5} xl={4}>
          <Grid>
            <div>
              <h3>Medidas de seguridad</h3>
              <div className={styles.checkContainer}>
                {securities && (
                  <CheckInputList
                    items={securities}
                    onCheck={(id) =>
                      dispatch(actions.editPropertyForm.addSecurity(id))
                    }
                    onUncheck={(id) =>
                      dispatch(actions.editPropertyForm.removeSecurity(id))
                    }
                    defaultValues={defaults.securities}
                  />
                )}
              </div>
            </div>
          </Grid>
          <Grid>
            <div className={styles.constructionContainer}>
              <h3>Materiales de construccion</h3>
              <div className={styles.checkContainer}>
                {materials && (
                  <CheckInputList
                    items={materials}
                    onCheck={(id) =>
                      dispatch(actions.editPropertyForm.addMaterial(id))
                    }
                    onUncheck={(id) =>
                      dispatch(actions.editPropertyForm.removeMaterial(id))
                    }
                    defaultValues={defaults.materials}
                  />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <StepButtons
        type={"submit"}
        onNext={handleClick}
        onPrevious={handlePreviousButton}
        canPartialSave={canSave}
      />
    </Grid>
  );
};
