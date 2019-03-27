import React from 'react';
import styled from 'styled-components';

const PostSignupForm = ({ handleSubmit }) => {
  return (<div>
    <PostLoginForm method="post" onSubmit={handleSubmit}>
      <label>
        Ime <input type="text" name="firstName" required/>
      </label>
      <label>
        Prezime <input type="text" name="lastName" required/>
      </label>
      <label>
        Generacija <input type="text" name="generation" required/>
      </label>
      <label>
        Indeks <input type="text" name="id" required/>
      </label>
      <label>
        Modul <input type="text" name="module" required/>
      </label>
      <input type="submit" value="Submit"/>
      <input type="reset" value="Reset"/>
    </PostLoginForm>
  </div>)
};

const PostLoginForm= styled.form``;
export default PostSignupForm;

