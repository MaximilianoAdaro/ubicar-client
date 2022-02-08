import { Route, Switch } from "react-router-dom";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "../components/common/protectedRoute/ProtectedRoute";
import { NavBar } from "../components/navbar/NavBar";
import { NotFound } from "../components/NotFound";
import { urls } from "../constants";
import {
  CreateProperty,
  ListingPage,
  LogIn,
  SignUp,
  UserProfile,
  ViewProperty,
} from "../routes";
import { actions, useAppDispatch, useAppSelector } from "../store";
import { selectRedirectPath } from "../store/slices/session";
import { Loading } from "../components/common/loading/Loading";
import { EditProperty } from "../routes/editProperty";
import { Footer } from "../components/footer/Footer";
import { useGetLoggedUsingGET, useProfileUserUsingGET } from "../api";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useWindowSize } from "../hooks/useWindowSize";
import { ListingPageMobile } from "../routes/listingPage/ListingPageMobile";
import { Home } from "../routes/home/Home";
import { ViewPropertyMobile } from "../routes/viewProperty/ViewPropertyMobile";
import { LogInMobile } from "../routes/logIn/LogInMobile";
import { SignUpMobile } from "../routes/signUp/SignUpMobile";
import { HomeMobile } from "../routes/home/mobile/HomeMobile";
import { UserProfileMobile } from "../routes/userProfile/UserProfileMobile";
import { PersonalDataMobile } from "../components/UserProfile/Mobile/PersonalDataMobile";
import { MyFavoritesMobile } from "../components/UserProfile/Mobile/MyFavoritesMobile";
import { MyPropertiesMobile } from "../components/UserProfile/Mobile/MyPropertiesMobile";
import { MyRecentlyViewedMobile } from "../components/UserProfile/Mobile/MyRecentlyViewedMobile";
import { useEffect, useRef, useState } from "react";
import { Burger, Menu } from "../components/navbar/mobile/Menu";
import { FooterMobile } from "../components/footer/mobile/FooterMobile";
import { MyOpportunitiesMobile } from "../components/UserProfile/Mobile/MyOpportunitiesMobile";
import { MyRecommendations } from "../components/UserProfile/Web/MyRecommendations";
import { MyRecommendationsMobile } from "../components/UserProfile/Mobile/MyRecommendationsMobile";
// import {UserProfileMobile} from "../routes/userProfile/UserProfileMobile";

export default function App() {
  const redirectPath = useAppSelector(selectRedirectPath);
  const dispatch = useAppDispatch();

  const size = useWindowSize();

  const { data: user, isLoading } = useGetLoggedUsingGET();

  const location = useLocation();

  const [open, setOpen] = useState(false);
  const node = useRef(null);

  useEffect(() => {
    if (location.pathname == redirectPath) {
      dispatch(actions.session.setRedirectPath(""));
    }
  }, [location.pathname, redirectPath, dispatch]);

  if (isLoading) return <Loading />;

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!user,
    authenticationPath: urls.logIn,
    redirectPath,
    setRedirectPath: (path) => dispatch(actions.session.setRedirectPath(path)),
  };

  if ((size.width ?? 0) < 770)
    return (
      <>
        <Switch>
          <Route exact path={urls.home} component={HomeMobile} />
          <Route exact path={urls.listingPage} component={ListingPageMobile} />
          <Route
            exact
            path={urls.viewProperty.path}
            component={ViewPropertyMobile}
          />
          <Route exact path={urls.logIn} component={LogInMobile} />
          <Route exact path={urls.signUp} component={SignUpMobile} />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact
            path={urls.userProfile.path}
            component={UserProfileMobile}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact
            path={urls.userProfile.personalData}
            component={PersonalDataMobile}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact
            path={urls.userProfile.favorites}
            component={MyFavoritesMobile}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact
            path={urls.userProfile.properties}
            component={MyPropertiesMobile}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact
            path={urls.userProfile.recentlyViewed}
            component={MyRecentlyViewedMobile}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact
            path={urls.userProfile.recommendations}
            component={MyRecommendationsMobile}
          />
          {user && user.investor && (
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              exact
              path={urls.userProfile.opportunities}
              component={MyOpportunitiesMobile}
            />
          )}

          <Route component={NotFound} />
        </Switch>
        <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} isLoggedIn={!!user} />
        </div>
        {location.pathname !== "/listing-page" && <FooterMobile />}
      </>
    );

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <NavBar />
      <div
        style={{
          minHeight: "71vh",
        }}
      >
        <Switch>
          <Route exact path={urls.home} component={Home} />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact
            path={urls.createProperty}
            component={CreateProperty}
          />
          <Route exact path={urls.listingPage} component={ListingPage} />
          <Route exact path={urls.viewProperty.path} component={ViewProperty} />
          <Route exact path={urls.signUp} component={SignUp} />
          <Route exact path={urls.logIn} component={LogIn} />
          <Route exact path={urls.editProperty.path} component={EditProperty} />
          <Route exact path={"/loading"} component={Loading} />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact
            path={urls.userProfile.path}
            component={UserProfile}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
      {location.pathname !== "/listing-page" && <Footer />}
    </>
  );
}
