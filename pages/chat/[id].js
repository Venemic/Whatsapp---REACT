import styled from 'styled-components';
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Chat({chat, messages}) {
    const [user] = useAuthState(auth);
    return (
        <Container>
            <Head>
                <title>Chat</title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages}/>
            </ChatContainer>
        </Container>
    )
}

export default Chat

export async function getServerSideProps(context) {
    // we are rendering any request on the server side so we dont have to wait 
    const ref = db.collection("chats").doc(context.query.id);
    // prep msgs on the server
    const messagesRes = await ref.collection("messages").orderBy("timestamp","asc")
    .get();
    const messages = messagesRes.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
    })).map((messages) => ({
        ...messages,
        timestamp : messages.timestamp.toDate().getTime(),
    }));

    // PREP THE CHATS
    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data(),
    }
    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        }
    }
}

const Container = styled.div`
    display:flex;

`;
const ChatContainer = styled.div`
        flex:1;overflow:scroll;
        height:100vh;
        ::-webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;
