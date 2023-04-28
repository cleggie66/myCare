import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreatePhysicianForm from "./components/Physicians/PhysicianForm/CreatePhysicianForm";
import UpdatePhysicianForm from "./components/Physicians/PhysicianForm/UpdatePhysicianForm";
import Dashboard from "./components/Dashboard";
import CreateAppointmentForm from "./components/Appointments/AppointmentForm/CreateAppointmentForm";
import UpdateAppointmentForm from "./components/Appointments/AppointmentForm/UpdateAppointmentForm";
import LandingPage from "./components/LandingPage";
import HospitalsIndex from "./components/Hospitals/HospitalsIndex";
import SpecialtiesIndex from "./components/Specialties/SpecialtiesIndex";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {console.log(isLoaded)}
      {isLoaded && (
        <Switch>
          <Route path="/dashboard" >
            <Dashboard />
          </Route>
          <Route path="/appointment/new/:physicianId">
            <CreateAppointmentForm />
          </Route>
          <Route path="/appointment/new">
            <CreateAppointmentForm />
          </Route>
          <Route path="/appointment/:appointmentId/update">
            <UpdateAppointmentForm />
          </Route>
          <Route path="/hospitals">
            <HospitalsIndex />
          </Route>
          <Route path="/physician/new">
            <CreatePhysicianForm />
          </Route>
          <Route path="/physician/:physicianId/update">
            <UpdatePhysicianForm />
          </Route>
          <Route path="/specialties">
            <SpecialtiesIndex />
          </Route>
          <Route path="">
            <LandingPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
