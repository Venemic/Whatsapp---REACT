import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { auth, provider } from '../firebase';
function Login() {
    const signin = () =>{
        auth.signInWithPopup(provider).catch(alert);
    };
    return (
        <Container>
                <Header>
                    <title>Login</title>
                </Header>
                <LoginContainer>
                        <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/897px-WhatsApp.svg.png"/>
                        <Button variant="outlined" onClick={signin}>
                            Signin with Google
                        </Button>
                </LoginContainer>
        </Container>
    )
}

export default Login

const Container = styled.div`
        display:grid;
        place-items:center;
        height: 100vh;
        background-color:whitesmoke;
`;
const Header = styled.head``;
const LoginContainer = styled.div`
        display:flex;
        flex-direction:column;
        padding:100px;align-items:center;
        background-color:white;
        border-radius:5px;
        box-shadow: 8px 4px 14px -3px rgba(0, 0, 0.7,0.7);

`;
const Logo = styled.img`width:200px;height:200px;margin-bottom:20px;`;