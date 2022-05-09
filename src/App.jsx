import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.scss";
import "./CustomCarousel.scss";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import { PrivateRoute, PublicRoute } from "./Routes/routesCheck";
import CircularLoader from "./Components/Common/CircularLoader/CircularLoader";
import { useSelector } from "react-redux";
import ReactPixel from "react-facebook-pixel";

const HomeView = React.lazy(() => import("./Views/HomeView"));
const PaymentView = React.lazy(() => import("./Views/PaymentView"));
const PropertyDetailsView = React.lazy(() =>
  import("./Views/PropertyDetailsView")
);
const ReviewView = React.lazy(() => import("./Views/ReviewView"));
const TripView = React.lazy(() => import("./Views/TripDetailsView"));
const WorkationView = React.lazy(() => import("./Views/WorkationView"));
const ProfileView = React.lazy(() => import("./Views/ProfileView"));
const BookingView = React.lazy(() => import("./Views/BookingView"));
const BlogsListView = React.lazy(() => import("./Views/BlogsListView"));
const BlogView = React.lazy(() => import("./Views/BlogView"));
const PolicyView = React.lazy(() => import("./Views/PolicyView"));
const PartnerView = React.lazy(() => import("./Views/PartnerView"));
const HostelView = React.lazy(() => import("./Views/HostelView"));
const TripsView = React.lazy(() => import("./Views/TripsView"));
const AboutUsView = React.lazy(() => import("./Views/AboutUsView"));
const LoaderView = React.lazy(() => import("./Views/LoaderView"));
const ErrorView = React.lazy(() => import("./Views/ErrorView"));
const SearchView = React.lazy(() => import("./Views/SearchView"));

function App() {
  const options = {
    autoConfig: true,
    debug: true,
  };
  ReactPixel.init(process.env.REACT_APP_FACEBOOK__PIXEL_ID, options);

  return (
    <div>
      <Suspense fallback={<CircularLoader size={50} />}>
        <Router>
          <Navbar />
          <Switch>
            <PublicRoute
              restricted={false}
              component={HomeView}
              path='/'
              exact
            />
            <PublicRoute
              restricted={false}
              component={TripView}
              path='/trips/:name'
              exact
            />
            <PublicRoute
              restricted={false}
              component={ReviewView}
              path='/review'
              exact
            />
            <PublicRoute
              restricted={false}
              component={PaymentView}
              path='/payment'
              exact
            />
            <PublicRoute
              restricted={false}
              component={HostelView}
              path='/hostels'
              exact
            />
            <PublicRoute
              restricted={false}
              component={TripsView}
              path='/trips'
              exact
            />
            <PublicRoute
              restricted={false}
              component={WorkationView}
              path='/workations'
              exact
            />
            <PublicRoute
              restricted={false}
              component={ReviewView}
              path='/orders'
              exact
            />

            <PublicRoute
              restricted={false}
              component={ProfileView}
              path='/profile'
              exact
            />
            <PublicRoute
              restricted={false}
              component={BookingView}
              path='/booking'
              exact
            />
            <PublicRoute
              restricted={false}
              component={BlogsListView}
              path='/blogs'
              exact
            />
            <PublicRoute
              restricted={false}
              component={BlogView}
              path='/blog/:id'
              exact
            />
            <PublicRoute
              restricted={false}
              component={PolicyView}
              path='/policies'
              exact
            />
            <PublicRoute
              restricted={false}
              component={PartnerView}
              path='/partner'
              exact
            />
            <PublicRoute
              restricted={false}
              component={AboutUsView}
              path='/aboutus'
              exact
            />
            <PublicRoute
              restricted={false}
              component={LoaderView}
              path='/processing/:id'
              exact
            />
            <PublicRoute
              restricted={false}
              component={ErrorView}
              path='/error'
              exact
            />
            <PublicRoute
              restricted={false}
              component={PropertyDetailsView}
              path='/:type/:name'
              exact
            />
            <PrivateRoute component={HomeView} path='/' exact />
          </Switch>
          <Footer />
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
