import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

import NewAssignment from '../Presentational/NewAssignment';

export default class NewAssignmentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      desc: '',
      fileList: [],
      fileNames: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateField = this.handleUpdateField.bind(this);
    this.handleAddFiles = this.handleAddFiles.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const files = document.getElementById('filesList').files;
    const slug = window.location.pathname.slice(1, -1);
    const { assignmentType } = this.props;
    const newKey = firebase.database().ref(`/${assignmentType}/`).child(slug).push().key;
    const fileList = [];

    new Promise((resolve, reject) => {
      for (let i=0; i<files.length; i++) {
        const upload = firebase.storage().ref(`/${assignmentType}/${slug}/${newKey}/${files[i].name}`).put(files[i]);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
        }, function (error) {
          switch (error.code) {
            case 'storage/unauthorized':
              alert('You are not an admin of this page');
              reject();
              break;
            case 'storage/canceled':
              reject();
              break;
            case 'storage/unknown':
              reject();
              break;
          }
        }, () => {
          upload.snapshot.ref.getDownloadURL().then(async (downloadUrl) => {
            fileList.push(downloadUrl);
            await this.setState({fileList});
            if (fileList.length === files.length) {
              // Resolve promise only when all files are uploaded
              resolve();
            }
          });
        });
      }
    }).then(() => {
      const { title, desc, fileList, fileNames } = this.state;
      const assignmentData = {
        title,
        desc,
        fileList,
        fileNames,
        key: newKey,
      };

      const updates = {};
      updates[`/${assignmentType}/${slug}/${newKey}`] = assignmentData;
      console.log(`/${assignmentType}/${slug}/${newKey}`);
      return firebase.database().ref().update(updates);
    }).then(() => {
      window.location.hash = `#/${assignmentType}/${newKey}`;
    });
  }

  handleUpdateField(event) {
    const value = event.target.value;
    const key = event.target.id;

    this.setState({
      [key]: value
    });
  }

  handleAddFiles(event) {
    const files = event.target.files;
    const fileNames = [];
    for(let i=0; i<files.length; i++) {
      fileNames.push(files[i].name);
    }
    this.setState({fileNames});
  }

  render() {
    const { fileNames } = this.state;
    return(
      <NewAssignment
        fileNames={fileNames}
        handleSubmit={this.handleSubmit}
        handleUpdateField={this.handleUpdateField}
        handleAddFiles={this.handleAddFiles}
      />
    );
  }
}