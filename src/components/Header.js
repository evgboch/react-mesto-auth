import { Link } from "react-router-dom";

function Header({loggedIn, registered, onButtonClick}) {
    return(
      <header className="header page__header">
        <div className="header__logo"></div>
        <div className="header__button-container">
          <p className={loggedIn ? "header__email" : "header__email header__email_hidden"}>email@email.com</p>
          <Link
            to={!registered ? "/sign-up" : "sign-in"}
            className={!loggedIn ? "header__button" : "header__button header__button_logged"}
            onMouseDown={onButtonClick}
          >
            {registered ? "Регистрация" : "Войти"}
          </Link>
        </div>
      </header>
    );
}

export default Header;
