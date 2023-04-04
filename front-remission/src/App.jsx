import { Suspense, useEffect, useLayoutEffect } from "react";
// pages
import NotPermission from "./pages/NotPermission";
import Login from "./pages/Login";

// routes
import  routers from "./routes/routes";

// auth
import { getAuthRouters } from "react-router-auth-plus";

// react router dom
import { useRoutes } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { loggedIn } from "./features/user/userSlice";


function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const userInMemory = JSON.parse(localStorage.getItem('user'))
    if (userInMemory){
      dispatch(loggedIn({
        username: userInMemory?.username,
        rol: userInMemory?.rol,
        isLoggedIn: userInMemory.isLoggedIn
      }))
    }
  }, [])

  // if is login then show dont have permissions 
  // if is not login then show the login form

  // if the user is login then has a role
  // if the user is not login then have a empty role

  // remeber this for the redux and localstorage

  return (
    <Suspense fallback="loading...">
      {useRoutes(getAuthRouters({
        routers,
        noAuthElement: () => (true ? <Login /> : <NotPermission />),
        render: (element) => element,
        auth: user?.rol || [],
      }))}
    </Suspense>

  )
}

export default App;