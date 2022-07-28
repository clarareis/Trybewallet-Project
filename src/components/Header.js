import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
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
            0
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
});

Header.propTypes = {
  email: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
