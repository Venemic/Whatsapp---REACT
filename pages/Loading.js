import {Circle} from "better-react-spinkit";
import styled from 'styled-components';
function Loading() {
    return (
        <Center >
             <div>
                    <img alt="" height={200} style={{marginBottom:10}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/897px-WhatsApp.svg.png"/>
                    
            </div>
           <Circle color="#4BC55A" size={60} />
        </Center>
       
    )
}

export default Loading


const Center = styled.section`
    overflow: hidden;
    display:flex;
    flex-direction: column;
    justify-content: center;
     align-items: center;
     margin-top:250px;
`;