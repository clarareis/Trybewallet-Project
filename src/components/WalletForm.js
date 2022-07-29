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
