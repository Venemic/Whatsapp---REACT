import { Avatar, IconButton, Button } from '@material-ui/core';
import styled from 'styled-components';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon  from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore';
import Chat from './Chat';
import { useState } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Sidebar() {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState('');
    const useChatRef = db.collection('chats').where('users','array-contains', user.email); //goes to firstore database check where that email is 
    const [ChatsSnapshot] = useCollection(useChatRef);
    const createChat = () =>{
        const input = prompt('Please enter an email address');
        if(!input) return null; 
        if(EmailValidator.validate(input) && !ChatAlreadyExists(input) && input !== user.email ){
            // We need to add the chat into the db 'chats' collection
                db.collection('chats').add({
                    users: [user.email, input],
                })
        }

    };
    const ChatAlreadyExists = (recipientEmail) =>
       !!ChatsSnapshot?.docs.find((chat) => chat.data().users.find(user => user === recipientEmail)?.length >0);

    return (
        <Container>
            <HEADER>
            <UserAvatar src ={user.photoURL } onClick={()=> auth.signOut()}/>

            <IconsContainer >
                <IconButton style={{marginRight:"10px"}}>
                <SVG id="ee51d023-7db6-4950-baf7-c34874b80976" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35"><path fill="currentColor" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path></SVG>
                </IconButton>
                <IconButton style={{marginRight:"10px"}}>
                <ChatIcon />
                </IconButton>
                <IconButton style={{marginRight:"10px"}}>
                <MoreVertIcon />
                </IconButton>
            </IconsContainer >

            </HEADER>

                
            <Search>
                <Masterinput>
                    <IconsButton style={{marginLeft:'20px'}}>
                {!input? (<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" style={{flex: -1}} height="35" color="#919191"><path fill="currentColor" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path></SVG>):(<ArrowBack color="blue"/>)}
                </IconsButton>
                    <SearchInput placeholder="Search or start new chat" value={input} onChange={e => setInput(e.target.value)}/>
                    
                    </Masterinput>
            </Search>
            <SidebarButton onClick={createChat}>
                Start new chat
            </SidebarButton>

            {/*List of chats */}
            <div style={{cursor:'pointer'}}>
            {ChatsSnapshot?.docs.map(chat =>(
                <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
            ))}
            </div>
        </Container>
    );
}

export default Sidebar

const Container = styled.div`
            flex-grow: 1;
        border-right:1px solid whitesmoke;
        height: 100vh;
        min-width: 300px;
        max-width: 550px;
        overflow-y: auto;
`;
const HEADER = styled.div`
    display: flex;
    position: sticky;
    top:0;
    background-color:#EDEDED;
    z-index:1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height:80px;
    border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
        cursor:pointer;
        :hover{
            opacity:0.8;
        }
`;
const IconsButton = styled.div`cursor: pointer;`;
const IconsContainer = styled.div`
:hover{
            opacity:0.8;
        }`
;
const Search = styled.div`
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius:2px;       
        background-color:#EDEDED;
        flex-direction:row;
`;

const Masterinput = styled.div`
        display: flex;
        align-items: center;
        border-radius: 50px;   
        background-color:white;
        flex:1;
`;
const SearchInput = styled.input`
  outline-width:0;
  border:none;
  flex:1;  
  border-radius: 50px;
  text-align: left;
  margin-left:20px;
  text-decoration: #4a4a4a;
  word-wrap: break-word;
  min-height: 50px;
    font-size: 17px;
    line-height: 20px;
    white-space: pre-wrap;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
`;
const SidebarButton = styled(Button)`
        width:100%;
        &&&{border-top:1px solid whitesmoke;
        border-bottom:1px solid whitesmoke;}
`;
const SVG = styled.svg``;
const ArrowBack = styled(ArrowBackIcon)`
        color:#00a5f4;
        pointer-events: none;
        animation-timing-function:ease-in;
        
`;
