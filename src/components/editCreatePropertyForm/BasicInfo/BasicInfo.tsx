import { CustomForm } from "../../forms/customForm/CustomForm";
import { useCustomForm } from "../../../hooks/useCustomForm";
import * as yup from "yup";
import { Col, Container, Form } from "react-bootstrap";
import { createCustomTextInput } from "../../forms/customForm/TextInput";
import { RadioOption } from "../../forms/ComposedRadioInput";
import { actions, useAppDispatch, useAppSelector } from "../../../store";
import {
  selectOperationType,
  Step,
} from "../../../store/slices/editCreatePropertyForm/editCreatePropertyFormSlice";
import { RadioInput } from "../../forms/RadioInput";
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
  Button,
  createStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Theme,
} from "@material-ui/core";
import { ListingHouse } from "../../listingHouse";
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
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflow: "auto",
      maxHeight: 300,
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
  const [propertyType, setPropertyType] = useState(propertyInfo.type);
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
  const handleClick = (type: any) => {
    setPropertyType(type);
    dispatch(actions.editPropertyForm.setPropertyType(type));
  };

  return (
    <Grid className={styles.basic_info_container}>
      <CustomForm {...customForm}>
        <Grid container>
          <Grid xl={4} xs={5}>
            <h3 className={styles.basic_info_titles}>Tipo de operación</h3>
            <Grid className={styles.basic_info_buttons}>
              <OperationTypeRadio />
            </Grid>
            <Grid className={styles.basic_info_operation_type}>
              <Grid>
                <BasicInfoTextInput
                  name="title"
                  label="Titulo"
                  placeholder={"Increible casa en la playa..."}
                  defaultValue={
                    propertyInfo.title ? propertyInfo.title : defaults.title
                  }
                />
              </Grid>
              <Grid>
                <BasicInfoTextInput
                  name="price"
                  label="Precio"
                  defaultValue={
                    propertyInfo.price
                      ? propertyInfo.price.toString()
                      : defaults.price?.toString()
                  }
                  frontSymbol="$"
                />
              </Grid>
              <Grid>
                <BasicInfoTextInput
                  name="expenses"
                  label="Expensas"
                  defaultValue={
                    propertyInfo.expenses
                      ? propertyInfo.expenses.toString()
                      : defaults.expenses?.toString()
                  }
                  frontSymbol="$"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid lg />
          <Grid lg={4}>
            <h3 className={styles.basic_info_titles}>Tipo de inmueble</h3>
            {/*<div className={styles.typeContainer}>*/}
            {/*  {types && (*/}
            {/*      <RadioInput*/}
            {/*          items={types}*/}
            {/*          name={"propertyType"}*/}
            {/*          onSelected={(label) => {*/}
            {/*            if (types)*/}
            {/*              dispatch(*/}
            {/*                  actions.editPropertyForm.setPropertyType(label)*/}
            {/*              );*/}
            {/*          }}*/}
            {/*          defaultValue={*/}
            {/*            propertyInfo.type ? propertyInfo.type : defaults.type*/}
            {/*          }*/}
            {/*      />*/}
            {/*  )}*/}
            {/*</div>*/}
            <div>
              <TextField
                value={propertyType}
                fullWidth
                disabled
                className={styles.textfield}
              />
              <List className={classes.root}>
                {types &&
                  types.map((type) => (
                    <ListItem
                      className={styles.listitem}
                      onClick={() => handleClick(type)}
                    >
                      <ListItemText>{type}</ListItemText>
                    </ListItem>
                  ))}
              </List>
            </div>
          </Grid>
          <Grid lg={1} />
        </Grid>
        {/*<Form.Row>*/}
        {/*  <Col>*/}
        {/*    <div className={styles.operationTypeContainer}>*/}
        {/*      <Form.Row>*/}
        {/*        <Col>*/}
        {/*          <h3>Tipo de operacion</h3>*/}
        {/*        </Col>*/}
        {/*        <Col>*/}
        {/*          <OperationTypeRadio />*/}
        {/*        </Col>*/}
        {/*      </Form.Row>*/}
        {/*    </div>*/}
        {/*  </Col>*/}
        {/*  <Col>*/}
        {/*    <Form.Row>*/}
        {/*      <Col>*/}
        {/*        <BasicInfoTextInput*/}
        {/*          name="title"*/}
        {/*          label="Titulo"*/}
        {/*          placeholder={"Increible casa en la playa..."}*/}
        {/*          defaultValue={*/}
        {/*            propertyInfo.title ? propertyInfo.title : defaults.title*/}
        {/*          }*/}
        {/*        />*/}
        {/*      </Col>*/}
        {/*    </Form.Row>*/}
        {/*    <Form.Row>*/}
        {/*      <Col>*/}
        {/*        <Form.Row>*/}
        {/*          <Col>*/}
        {/*            <BasicInfoTextInput*/}
        {/*              name="price"*/}
        {/*              label="Precio"*/}
        {/*              defaultValue={*/}
        {/*                propertyInfo.price*/}
        {/*                  ? propertyInfo.price.toString()*/}
        {/*                  : defaults.price?.toString()*/}
        {/*              }*/}
        {/*              frontSymbol="$"*/}
        {/*            />*/}
        {/*          </Col>*/}
        {/*          <Col>*/}
        {/*            <BasicInfoTextInput*/}
        {/*              name="expenses"*/}
        {/*              label="Expensas"*/}
        {/*              defaultValue={*/}
        {/*                propertyInfo.expenses*/}
        {/*                  ? propertyInfo.expenses.toString()*/}
        {/*                  : defaults.expenses?.toString()*/}
        {/*              }*/}
        {/*              frontSymbol="$"*/}
        {/*            />*/}
        {/*          </Col>*/}
        {/*        </Form.Row>*/}
        {/*      </Col>*/}
        {/*    </Form.Row>*/}
        {/*  </Col>*/}
        {/*</Form.Row>*/}
        {/*<Form.Row>*/}
        {/*  <Col>*/}
        {/*    <Form.Row>*/}
        {/*      <Col>*/}
        {/*        <h3>Tipo de inmueble</h3>*/}
        {/*      </Col>*/}
        {/*    </Form.Row>*/}
        {/*    <Form.Row>*/}
        {/*      <Col>*/}
        {/*        <div className={styles.typeContainer}>*/}
        {/*          {types && (*/}
        {/*            <RadioInput*/}
        {/*              items={types}*/}
        {/*              name={"propertyType"}*/}
        {/*              onSelected={(label) => {*/}
        {/*                if (types)*/}
        {/*                  dispatch(*/}
        {/*                    actions.editPropertyForm.setPropertyType(label)*/}
        {/*                  );*/}
        {/*              }}*/}
        {/*              defaultValue={*/}
        {/*                propertyInfo.type ? propertyInfo.type : defaults.type*/}
        {/*              }*/}
        {/*            />*/}
        {/*          )}*/}
        {/*        </div>*/}
        {/*      </Col>*/}
        {/*    </Form.Row>*/}
        {/*  </Col>*/}
        {/*</Form.Row>*/}
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
    <>
      <div className={styles.itemContainer}>
        {operationTypes.map(({ displayName, value }) => (
          <Grid
            key={value}
            className={clsx(styles.highlighter, styles.item, {
              [styles.active]: value === currentValue,
            })}
            onClick={() => handleSelect(value)}
            xs
          >
            <span className={styles.border}>{displayName}</span>
            {/*<div*/}
            {/*  className={clsx(styles.highlighter, {*/}
            {/*    [styles.active]: value === currentValue,*/}
            {/*  })}*/}
            {/*/>*/}
          </Grid>
        ))}
      </div>
    </>
  );
};
