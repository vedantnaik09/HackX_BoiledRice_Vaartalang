// import {MultiChatSocket, MultiChatWindow, useMultiChatLogic} from 'react-chat-engine-advanced'
// const ChatsPage = (props) =>{
//     const chatProps = useMultiChatLogic('287e0b40-982f-429b-a7f8-cde946157404',props.user.username, props.user.secret)
//     return <div style={{height:"100vh"}}>
//         <MultiChatSocket {...chatProps}/>
//         <MultiChatWindow {...chatProps} style={{height:"100%"}} />

//     </div>
// }

// export default ChatsPage
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { useSelector } from "react-redux";
const project_id = "287e0b40-982f-429b-a7f8-cde946157404";
const ChatsPage = (props) => {
  const user = useSelector((state) => state.counter.user);
  fetch("https://api.chatengine.io/chats/", {
    headers: {
      projectId: project_id,
      user_name: user.username,
      "user-secret": user.secret,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("req sent successfully");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
  return (
    <div style={{ height: "100vh" }}>
      <PrettyChatWindow
        projectId={project_id}
        userName={user.username}
        secret={user.secret}
        style={{ height: "100vh" }}
        onNewMessage={async (conn, msg) => {
          try {
            // Send incoming message data to your API
            const response = await axios.post(
              "http://localhost:8001/api/translate_input_to_spanish",
              msg
            );

            // Update message content or UI based on API response (optional)
            msg.content = response.data.modifiedContent; // Example modification

            // Display the message to the user
            conn.sendMessage(msg);
          } catch (error) {
            console.error("Error sending data to API:", error);
            // Handle the error gracefully, e.g., display an error message to the user
          }
        }}
      />
      {}
    </div>
  );
};

export default ChatsPage;
