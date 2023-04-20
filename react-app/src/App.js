import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import PhysiciansIndex from "./components/Physicians/PhysiciansIndex";
import PhysicianForm from "./components/Physicians/PhysicianForm";
import CreatePhysicianForm from "./components/Physicians/PhysicianForm/CreatePhysicianForm";
import UpdatePhysicianForm from "./components/Physicians/PhysicianForm/UpdatePhysicianForm";

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
          <Route path="/home" >
            <PhysiciansIndex />
          </Route>
          <Route path="/physician/new">
            <CreatePhysicianForm />
          </Route>
          <Route path="/physician/:physicianId/update">
            <UpdatePhysicianForm />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
