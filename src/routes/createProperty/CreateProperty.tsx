import { Container } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { BasicInfo } from "../../components/createPropertyForm/basicInfo/BasicInfo";
import { ErrorPage } from "../../components/ErrorPage";
import { Address } from "./Address";
import { Characteristics } from "./Characteristics";

export const CreateProperty = () => {
  const { path } = useRouteMatch(); // in this case it will be /create-property

  return (
    <Container>
      <h1>Publicar una propiedad</h1>

      <Switch>
        <Route exact path={`${path}/basicInfo`} component={BasicInfo} />
        <Route exact path={`${path}/address`} component={Address} />
        <Route
          exact
          path={`${path}/characteristics`}
          component={Characteristics}
        />
        <Route component={ErrorPage} />
      </Switch>
    </Container>
  );
};
