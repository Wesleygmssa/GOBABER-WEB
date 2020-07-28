import React from 'react';

import {AuthProvider } from './Auth';
import {Toastprovider } from './Toast';

const AppProvider: React.FC = ({children}) =>{

    return(
        <AuthProvider>
            <Toastprovider>
                {children}
            </Toastprovider>
        </AuthProvider>
    )
}

export default AppProvider;