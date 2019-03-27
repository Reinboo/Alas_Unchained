import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

import UserInfo from '../Presentational/UserInfo';

export default class UserInfoContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleEditUserInfo = this.handleEditUserInfo.bind(this);
    this.handleUpdateUserInfo = this.handleUpdateUserInfo.bind(this);
  }

  componentDidMount() {
    const slug = window.location.pathname.slice(1,-1);

    firebase.database().ref(`/slugs/${slug}`)
    .once('value')
    .then((snapshot) => {
      this.setState({userId: snapshot.key});

      snapshot.forEach((snap) => {
        this.setState({[snap.key]: snap.val()});
      })
    });
  }

  handleUpdateUserInfo(event) {
    event.preventDefault();
    const { value, id } = event.target;
    const { userId } = this.state;

    const updates = {};
    updates[`/users/${userId}/${id}`] = value;

    return firebase.database().ref().update(updates);
  }

  handleEditUserInfo(event) {
    const { value, id } = event.target;

    this.setState({
      [id]: value
    });
  }

  render() {
    const {
      firstName,
      lastName,
      id,
      generation,
      module,
    } = this.state;

    const { isAdmin } = this.props;

    return(
      <UserInfo
        firstName={firstName}
        lastName={lastName}
        module={module}
        generation={generation}
        id={id}
        handleChange={this.handleEditUserInfo}
        onBlurCallback={this.handleUpdateUserInfo}
        editable={isAdmin}
      />
    );
  }
}
