import './App.css';
import React from 'react';
import Sidebar from "./Sidebar";
import routes from './routes/Routes';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {Helmet} from "react-helmet";

class App extends React.Component {
    render() {
        const PrivateRoute = (props) => {
          const titulo = props.nome? 'Rankeamento - ' + props.nome : 'Rankeamento'
          return (
          <div>
              <Helmet title={titulo} />
              <Route {...props}/>
          </div>)
        };

        let routeComponents = [];

        routes.map((prop) => {
          routeComponents.push(
              <PrivateRoute path={prop.path} exact={prop.exact} component={prop.component}
                            nome={prop.nome} key={routeComponents.length}/>
          )
        });

        routeComponents.push(<PrivateRoute path="*" component={() => <h1>Page not found</h1>}
                                           key={routeComponents.length}/>);

        return (
            <div className="App">
              <header className="App-header">
                <div>
                    <Sidebar/>
                </div>

                <div style={{padding: 20}}>
                    <BrowserRouter>
                        <Switch>{routeComponents}</Switch>
                    </BrowserRouter>
                </div>
              </header>
            </div>
        );
    }
};

export default App;