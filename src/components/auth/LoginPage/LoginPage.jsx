import T from 'prop-types';
import { useState } from 'react';

import FormField from '../../common/FormField/FormField';
import Button from '../../common/Button/Button';

import { connect } from 'react-redux';
import { authLogin, iuResetError } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

import './LoginPage.css';

export function LoginPage({ onLogin, error }) {
  const [value, setValue] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (event) => {
    setValue((prevState) => ({
      ...prevState,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onLogin(value);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="loginPage">
      <div className="loginpage-main-container">
        <h1 className="loginPage-title">Log in to ReactPop!</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <FormField
            type="email"
            name="email"
            label="Email"
            className="loginForm-field"
            value={value.email}
            onChange={handleChange}
            autofocus
          ></FormField>
          <FormField
            type="password"
            name="password"
            label="Password"
            className="loginForm-field"
            value={value.password}
            onChange={handleChange}
          ></FormField>
          <FormField
            type="checkbox"
            name="remember"
            label="Remember me"
            className="loginForm-field"
            value={value.remember}
            onChange={handleChange}
          ></FormField>
          <Button className="loginForm-submit" type="submit">
            Log in!!
          </Button>
        </form>
        {error && <div className="loginPage-error">{error.message}</div>}
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
};

const mapStateToProps = (state) => {
  return getUi(state);
};

const mapDispatchToProps = {
  onLogin: authLogin,
};

const ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default ConnectedLoginPage;
