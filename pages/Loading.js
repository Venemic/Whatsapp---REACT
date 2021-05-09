import {Circle} from "better-react-spinkit";
import firebase from "firebase"

function Loading() {
    return (
        <center style={{display:"grid",placeholder: "center",height:"100vh"}}>
             <div>
                    <img alt="" height={200} style={{marginBottom:10}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/897px-WhatsApp.svg.png"/>
            </div>
            <Circle color="#4BC55A" size={60} />
        </center>
       
    )
}

export default Loading

