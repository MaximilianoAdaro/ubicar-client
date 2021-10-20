import { CustomForm } from "../../forms/customForm/CustomForm";
import { useCustomForm } from "../../../hooks/useCustomForm";
import * as yup from "yup";
import { Form } from "react-bootstrap";
import { createCustomTextInput } from "../../forms/customForm/TextInput";
import { RadioOption } from "../../forms/ComposedRadioInput";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import {
  selectOperationType,
  Step,
} from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import styles from "./BasicInfo.module.scss";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { StepButtons } from "../StepButtons/StepButtons";
import {
  useGetTypesUsingGET,
  PropertyDTOCondition,
  PropertyType,
} from "../../../api";
import { errorMessages } from "../../../constants";
import {
  createStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const schema = yup.object({
  price: yup
    .number()
    .typeError(errorMessages.number)
    .positive(errorMessages.positiveNumber)
    .required(errorMessages.required),
  expenses: yup
    .number()
    .typeError(errorMessages.number)
    .positive(errorMessages.positiveNumber)
    .required(errorMessages.required),
  title: yup.string().required(errorMessages.required),
});

export type BasicInfoFormData = {
  price: number | undefined;
  expenses: number | undefined;
  title: string;
};

const BasicInfoTextInput = createCustomTextInput<BasicInfoFormData>();

type propertyInfo = {
  title: string | undefined;
  price: number | undefined;
  expenses: number | undefined;
  type: PropertyType | undefined;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflow: "auto",
      maxHeight: "23em",
      borderRadius: "15px",
      marginTop: "1em",
    },
    listSection: {
      backgroundColor: "inherit",
    },
    ul: {
      backgroundColor: "inherit",
      padding: 0,
    },
  })
);

export const BasicInfo = (propertyInfo: propertyInfo) => {
  const classes = useStyles();
  const defaults = useAppSelector(
    ({ editPropertyForm: { basicInfo, propertyType } }) => ({
      ...basicInfo,
      type: propertyType,
    })
  );

  const dispatch = useAppDispatch();

  const { data: types } = useGetTypesUsingGET();

  useEffect(() => {
    if (defaults.type === undefined && types?.[0] !== undefined) {
      dispatch(actions.editPropertyForm.setPropertyType(types[0]));
    }
  }, [defaults.type, types, dispatch]);

  const customForm = useCustomForm<BasicInfoFormData>({
    schema,
    onSubmit: (data) => {
      dispatch(actions.editPropertyForm.setBasicInfo(data));
      dispatch(actions.editPropertyForm.setStep(Step.Address));
    },
  });

  const canSave = async () => {
    const isValidToSave = await customForm.methods.trigger();
    if (isValidToSave) {
      const data = customForm.methods.getValues();
      dispatch(actions.editPropertyForm.setBasicInfo(data));
    }
    return isValidToSave;
  };

  const listSetPropertyType = (type: PropertyType) => {
    dispatch(actions.editPropertyForm.setPropertyType(type));
  };

  return (
    <Grid className={styles.basic_info_container}>
      <CustomForm {...customForm}>
        <Grid container className={styles.basic_info_containerinside}>
          <Grid xl={4} xs={5}>
            <h3 className={styles.basic_info_titles}>Tipo de operación</h3>

            <Grid className={styles.basic_info_buttons}>
              <OperationTypeRadio />
            </Grid>
            <Grid>
              <Grid className={styles.basic_info_operation_type}>
                <Grid>
                  <BasicInfoTextInput
                    name="title"
                    // label="Titulo"
                    placeholder={"Increible casa en la playa..."}
                    defaultValue={
                      propertyInfo.title ? propertyInfo.title : defaults.title
                    }
                  />
                  <span className={styles.basic_info_input_description}>
                    Título*
                  </span>
                </Grid>
                <Grid>
                  <BasicInfoTextInput
                    name="price"
                    // label="Precio"
                    defaultValue={
                      propertyInfo.price
                        ? propertyInfo.price.toString()
                        : defaults.price?.toString()
                    }
                    frontSymbol="USD"
                  />
                  <span className={styles.basic_info_input_description}>
                    Precio*
                  </span>
                </Grid>
                <Grid>
                  <BasicInfoTextInput
                    name="expenses"
                    // label="Expensas"
                    defaultValue={
                      propertyInfo.expenses
                        ? propertyInfo.expenses.toString()
                        : defaults.expenses?.toString()
                    }
                    frontSymbol="USD"
                  />
                  <span className={styles.basic_info_input_description}>
                    Expensas*
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid xl xs />
          <Grid xl={3} xs={4}>
            <h3 className={styles.basic_info_titles}>Tipo de inmueble</h3>
            <div>
              <TextField
                value={propertyInfo.type ? propertyInfo.type : defaults.type}
                fullWidth
                disabled
                variant="outlined"
                className={styles.textfield}
              />
              <List className={classes.root}>
                {types &&
                  types.map((type) => (
                    <ListItem
                      className={styles.property_type_list_item}
                      onClick={() => listSetPropertyType(type)}
                    >
                      <ListItemText>{type}</ListItemText>
                    </ListItem>
                  ))}
              </List>
            </div>
          </Grid>
          <Grid xl={2} xs={1} />
        </Grid>
        <Form.Row>
          <StepButtons
            type={"submit"}
            showPrevious={false}
            canPartialSave={canSave}
          />
        </Form.Row>
      </CustomForm>
    </Grid>
  );
};

const operationTypes: RadioOption[] = [
  {
    value: PropertyDTOCondition.SALE,
    displayName: "Venta",
  },
  {
    value: PropertyDTOCondition.RENT,
    displayName: "Alquiler",
  },
];

const OperationTypeRadio = () => {
  const defaultOperationType = useAppSelector(selectOperationType);
  const [currentValue, setCurrentValue] = useState(defaultOperationType);
  const dispatch = useAppDispatch();

  const handleSelect = (value: string) => {
    setCurrentValue(value);
    dispatch(actions.editPropertyForm.setOperationType(value));
  };
  return (
    <div className={styles.itemContainer}>
      {operationTypes.map(({ displayName, value }) => (
        <Grid
          key={value}
          className={clsx(
            styles.highlighter,
            styles.item,
            {
              [styles.active]: value === currentValue,
            },
            styles.basic_info_buttons
          )}
          onClick={() => handleSelect(value)}
          xs
        >
          <span className={styles.border}>{displayName}</span>
        </Grid>
      ))}
    </div>
  );
};
