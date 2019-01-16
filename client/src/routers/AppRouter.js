/*eslint react/jsx-filename-extension: 0 */

import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from '../App';
import ListUrlComponent from '../components/ListUrlComponent';
import AddGitURL from '../components/AddGitURL';


function AppRouter () {
   return ( <HashRouter>
    <div>
        <Route  path='/' component={App} exact={true} />
        <Switch>
            <Route  path='/home'  component={AddGitURL}  />
            <Route  path='/listUrl'  component={ListUrlComponent} />
            <Route  path='/newApp'  component={AddGitURL} />
        </Switch>
    </div>
    </HashRouter>)
}
export default AppRouter;