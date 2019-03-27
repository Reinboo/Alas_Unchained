import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

import Assignment from '../Presentational/Assignment';

export default class AssignmentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      desc: '',
      files: {},
    };
  }

  componentDidMount() {
    const slug = window.location.pathname.slice(1,-1);
    const { assignmentName } = this.props.match.params;
    const { assignmentType } = this.props;
    console.log(this.props);

    firebase.database().ref(`/${assignmentType}/${slug}/`)
      .child(assignmentName)
      .once('value')
      .then((assignmentSnapshot) => {
        const assignment = assignmentSnapshot.val();
        const {
          title,
          desc,
          fileNames,
          fileList,
        } = assignment;

        const files = {};
        for (let i=0; i<fileList.length; i++) {
          files[fileNames[i]] = fileList[i];
        }

        this.setState({
          title,
          desc,
          files,
        })
      });
  }

  render() {
    const {
      title,
      desc,
      files,
    } = this.state;

    return (
      <Assignment
        title={title}
        desc={desc}
        files={files}
      />
    );
  }
}