import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import HospitalsIndex from "./components/Hospitals/HospitalsIndex";
import SpecialtiesIndex from "./components/Specialties/SpecialtiesIndex";
import PhysiciansIndex from "./components/Physicians/PhysiciansIndex";
import AboutPage from "./components/AboutPage";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/dashboard" >
            <Dashboard />
          </Route>
          <Route path="/physicians" >
            <PhysiciansIndex />
          </Route>
          <Route path="/hospitals">
            <HospitalsIndex />
          </Route>
          <Route path="/specialties">
            <SpecialtiesIndex />
          </Route>
          <Route path="/about" >
            <AboutPage />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route>
            <h1>404 — Page not found!</h1>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
