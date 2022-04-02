import React from 'react'
import {BrowserRouter , Routes, Route, Navigate} from "react-router-dom";
//components
import {Spinner} from "./components/loading/Spinner";
//constants
import {ROUTES} from "./constants/routes";
//context
import {useGlobalContext} from "./context/globalContext";
//hooks
import {useFirebaseInit} from "./hooks/useFirebaseInit";
import {useAuthListener} from "./hooks/useAuthListener";
//pages
const Dashboard = React.lazy(()=> import("./pages/Dashboard"));
const Login = React.lazy(()=> import("./pages/Login"));
const Signup = React.lazy(()=> import("./pages/Signup"));
const Browse = React.lazy(()=> import("./pages/Browse"));
const ShowPage = React.lazy(()=> import("./pages/ShowPage"));
const ChoooseProfile = React.lazy(()=> import("./pages/ChoooseProfile"));
const AddProfile = React.lazy(()=> import("./pages/AddProfile"));
const Error = React.lazy(()=> import("./pages/Error"));
const NotFound = React.lazy(()=> import("./pages/NotFound"));

export const App = () => {
  const { isLoading, isFirebaseInit, userEmail, currentUserProfile} = useGlobalContext();
  
  useFirebaseInit();
  useAuthListener();
  
  if (!isFirebaseInit || isLoading) {
    return <Spinner />
  }
  return (
    <React.Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />}/>
            <Route path={ROUTES.SIGNIN} element={userEmail?<Navigate to={ROUTES.BROWSE}/>: <Login />} />
            <Route path={ROUTES.SIGNUP} element={userEmail?<Navigate to={ROUTES.BROWSE}/>:<Signup />} />
            <Route path={ROUTES.BROWSE} element={
             ( userEmail? 
                (currentUserProfile? 
                  <Browse/> : <Navigate to={ROUTES.CHOOSE_PROFILE}/>
                ) : 
                <Navigate to={ROUTES.SIGNIN}/>
              )
            } 
            />
            <Route path={ROUTES.SHOW_PAGE} element={
             ( userEmail? 
                (currentUserProfile? 
                  <ShowPage/> : <Navigate to={ROUTES.CHOOSE_PROFILE}/>
                ) : 
                <Navigate to={ROUTES.SIGNIN}/>
              )
            } 
            />
            <Route path={ROUTES.CHOOSE_PROFILE} element={
             ( userEmail? 
                (currentUserProfile? 
                  <Navigate to={ROUTES.BROWSE}/> : <ChoooseProfile />
                ): 
                <Navigate to={ROUTES.SIGNIN}/>
              )
            } 
            />
            <Route 
              path={ROUTES.ADD_PROFILE} 
              element={userEmail? <AddProfile />: <Navigate to={ROUTES.SIGNIN} />}
            />
            <Route path={ROUTES.ERR} element={<Error />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  )
}
