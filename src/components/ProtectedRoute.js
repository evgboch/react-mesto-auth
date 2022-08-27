import { Redirect, Route } from "react-router-dom";
import Main from "./Main";

function ProtectedRoute({...props}) {
  return(
    <Route>
      {
        () => props.loggedIn === true ? <Main {...props} /> : <Redirect to="./sign-in" />
      }
      {/* <Main {...props} /> */}
    </Route>
  )
}

export default ProtectedRoute;
