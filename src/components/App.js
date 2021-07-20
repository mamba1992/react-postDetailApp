import React, { Fragment} from 'react'
import { Route, Switch} from 'react-router-dom'
import PostDetail from './PostDetail';
import PostList from './PostList';
import UserDetail from './UserDetail';
import './App.css';

const App = () => {
    return (
        <Fragment>
            <Switch>
                <Route component={PostList} path="/" exact/>
                <Route path="/post/:id" exact render={(props) => {
                    return (<PostDetail {...props} />)
                    }} />
                <Route path="/user/:id" exact render={(props) => {
                    return (<UserDetail {...props} />)
                    }} />
            </Switch>
        </Fragment>
    )
}
export default App;