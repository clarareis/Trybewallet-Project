import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buttonIsDisabled: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.validateInputName(); });
  };

  validateInputName = () => {
    const { email, password } = this.state;
    const passowordLength = 6;
    const regex = /\S+@\S+\.\S+/;
    if (password.length >= passowordLength && regex.test(email)) {
      this.setState({
        buttonIsDisabled: false,
      }, () => {});
    } else {
      this.setState({
        buttonIsDisabled: true,
      });
    }
  };

  // regex: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript

  onSaveButtonClick = (element) => {
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    element.preventDefault();
    history.push('/carteira');
  };

  render() {
    const { email, password, buttonIsDisabled } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            placeholder="Email"
            onChange={ this.onInputChange }
          />
          <br />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            placeholder="Senha"
            onChange={ this.onInputChange }
          />
          <br />
          <button
            type="submit"
            disabled={ buttonIsDisabled }
            onClick={ this.onSaveButtonClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(loginAction(e)),
});

export default connect(null, mapDispatchToProps)(Login);
