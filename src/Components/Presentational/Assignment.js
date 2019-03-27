import React from 'react';
import styled from 'styled-components';

const Assignment = ({title, desc, files}) => {
  return (
    <Wrapper>
      <Title>
        {title}
      </Title>
      <Description>
        <span>Description:</span>
        <p>
          {desc}
        </p>
      </Description>
      <Files>
        <span>Files:</span>
        {Object.keys(files).map((fileName) => (
          <a href={files[fileName]} key={fileName}>{fileName}</a>
        ))}
      </Files>
    </Wrapper>
  )
};
export default Assignment;

const Wrapper = styled.div`
  width: 100%; height: 100%;
  display: grid;
  grid-template-columns: [desc] 1fr [files] 1fr;
  grid-template-rows: minmax(auto, 6rem) auto;
  @media (max-width: 650px) {
    grid-template-rows: minmax(auto, 6rem) auto 1fr;
    grid-template-columns: 1fr;
  }
  grid-column-gap: 15px;
  grid-row-gap: 30px;
`;

const Title = styled.h1`
  width: 100%;
  grid-column: 1/-1;
  text-align: center;
  margin: 0;
`;

const Description = styled.div`
  display: grid;
  grid-template-rows: 1.5em 1fr;
  text-align: left;
  padding: 10px;
  border: 1px solid lightgray;
`;

const Files = styled.div`
  padding: 10px;
  text-align: left;
  
  a {
    display: block;
    color: white;
  }
`;
