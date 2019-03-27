import React from 'react';
import styled from 'styled-components';

import NewArticleSection from '../NewArticleSection';


const Article = ({ title, sections, sources, articleName, showControls }) => {
  return(
    <Wrapper>
      <h1>{title}</h1>
      {sections.map((section, index) => (
        <section key={index}>{
          section.type !== 'figure'
            ? <p>{section.text}</p>
            : <figure>
                <img src={section.img} alt=""/>
                <figcaption>{section.caption}</figcaption>
              </figure>
        }</section>
      ))}
      {showControls ? <NewArticleSection articleId={articleName}/> : null}
      <h3>Sources:</h3>
        {sources.map((source, index) => (
          <a href={source} key={index}>{source}</a>
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  @media (max-width: 650px) {
    section p {
      text-align: justify;
    }
    
    section {
      margin: 0;
    }
  }

  a {
    color: white;
    display: block;
    overflow-x: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
    max-width: 100%;
    white-space: nowrap;
  }
`;

export default Article;