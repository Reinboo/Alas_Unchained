import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

import Article from '../Presentational/Article';


export default class ArticleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Placeholder',
      sections: [],
      sources: [],
    };
  }

  componentDidMount() {
    const { articleName } = this.props.match.params;
    const slug = window.location.pathname.slice(1,-1);

    firebase.database().ref(`/articles/${slug}`)
      .child(articleName)
      .on('value', (article) => {
        const title = article.val().title;
        const sections = [];
        const sourcesSnapshot = article.val().sources;
        const sources = [];

        for (let source in sourcesSnapshot) {
          if (sourcesSnapshot.hasOwnProperty(source)) {
            sources.push(sourcesSnapshot[source]);
          }
        }

        article.forEach((section) => {
          if (section.key !== 'title') {
            sections.push(section.val());
          }
        });

        this.setState({
          title,
          sections,
          sources,
        });
      });
  }

  render() {
    const {
      title,
      sections,
      sources,
    } = this.state;

    const { isAdmin } = this.props;
    const { articleName } = this.props.match.params;

    return(
      <Article
        title={title}
        sections={sections.map ? sections : []}
        sources={sources.map ? sources : []}
        articleName={articleName}
        showControls={isAdmin}/>
    );
  }
}
