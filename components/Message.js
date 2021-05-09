
import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../firebase';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { useState } from 'react';

function Message({user, message}) {
    const [userLoggedIn] = useAuthState(auth);
    const condition = user === userLoggedIn.email;
    const TypeOfMessage = condition ? Reciever: Sender;
    let firstmsg = true;
    return (
        <Container>
           { /* message.user === userLoggedIn.email ? firstmsg? firstmsg=false;*/}
                    {/*message.user === userLoggedIn.email ? firstmsg=false: firstmsg=true}
                      {firstmsg ? 
                      (<firstReciever>
                          {message.message} 
                        <Time>
                            {message.timestamp ? moment(message.timestamp).format('LT'): ""}
                            {user === userLoggedIn.email ?  (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15" fontSize= '20' color= '#039be5'><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>): ""}
                        </Time>
                      </firstReciever>) :
                      (<firstSender>
                          {message.message} 
                        <Time>
                            {message.timestamp ? moment(message.timestamp).format('LT'): ""}
                            {user === userLoggedIn.email ?  (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15" fontSize= '20' color= '#039be5'><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>): ""}
                        </Time>
                      </firstSender>)
                      */}
                      
                       {firstmsg &&  (<TypeOfMessage>
                        {message.message} 
                        <Time>
                            {message.timestamp ? moment(message.timestamp).format('LT'): ""}
                            {user === userLoggedIn.email ?  (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15" fontSize= '20' color= '#039be5'><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>): ""}
                        </Time>

                        </TypeOfMessage>)}
        </Container>
    )
}

export default Message

const Container = styled.div`
    text-rendering: optimizeLegibility;
`;
const MessageElement = styled.p`
    width:fit-content;
    padding: 12px;
    border-radius:15px;
    margin: 10px;
    min-width: 60px;
    position: relative;
    font-family: Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;
    color: #4a4a4a;
    text-align: right;
    display:flex;
    flex-wrap:wrap;
    flex-direction: row;
    align-items: center;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    


`;
const Time = styled.span`
        font-size:13px;
        color:gray;
        display:flex;
        margin-left:20px;
        margin-bottom:-25px;
`;

const Sender = styled(MessageElement)`
    
    background-color: whitesmoke;
    text-align:left;
    z-index:1;
`;
const firstSender = styled(MessageElement)`
    background-color: whitesmoke;
    text-align:left;
    z-index:1;
      :before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 15px solid transparent;
  border-right: 15px solid #F5F5F5;
  border-top: 15px solid #F5F5F5;
  border-bottom: 15px solid transparent;
  left: -10px;
  top: 0px;
  z-index: -1;
}
`;

const Reciever = styled(MessageElement)`
    margin-left:auto;
    background-color:#dcf8c6;
`;
const firstReciever = styled(MessageElement)`
    margin-left:auto;
    background-color:#dcf8c6;
        :before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 15px solid #dcf8c6;
  border-right: 15px solid transparent;
  border-top: 15px solid #dcf8c6;
  border-bottom: 15px solid transparent;
  right: -10px;
  top: 0px;
}
`;