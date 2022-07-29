import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      currency: '',
    };
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

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
            data-testid="method-input"
            id="payment"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria:
          <select
            data-testid="tag-input"
            id="category"
            name="selectCategory"
          >
            <option value="alimentacao" selected>Alimentação</option>
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
          />
        </label>
      </div>
    );
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
      console.log(state);
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
        <div>
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
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchAPI()),
});

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
