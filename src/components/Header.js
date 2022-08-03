import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  addExpenses = () => {
    const { expenses } = this.props;
    const priceValue = expenses.reduce(
      (acc, index) => acc + index.value * index.exchangeRates[index.currency].ask, 0,
    );
    return priceValue.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <div>
          <p data-testid="email-field">
            { email }
          </p>
        </div>
        <div>
          <p data-testid="total-field">
            {this.addExpenses()}
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Header);
