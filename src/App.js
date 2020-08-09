import React from "react";
import "./App.css";
import Navbar from "../src/compoenents/layouts/Navbar";
import Users from "../src/compoenents/users/Users";
import User from "../src/compoenents/users/User";
import axios from "axios";
import Search from "../src/compoenents/users/Search";
import Alert from "../src/compoenents/layouts/Alert";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Fragment } from "react";
import About from "../src/compoenents/Pages/About";
class App extends React.Component {
  state = {
    users: [],
    repos: [],
    loading: false,
    user: {},
    alert: null,
  };

  Search = async (text) => {
    this.setState({ loading: true });

    const users = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    this.setState({ users: users.data.items, loading: false });
  };
  GetSingleUser = async (text) => {
    this.setState({ loading: true });

    const users = await axios.get(`https://api.github.com/users/${text}`);
    this.setState({ user: users.data, loading: false });
  };
  GetSingleUserRepos = async (text) => {
    this.setState({ loading: true });
    const repos = await axios.get(`https://api.github.com/users/${text}/repos`);
    this.setState({ repos: repos.data, loading: false });
  };
  Clear = () => {
    this.setState({ users: [], loading: false });
  };

  SetAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };
  render() {
    return (
      <Router>
        <div className='app'>
          <Navbar title='Github Finder' />

          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      length={this.state.users.length}
                      search={this.Search}
                      clear={this.Clear}
                      setalert={this.SetAlert}
                    />
                    <Users
                      users={this.state.users}
                      loading={this.state.loading}
                    />
                  </Fragment>
                )}
              />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.GetSingleUser}
                    getUserRepos={this.GetSingleUserRepos}
                    user={this.state.user}
                    repos={this.state.repos}
                    loading={this.state.loading}
                  />
                )}
              />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
