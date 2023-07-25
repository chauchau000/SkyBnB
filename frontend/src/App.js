import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormModal from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import SignUpFormModal from "./components/SignUpFormModal";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SpotDetails from "./components/SpotDetails";
import CreateNewSpot from "./components/CreateNewSpot";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormModal />
          </Route>
          <Route path="/signup">
            <SignUpFormModal />
          </Route>
          <Route exact path='/spots/new'>
            <CreateNewSpot />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetails />
          </Route>
          <Route exact path="/">
            <Spots />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;