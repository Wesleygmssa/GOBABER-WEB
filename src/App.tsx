import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './page/Signin';
import SignUp from './page/SignUp';
import {AuthProvider} from './context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider> 
        <SignIn />
      </AuthProvider>
      <GlobalStyle />
    </>
  )
}
export default App;
