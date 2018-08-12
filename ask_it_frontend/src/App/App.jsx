import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { MyQuestions } from "../MyQuestions";

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  logout() {
    localStorage.removeItem("user", localStorage.getItem("user"));
  };

  render() {
    const { alert } = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            <main>{this.props.children}</main>

            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}

            <Router history={history}>
              <div>
                <form className="navbar navbar-default navbar-fixed-top">
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1"
                        aria-expanded="false"
                      >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                      </button>
                      <a className="navbar-brand" href="#">
                        Ask.It
                      </a>
                    </div>
                    <div
                      className="collapse navbar-collapse"
                      id="bs-example-navbar-collapse-1"
                    >
                      <ul className="nav navbar-nav">
                        <li>
                          <Link to="/">Homepage</Link>
                        </li>
                        <li>
                          {localStorage.getItem("user") ? (
                            <Link to="/myQuestions">MyQuestions</Link>
                          ) : null}
                        </li>
                      </ul>
                      <ul className="nav navbar-nav navbar-right">
                        <li>
                          {localStorage.getItem("user") ? null : (
                            <Link to="/login">Login</Link>
                          )}
                        </li>
                        <li>
                          {localStorage.getItem("user") ? null : (
                            <Link to="/register">Register</Link>
                          )}
                        </li>
                        {localStorage.getItem("user") ? (
                          <li className="dropdown">
                            <a
                              href="#"
                              className="dropdown-toggle"
                              data-toggle="dropdown"
                              role="button"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Profile<span className="caret" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a href="#">Change password</a>
                              </li>
                              <li role="separator" className="divider" />
                              <li>
                                <a href="#" onClick={() => {this.logout()}}>Logout</a>
                              </li>
                            </ul>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                </form>

                <Route exact path="/" component={HomePage} />
                <PrivateRoute path="/myQuestions" component={MyQuestions} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
