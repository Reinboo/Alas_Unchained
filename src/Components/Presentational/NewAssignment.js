import React from 'react';
import styled from 'styled-components';

const NewAssignment = ({fileNames, handleSubmit, handleUpdateField, handleAddFiles}) => {
  return (
    <Wrapper onSubmit={handleSubmit}>
      <Title type="text" id="title" placeholder="Title..." onChange={handleUpdateField} />
      <FileWrapper>
        <input type="file" id="filesList" multiple onChange={handleAddFiles}/>
        {fileNames.map((value, index) => (
          <File key={index}>
            {value}
          </File>
        ))}
      </FileWrapper>
      <Description>
        <textarea id="desc" onChange={handleUpdateField} cols="60" rows="10" placeholder="Description..."/>
      </Description>
      <Submit type="submit" />
    </Wrapper>
  );
};
export default NewAssignment;

const Wrapper = styled.form`
  display: grid;
  grid-template-columns: [desc] 1fr [file-input] 1fr;
  grid-template-rows: minmax(2rem, 4rem) auto 2em;
  grid-gap: 15px;
`;

const Title = styled.input`
  grid-column: 1/-1;
  width: 30%;
  height: 2rem;
  margin: auto;
  padding: 0 5px;
  background: #ffffff80;
  color: #000;
  ::placeholder {
    color: #000;
  }
  outline: none;
  border: none;
  border-radius: 3px;
`;

const FileWrapper = styled.label`
  grid-row: 2/3;
  grid-column: file-input;
`;

const File = styled.div`
  text-align: left;
`;

const Description = styled.div`
  grid-row: 2/3;
  grid-column: desc;
  display: grid;
  grid-template-columns: 1fr [content] auto 1fr;
  grid-template-rows: 1fr [content] auto 1fr;
  
  textarea {
    display: block;
    grid-row: content;
    grid-column: content;
    max-width: 30vw;
    border: none;
    border-radius: 3px;
    background: #ffffff80;
    outline: none;
    ::placeholder {
      color: #000;
    }
  }
`;

const Submit = styled.input`
  height: 2rem;
  width: 30%;
  margin: auto;
  padding: 0 2rem;
  border: none;
  border-radius: 3px;
  grid-column: 1/-1;
  grid-row: 3/4;
`;