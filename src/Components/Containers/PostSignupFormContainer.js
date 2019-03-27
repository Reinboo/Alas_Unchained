import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/database';
import PostSignupForm from '../Presentational/PostSignupForm';

export default class PostSignupFormContainer extends Component {
  constructor(props) {
    super(props);
    this.handlePostSignupSubmit = this.handlePostSignupSubmit.bind(this);
  }
  handlePostSignupSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const generation = form.elements['generation'].value;
    const id = form.elements['id'].value;
    const module = form.elements['module'].value;

    let slug = '~af' + generation + id;

    const userData = {
      firstName: form.elements['firstName'].value,
      lastName: form.elements['lastName'].value,
      module: form.elements['module'].value,
      generation,
      id,
      slug
    };

    const userUid = this.props.user.uid;

    const update = {};
    update['/users/'+userUid] = userData;

    return firebase.database().ref().update(update);
  }

  render() {
    const {
      isNewUser,
      user,
    } = this.props;

    return (
      <div>
        {isNewUser
          ? <PostSignupForm handleSubmit={this.handlePostSignupSubmit} />
          : <Redirect to="/" />
        }
      </div>
    );
  }
}
