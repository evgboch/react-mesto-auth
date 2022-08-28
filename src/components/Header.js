import { Link, Route, Switch } from "react-router-dom";

function Header({onLogout}) {
    return(
      <header className="header page__header">
        <div className="header__logo"></div>
        <div className="header__button-container">
          {/* <p className={loggedIn ? "header__email" : "header__email header__email_hidden"}>email@email.com</p>
          <Link
            to={!registered ? "/sign-up" : "sign-in"}
            className={!loggedIn ? "header__button" : "header__button header__button_logged"}
            onMouseDown={onButtonClick}
          >
            {registered ? "Регистрация" : "Войти"}
          </Link> */}

          <Switch>
            <Route exact path="/">
              <p className="header__email">email@email.com</p>
              <Link to="/signin" className="header__button" onMouseDown={onLogout}>
                Выйти
              </Link>
            </Route>
            <Route path="/signin">
              <Link to="/signup" className="header__button">
                Регистрация
              </Link>
            </Route>
            <Route path="/signup">
              <Link to="/signin" className="header__button">
                Войти
              </Link>
            </Route>
          </Switch>


        </div>
      </header>
    );
}

export default Header;
