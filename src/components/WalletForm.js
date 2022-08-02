import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { responseApiSucess } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      currency: '',
    };
  }

  componentDidMount() {
    this.API();
  }

    API = async () => {
      const { fetchCurrency } = this.props;
      try {
        const request = await fetch('https://economia.awesomeapi.com.br/json/all');
        const data = await request.json();
        const currencies = Object.keys(data).filter((e) => e !== 'USDT');
        fetchCurrency(currencies);
      } catch (error) {
        return error;
      }
    };

    onInputChange = ({ target }) => {
      const { name, value } = target;
      this.setState({
        [name]: value,
      });
    };

    render() {
      const { currency } = this.state;
      const { currencies } = this.props;
      return (
        <div>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="number"
              id="value"
            />
          </label>
          <label htmlFor="select">
            Moeda:
            <select
              data-testid="currency-input"
              id="select"
              name="currency"
              value={ currency }
              onChange={ this.onInputChange }
            >
              {
                currencies
                  .map((element, index) => <option key={ index }>{ element }</option>)
              }
            </select>
          </label>
          <label htmlFor="payment">
            Meio de pagamento:
            <select
              name="money"
              value="Dinheiro"
              data-testid="method-input"
              id="payment"
              onChange={ this.onInputChange }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartão de crédito">Cartão de crédito</option>
              <option value="cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              value="alimentacao"
              data-testid="tag-input"
              id="category"
              name="selectCategory"
              onChange={ this.onInputChange }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição da Despesa:
            <input
              data-testid="description-input"
              placeholder="Descrição da despesa"
              id="description"
              name="description"
            />
          </label>
        </div>
      );
    }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrency: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: (currencies) => dispatch(responseApiSucess(currencies)),
});

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
