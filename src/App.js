import { Amplify } from 'aws-amplify';
import { API } from 'aws-amplify';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-react';

import awsconfig from './awsconfig';

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
  return (
    <Authenticator signUpAttributes={[
      'email',
    ]} variation="modal">
      {({ signOut, user }) => (
        <main>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Always visible"
              defaultValue={80}
              getAriaValueText={valuetext}
              step={10}
              marks={marks}
              valueLabelDisplay="on"
            />
          </Box>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}