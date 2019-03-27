import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

import styled from 'styled-components';

import NewArticleSection from '../NewArticleSection';


export default class NewArticleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      sections: [],
      sources: [],
      newArticleKey: '',
    };

    this.handleSubmitArticle = this.handleSubmitArticle.bind(this);
    this.handleUpdateField = this.handleUpdateField.bind(this);
  }

  componentDidMount() {
    const slug = window.location.pathname.slice(1,-1);
    const newArticleKey = firebase.database().ref('/articles/').child(slug).push().key;

    firebase.database().ref(`/articles/${slug}`)
      .child(newArticleKey)
      .on('child_added', (article) => {
        const sections = [];

        article.forEach((child) => {
          if (child.key !== 'title' && child.key !== 'key') {
            sections.push(child.val());
          }

          this.setState({
            sections
          });
        })
      });

    this.setState({
      newArticleKey,
    });
  }
  
  componentWillUnmount() {
    const slug = window.location.pathname.slice(1,-1);
    const { newArticleKey } = this.state;
    
    firebase.database().ref(`/articles/${slug}/${newArticleKey}`)
      .once('value')
      .then((articleSnapshot) => {
        const article = articleSnapshot.val();
        
        if (!article.title && !article.key) {
          return firebase.database().ref(`/articles/${slug}/${newArticleKey}`).remove();
        }
        
      })
  }

  handleSubmitArticle(e) {
    e.preventDefault();

    const slug = window.location.pathname.slice(1,-1);
    const { title, newArticleKey } = this.state;
    const articleData = {
      title,
      key: newArticleKey,
    };

    return firebase.database().ref(`/articles/${slug}/${newArticleKey}`).update(articleData).then(() => {
      window.location.hash = `#/articles/${newArticleKey}`;
    });
  }

  handleUpdateField(event) {
    const value = event.target.value;
    const key = event.target.id;

    this.setState({
      [key]: value
    });
  }

  render() {
    const { newArticleKey, sections } = this.state;

    return(
      <Wrapper>
        <Title type="text" id="title" placeholder="Title..." onChange={this.handleUpdateField} />
        {sections.map((section) => (
          <span>{section.text}</span>
        ))}
        <NewArticleSection articleId={newArticleKey}/>
        <Submit type="submit" onClick={this.handleSubmitArticle}/>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 2em auto 2em;
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

const Submit = styled.input`
  min-height: 2rem;
  width: 30%;
  margin: auto;
  padding: 0 2rem;
  border: none;
  border-radius: 3px;
  grid-column: 1/-1;
  grid-row: 3/4;
`;
