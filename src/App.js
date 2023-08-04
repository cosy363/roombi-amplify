import { Amplify, Auth } from 'aws-amplify';

import * as React from 'react';

import {  BrowserRouter, Route, Routes } from 'react-router-dom' 

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-react';

import awsconfig from './awsconfig';
import Home from './pages/Home'
import Result from './pages/Result'


I18n.putVocabularies(translations);
I18n.setLanguage('ko');

I18n.putVocabularies({
  ko: {
    'Enter your Username': '아이디 입력',
    'Enter your Password': "비밀번호 입력",
    'Please confirm your Password': "비밀번호 재입력",
  }
});

Amplify.configure(awsconfig);


export default function App() {
  
  const userinfo = Auth.currentUserInfo()


  return (
    <Authenticator signUpAttributes={[
      'email',
    ]} variation="modal">
      {({ signOut, user }) => (
        <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/result" element={<Result />}/>

        </Routes>



        </BrowserRouter>
      )}
    </Authenticator>
  );
}