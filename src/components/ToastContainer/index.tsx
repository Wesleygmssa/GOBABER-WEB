import React from 'react';
import { Container} from './styles';
import { ToastMessage} from '../../hooks/Toast';
import  Toast from './Toast';
import {useTransition} from 'react-spring';

interface ToastConatinerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastConatinerProps> = ({ messages }) => {

    const messegeswithTransitions = useTransition(
       messages,
       message => message.id,
       {
        from: {right: '-120%', transform:'rotateX(180deg)'},
        enter:{right: '0%',  transform:'rotateX(0deg)'},
        leave: {right: '-120%', transform:'rotateX(180deg)'},
       }
       
       )

    return (
        <Container>
            {messegeswithTransitions.map(({item, key, props}) => {
                return (
                    <Toast
                        key={key}
                        message={item}
                        style={props}
                        />
                )
            })}

        </Container>
    )
}

export default ToastContainer;