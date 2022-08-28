import { Link } from "react-router-dom"

function Register({onButtonClick}) {
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <div className="sign">
      <form className="sign__form sign__form_up" name="signUpForm" onSubmit={handleSubmit}>
        <h2 className="sign__title sign__title_up">Регистрация</h2>
        <label className="sign__field">
          <input id="email" className="sign__input sign__input_place_top" type="email" name="email" placeholder="Email" required />
        </label>
        <label className="sign__field">
          <input id="password" className="sign__input sign__input_place_bottom" type="password" name="password" placeholder="Пароль" required />
        </label>
        <button className="sign__submit-button sign__submit-button_up" type="submit">Зарегистрироваться</button>
      </form>
      <div className="sign__button-container">
        <p className="sign__bottom-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="sign__in-button" onMouseDown={onButtonClick}>Войти</Link>
      </div>
    </div>
  )
}

export default Register;
