import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import Login from '../pages/auth/login.jsx';
import Register from '../pages/auth/register.jsx';
import { useAuth } from '../components/context/AuthContext.jsx';

/**
 * PrivateRoute để bảo vệ những route cần đăng nhập
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();
    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

/**
 * Cấu hình các routes
 */
export default function Routes() {
    return (
        <Switch>
            {/* Login + Register route, không cần login mới vào được */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

            {/* Các route cần đăng nhập */}
            <PrivateRoute path='/:category/search/:keyword' component={Catalog} />
            <PrivateRoute path='/:category/:id' component={Detail} />
            <PrivateRoute path='/:category' component={Catalog} />
            <PrivateRoute path='/' exact component={Home} />

            {/* Nếu không khớp bất kỳ route nào thì Redirect về home */}
            <Redirect to="/" />
        </Switch>
    );
}
