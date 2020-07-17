import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './page/Signin';
import SignUp from './page/SignUp';

const App: React.FC = () => (
  <>
    <SignIn />
    <GlobalStyle />
  </>
)

export default App;
