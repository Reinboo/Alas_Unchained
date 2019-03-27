import React, {useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import styled from 'styled-components';


const NewArticleSection = ({ articleId }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [type, setType] = useState('');

  function handleSubmitParagraph(e) {
    e.preventDefault();
    const slug = window.location.pathname.slice(1,-1);
    const sectionData = {
      type: type,
      text: e.target.elements['text'].value,
    };

    let newSectionKey = firebase.database().ref(`/articles/${slug}`).child(articleId).push().key;

    let updates = {};
    updates[`/articles/${slug}/${articleId}/${newSectionKey}`] = sectionData;

    setIsEdited(false);
    return firebase.database().ref().update(updates);
  }

  function handleSubmitFigure(e) {
    e.preventDefault();
    const slug = window.location.pathname.slice(1,-1);
    const file = e.target.elements['img'].files[0];
    const upload = firebase.storage().ref(`/articles/${slug}/${articleId}/${file.name}`).put(file);
    const caption = e.target.elements['caption'].value;

    upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
      function (snapshot) {
        document.getElementById('progress').value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            break;
          case firebase.storage.TaskState.RUNNING:
            break;
        }
      }, function (error) {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      }, function () {
        upload.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          const sectionData = {
            type: type,
            caption: caption,
            img: downloadUrl,
          };

          let newSectionKey = firebase.database().ref(`/articles/${slug}`).child(articleId).push().key;

          let updates = {};
          updates[`/articles/${slug}/${articleId}/${newSectionKey}`] = sectionData;

          setIsEdited(false);
          return firebase.database().ref().update(updates);
        });
      });
  }

  if (isEdited) {
    if (type === 'text') {
      return (
        <form onSubmit={handleSubmitParagraph}>
          <TextArea name="text" id="" cols="100" rows="10" autoFocus>
          </TextArea>

          <InputButton type="submit"/>
          <InputButton type="button" value="Cancel" onClick={() => setType('')}/>
        </form>
      );
    } else if (type === 'figure') {
      return (
        <form onSubmit={handleSubmitFigure}>
          <FigureInputWrapper>
            <CaptionInput placeholder="Caption..." type="text" name="caption" autoFocus/>
            <input type="file" name="img"/>
          </FigureInputWrapper>

          <InputButton type="submit"/>
          <progress id="progress" max="100" />
          <InputButton type="button" value="Cancel" onClick={() => setType('')}/>
        </form>
      );
    }
  }
    return (
      <div>
        <Button onClick={() => {
          setIsEdited(true);
          setType('text');
          const container = document.getElementById('main-container');
          container.scrollTop = container.scrollHeight;
        }}>
          Add New Paragraph
        </Button>
        <Button onClick={() => {
          setIsEdited(true);
          setType('figure');
          const container = document.getElementById('main-container');
          container.scrollTop = container.scrollHeight;
        }}>
          Add New Figure
        </Button>

      </div>
    );
};

const CaptionInput = styled.input`
  background: #ffffff80;
  color: #fff;
  outline: none;
  border: none;
  border-radius: 3px;
`;

const Button = styled.button`
  height: 2rem;
  margin: 1rem;
  padding: 0 2rem;
  border: none;
  border-radius: 3px;
`;

const InputButton = styled.input`
  height: 2rem;
  margin: 1rem;
  padding: 0 2rem;
  border: none;
  border-radius: 3px;
`;

const TextArea = styled.textarea`
  display: block;
  margin: auto;
  border: none;
  border-radius: 3px;
  background: #ffffff80;
  outline: none;
`;

const FigureInputWrapper = styled.div`
`;

export default NewArticleSection;