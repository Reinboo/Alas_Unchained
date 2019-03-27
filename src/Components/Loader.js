import React, { Component } from 'react';
import styled from 'styled-components';

import logo from '../static/logo.svg';
import '../static/App.css';

export default class Loader extends Component {
  render() {
    return (
      <Wrapper className="App-header">
        <Animation src={logo} className="App-logo" alt="logo" />
      </Wrapper>
    )
  }
};

const Wrapper = styled.header`
  z-index: 2;
`;
const Animation = styled.img``;
