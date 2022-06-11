import './App.css';
import React,{useState,useEffect} from 'react';
import JoinRoom from './components/JoinRoom'
import Messages from './components/Messages'
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { io } from "socket.io-client";

function App() {
  let url= ''
  if(process.env.NODE_ENV==='development')
    url = 'http://localhost:8080/'
  else
    url='https://beamer-mobile.herokuapp.com/'
  console.log(url)
  const [socket,setSocket] = useState('')
  const [joined,setjoined] = useState(false)
  const [msgs,setMsgs] = useState([])
  useEffect(()=>{
    if(joined){
      socket.on('msg',msgRecieved)
      console.log('listenning to msgs')
    }
  },[joined])
  function msgRecieved(msg){
    console.log('msgs is',msg)
    setMsgs(msgs=>[...msgs,msg])
  }
  function send(msg){
    socket.emit('msg',msg)
    console.log(msg)
  }
  function join(id){
      const socket = io(url);
      setSocket(socket)
      socket.emit('join', id);
     setjoined(true)
      
  }
  return (
    <div className="App">
    { !joined  && <JoinRoom join={join}/> }
      { joined && <Messages msgs={msgs} send={send} />}
    </div>
  );
}

export default App;
