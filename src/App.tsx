import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './page/Signin';
import SignUp from './page/SignUp';
import AuthContext from './context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthContext.Provider value={{ name: 'Wesley' }}>
        <SignUp />
      </AuthContext.Provider>
      <GlobalStyle />
    </>
  )
}
export default App;
