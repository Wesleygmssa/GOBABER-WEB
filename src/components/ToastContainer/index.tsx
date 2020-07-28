import React, { useCallback } from 'react';
import { Container} from './styles';
import { ToastMessage, useToast } from '../../hooks/Toast';
import  Toast from './Toast';

interface ToastConatinerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastConatinerProps> = ({ messages }) => {
    return (
        <Container>
            {messages.map(message => {
                return (
                    <Toast
                        key={message.id}
                        message={message} />
                )
            })}

        </Container>
    )
}

export default ToastContainer;