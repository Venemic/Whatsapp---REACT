import { Avatar } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import { useState } from 'react';
import firebase from "firebase";
import getRecipientEmail from '../utils/getRecipientEmail';
import SendIcon from '@material-ui/icons/Send';
import Message from './Message';
import moment from 'moment';

function ChatScreen({chat, messages}) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState('');
    const router = useRouter();
    const[messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp","asc"));

    const showMessages = () =>{
            if(messagesSnapshot){
                return messagesSnapshot.docs.map((mes) =>(
                    <Message  
                        key={mes.id}
                        user={mes.data().user}
                        message={{
                            ...mes.data(),
                            timestamp: mes.data().timestamp?.toDate().getTime(),
                        }}
                    />
                ));
            }
            return JSON.parse(messages).map((message) => (
				<Message key={message.id} user={message.user} message={message} />
			));
    };   
    const sendMessage = (e) =>{
            e.preventDefault();

            db.collection("users").doc(user.uid).set({
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },{merge: true});


            db.collection("chats").doc(router.query.id).collection("messages").add({
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                user: user.email, 
                photoURL: user.photoURL,
            });
            setInput('');
    };
    const recipientEmail = getRecipientEmail(chat.users, user);
    const [recipientSnapshot] = useCollection(db.collection('users').where('email','==', recipientEmail));
    const recipient = recipientSnapshot?.docs?.[0]?.data();
   return (
        <Container>
                    <Header>
                            {recipient ? (
                            <Avatar src={recipient?.photoURL} style={{borderRadius: '50%', marginTop: '15px', marginLeft:'10px', width: '50px', height: '50px'}}/>
                        ) : (
                            <Avatar style={{borderRadius: '50%'}}>{recipientEmail[0]}</Avatar>
                        )}
                            <HeaderInfo>
                                <h3>{recipientEmail}</h3>
                                {recipientSnapshot ? (
                                    <SeenStatus>
                                        Last active: {moment(recipient.lastSeen.toDate().getTime()).format('LT')}
                                    </SeenStatus>
                                ) : (
                                    <SeenStatus>Loading last active...</SeenStatus>
                                )}
                            </HeaderInfo>
                            <HeaderIcons>
                                <IconsButton style={{marginTop: '20px', marginRight: '20px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35" color="#919191"><path fill="currentColor" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
                                </IconsButton>
                                <IconsButton style={{marginTop: '20px', marginRight: '20px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35" color="#919191"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                                </IconsButton>

                            </HeaderIcons>
                    </Header>
                    <MessageConatainer>
                       {showMessages()}
                    </MessageConatainer>

                    <InputContainer>
                    <IconsButton style={{marginLeft:'10px'}}>
                        
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35" color="#919191"><path fill="currentColor" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path></svg>
                    </IconsButton>
                     <IconsButton style={{marginLeft:'20px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35" color="#919191"><path fill="currentColor" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg>
                    </IconsButton>
                    <Input placeholder="Type a message" value={input} onChange={e => setInput(e.target.value)}/> 
                    <button hidden disabled={!input} type="submit">Send</button>
                    <IconsButton style={{marginLeft:'20px'}}> 
                       { !input ?(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35" color="#919191"><path fill="currentColor" d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"></path></svg>  ): 
                       (<IconsButton onClick={sendMessage}>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35" color="#919191"><path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
                             </IconsButton>)}
                    </IconsButton>         
                      
                    </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
    flex: 1 1 auto;
    min-height: 12px;
`;
const Header = styled.div`
    position:sticky;
    background-color: #EDEDED;
    z-index: 100;top:0;
    display:flex;
    padding: 8px;
    border-bottom: 1px solid whitesmoke;
`;
const HeaderIcons = styled.div`
        display: flex;
        
`;
const HeaderInfo = styled.div`
    margin-left:15px;
    margin-top:-25px;
    flex-wrap:wrap;
    flex:1;
    > h3{
        margin-bottom:1px;
    }
    > p{
        font-size: 16px;color: gray;
    }
`;
const IconsButton = styled.div`cursor: pointer;`;
const MessageConatainer = styled.div`
    padding:30px;
    background-color:#e5ded8;
    min-height: 90vh;
`;
const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding:10px;
    position:sticky;
    bottom:0;
    background-color:#EDEDED;
    z-index:100;
    flex:sapace-between;
`;
const Input = styled.input`
        flex:1;
        padding:10px;
        height:50px;
        border-radius:20px;
        text-decoration-color: gray;
        font-size: 20px;
        position:sticky;
        bottom:0;
        background-color:white;
        border:none;
        margin-left:15px;
        margin-right:15px;
        outline:0;
`;
const SeenStatus = styled.p`
    color:#00a5f4;
`;