import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './page/Signin';
import SignUp from './page/SignUp';
// import ToastContainer from './components/ToastContainer';
// import { AuthProvider } from './hooks/Auth';
// import { Toastprovider } from './hooks/Toast';
import AppProvider from './hooks'


const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>
      <GlobalStyle />
    </>
  )
}
export default App;
