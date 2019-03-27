import React, { useState} from 'react';
import styled from 'styled-components';

const EditableLabel = ({ value, id, onBlurCallback, handleChange, editable }) => {
  const [isBeingEdited, toggleEdit] = useState(false);

  const handleBlur = (event) => {
    event.preventDefault();
    onBlurCallback(event);
    toggleEdit(!isBeingEdited);
  };

  return (
    <Wrapper
      show={isBeingEdited}
      onClick={() => {
        if(editable) {
          toggleEdit(!isBeingEdited);
        }
      }}
    >
      {isBeingEdited
        ?<input type="text"
               name={id}
               id={id}
               value={value || ''}
               onBlur={handleBlur}
               onChange={handleChange}
               autoFocus
         />
        :<label htmlFor={id}>
          {value}
         </label>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline;
  width: auto;
  
  label {
    display: ${
      props => props.show ? 'none' : 'inline'
    }
    line-height: 1.5rem;
  }
  
  input {
    display: ${
      props => props.show ? 'inline' : 'none'
    }
    
    height: 1.5rem;
    max-width: 15vw;
    border: none;
    outline: none;
    
    font-size: 1rem;
    line-height: 1.5rem;
    
    &:focus {
      background: lightgoldenrodyellow;
    }
  }
  
  button {
    display: none;
  }
  
  &:hover > button {
    display: inline;
  }
`;

export default EditableLabel;
