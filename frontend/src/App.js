import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import LoginFormModal from "./components/Navigation/LoginFormModal/LoginFormModal";
import SignUpFormModal from "./components/Navigation/SignUpFormModal/SignUpFormModal";
import Navigation from "./components/Navigation/Navigation";
import Spots from "./components/Spots/Spots";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import CreateNewSpot from "./components/CreateNewSpot/CreateNewSpot";
import ManageSpots from "./components/Spots/ManageSpots/ManageSpots";
import UpdateSpot from "./components/UpdateSpot/UpdateSpot";


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
          <Route path='/user/spots/:spotId/edit'>
            <UpdateSpot />
          </Route>
          <Route path='/user/spots'>
            <ManageSpots />
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