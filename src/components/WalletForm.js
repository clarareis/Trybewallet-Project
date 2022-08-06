import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buttonExpense, responseApiSucess } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.object = { currency: 'USD',
      value: '',
      description: '',
      tag: 'Alimentação',
      method: 'Dinheiro',
    };
    this.state = { ...this.object, id: 0 };
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
        return data;
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

    setInfo = async (event) => {
      event.preventDefault();
      const { getExpense } = this.props;
      const state = { ...this.state, exchangeRates: await this.API() };
      getExpense(state);
      this.setState((prevState) => ({ id: prevState.id + 1 }));
      this.setState(this.object);
    };

    render() {
      const { currency,
        value,
        description,
        tag,
        method } = this.state;
      const { currencies } = this.props;
      return (
        <div className="wallet">
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.onInputChange }
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
              name="method"
              value={ method }
              data-testid="method-input"
              id="payment"
              onChange={ this.onInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              value={ tag }
              data-testid="tag-input"
              id="category"
              name="tag"
              onChange={ this.onInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição da Despesa:
            <input
              data-testid="description-input"
              placeholder="Descrição da despesa"
              id="description"
              name="description"
              value={ description }
              onChange={ this.onInputChange }
            />
          </label>
          <button type="submit" onClick={ this.setInfo }>Adicionar Despesa</button>
        </div>
      );
    }
}
WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  getExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: (currencies) => dispatch(responseApiSucess(currencies)),
  getExpense: (expense) => dispatch(buttonExpense(expense)),
});

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expense: store.wallet.expense,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
