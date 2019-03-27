import React from 'react';
import styled from 'styled-components';

import Input from './EditableLabel'


const UserInfo = ({ firstName, lastName, module, generation, id, handleChange, onBlurCallback, editable }) =>{
    return(
      <Wrapper id='user-info'>
        <Item className="name">
          <span>Name</span>
          <Input id="firstName" value={firstName} handleChange={handleChange} onBlurCallback={onBlurCallback} editable={editable}>{firstName}</Input>
        </Item>
        <Item className="name">
          <span>Last Name</span>
          <Input id="lastName" value={lastName} handleChange={handleChange} onBlurCallback={onBlurCallback} editable={editable}>{firstName}</Input>
        </Item>
        <Item className="info">
          <span>Module</span>
          <Input id="module" value={module} handleChange={handleChange} onBlurCallback={onBlurCallback} editable={editable}>{firstName}</Input>
        </Item>
        <Item className="gen">
          <span>Generation</span>
          <Input id="generation" value={generation} handleChange={handleChange} onBlurCallback={onBlurCallback} editable={editable}>{firstName}</Input>
        </Item>
        <Item className="index">
          <span>Index</span>
          <Input id="id" value={id} handleChange={handleChange} onBlurCallback={onBlurCallback}>{firstName} editable={editable}</Input>
        </Item>
      </Wrapper>
    );
  };

const Wrapper = styled.div`
  min-height: 20rem;
  @media (max-width: 1000px) {
    min-height: 4rem;
  }
  
  @media (max-width: 650px) {
    min-height: 8rem;
  }
  margin: 15px;
  padding: 10px;
  border: 1px solid lightgray;
  background: rgba(44, 48, 55, .7);
  
  display: flex;
  @media (max-width: 1000px) {
    display: grid;
    grid-template-rows: 1fr;
  }
  
  @media (max-width: 650px) {
    grid-template-rows: 3rem 3rem;
    grid-template-columns: 2fr 1fr 1fr;
  }
  flex-wrap: wrap;
  align-items: center;

  span {
    display: block;
    width: 100%;
    font-size: .7rem;
    color: darkgray;
    @media (max-width: 1000px) {
      grid-row: 1/2;
    }
  }
  
  *:not(span) {
    font-size: 1.5rem;
    width: 100%;
    @media (max-width: 1000px) {
      grid-row: 2/3;
    }
    @media (max-width: 650px) {
      margin-bottom: 0;
    }
  }
  * {
    display: block;
  }
`;

const Item = styled.div`
  @media (max-width: 650px) {
    &.name {
      grid-column: 1/2;
    }
    
    &.name:first-child {
      grid-row: 1/2;
    }
    
    &.info {
      grid-column: 2/4;
      grid-row: 1/2;
    }
    
    &.gen {
      grid-column: 2/3;
    }
    
    &.index {
      grid-column: 3/4;
    }
  }
`;

export default UserInfo;