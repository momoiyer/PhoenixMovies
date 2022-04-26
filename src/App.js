import './App.css';
import React from 'react';
import { Route,Switch, Redirect } from 'react-router-dom';
import Movie from './component/movie';
import NavBar from './component/navBar';
import NotFound from './component/notFound';
import Customers from './component/customer';
import Rentals from './component/rentals';
import MovieForm from './component/movieForm';
import LoginForm from './component/loginForm';
import RegisterForm from './component/resigterForm';

function App() {
  return (
    <React.Fragment>
      <NavBar/>
      <main className='container'>
        <Switch>
            <Route path="/movie/new" component={MovieForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movie} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            {/* <Redirect to="/not-found" /> */}
          </Switch>
        </main>
    </React.Fragment>
  );
}

export default App;
