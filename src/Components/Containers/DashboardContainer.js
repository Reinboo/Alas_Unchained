import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

import Dashboard from '../Presentational/Dashboard';

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      assignments: [],
      articles: [],
    };
  }

  componentWillUnmount() {
    this.props.toggleUserInfo();
  }

  componentDidMount() {
    const ref = firebase.database().ref();
    const slug = window.location.pathname.slice(1,-1);

    this.props.toggleUserInfo();

    ref.child(`articles/${slug}`)
      .once('value')
      .then((articles) => {
        const stateArticles = [];
        articles.forEach((article) => {
          stateArticles.push(article.val());
        });

        this.setState({articles: stateArticles});
      });

    ref.child(`assignments/${slug}`)
      .once('value')
      .then((assignments) => {
        const stateAssignments = [];
        assignments.forEach((assignment) => {
          stateAssignments.push(assignment.val());
        });

        this.setState({assignments: stateAssignments});
      });

    ref.child(`reports/${slug}`)
      .once('value')
      .then((reports) => {
        const stateReports = [];
        reports.forEach((report) => {
          stateReports.push(report.val());
        });

        this.setState({reports: stateReports});
      });
  }

  render() {
    const {
      articles,
      assignments,
      reports,
    } = this.state;

    const { isAdmin } = this.props;

    return(
      <Dashboard articles={articles} assignments={assignments} reports={reports} isAdmin={isAdmin} />
    )
  }
}
