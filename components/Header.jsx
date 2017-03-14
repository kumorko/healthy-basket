import React, { PropTypes, Component } from 'react';
import AppBar from 'material-ui/AppBar';

const defaultStyle = {
  marginLeft: 20
};

const Header = () => (
      <header className="header">
          <AppBar title="My healthy shopping basket" showMenuIconButton={false}
            style={{textAlign: "center"}}
          />
      </header>
    );

export default Header;
