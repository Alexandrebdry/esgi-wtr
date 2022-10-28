import RouterSecured from "./RouterSecured";
import {Route, Routes} from "react-router-dom";
import {Suspense} from "react";
import NotFound from "../pages/errors/NotFound";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RegisterConfirmation from "../pages/auth/RegisterConfirmation";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ChangePassword from "../pages/auth/ChangePassword";
import MyGroups from "../pages/user/MyGroups";
import Groups from "../pages/Groups";

export const useRoutes = () => {
    const routes = [
        {
            name:'home',
            path: '',
            element:
                <RouterSecured>
                    <Home/>
                </RouterSecured>
        },
        {
            name:'login',
            path: '/login',
            element:
            <RouterSecured>
                <Login/>
            </RouterSecured>
        },
        {
            name: 'register',
            path: '/register',
            element:
                <RouterSecured>
                    <Register/>
                </RouterSecured>
        },
        {
            name: 'forget-password',
            path: '/forget-password',
            element:
                <RouterSecured>
                    <ForgetPassword/>
                </RouterSecured>
        },
        {
            name: 'reset-password',
            path: '/reset-password/:code',
            element:
                <RouterSecured>
                    <ChangePassword/>
                </RouterSecured>

        },
        {
            name: 'registerConfirmation',
            path: '/confirmation/:confirmation',
            element:
                <RouterSecured>
                    <RegisterConfirmation/>
                </RouterSecured>
        },
        {
            name:'myGroups',
            path:'my-groups',
            element:
                <RouterSecured>
                    <MyGroups/>
                </RouterSecured>
        },
        {
            name: 'groups',
            path: 'groups',
            element:
                <RouterSecured>
                    <Groups/>
                </RouterSecured>
        },
        {
            name:'not-found',
            path: '*',
            element:
                <NotFound/>
        }
    ] ;

    return routes.map((route) => {
        return  <Route key={route.name} {...route} /> ;
    }) ;
}

export default function Router() {
    const routes = useRoutes() ;
    return (
        <Suspense>
            <Routes>
                {
                    routes.map(route=>route)
                }
            </Routes>
        </Suspense>

    )
}