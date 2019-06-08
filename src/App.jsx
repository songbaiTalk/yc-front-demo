/**
 * @file 应用的入口
 * @author zhangluyao01
 */
import React from 'react';
import {
    Redirect,
    Route,
    Switch,
    BrowserRouter
} from 'react-router-dom';

// 管理端
import AdministratorLogin from './pages/administrator/login';
import AuditMannagement from './pages/administrator/auditManagement';
import InfoMannagement from './pages/administrator/infoManagement';
import UserMannagement from './pages/administrator/userManagement';
import UserInfoMannagement from './pages/user/infoManagement';
import UserOrderMannagement from './pages/user/orderManagement';

// 学长端
import UserLogin from './pages/user/login';


export default class APP extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route path="/page">
                            <Switch>
                                <Route path="/page/admin">
                                    <Switch>
                                        <Route exact={true} path="/page/admin/login" component={AdministratorLogin} />
                                        <Route exact={true} path="/page/admin/audit" component={AuditMannagement} />
                                        <Route exact={true} path="/page/admin/info" component={InfoMannagement} />
                                        <Route exact={true} path="/page/admin/user" component={UserMannagement} />
                                        <Redirect exact={true} from="/page/admin" to="/page/admin/login" />
                                    </Switch>
                                </Route>
                                <Route path="/page/user">
                                    <Switch>
                                        <Route exact={true} path="/page/user/login" component={UserLogin} />
                                        <Route exact={true} path="/page/user/info" component={UserInfoMannagement} />
                                        <Route exact={true} path="/page/user/order" component={UserOrderMannagement} />
                                        <Redirect exact={true} from="/page/user" to="/page/user/login" />
                                    </Switch>
                                </Route>
                                <Redirect exact={true} from="/page" to="/page/user" />
                            </Switch>
                        </Route>
                        <Redirect exact={true} from="/" to="/page" />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
