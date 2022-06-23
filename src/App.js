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
  const [files,setFiles] = useState([])
  const [joined,setjoined] = useState(false)
  const [msgs,setMsgs] = useState([])
  useEffect(()=>{
    if(joined){
      socket.on('msg',msgRecieved)
      socket.on('file',fileRecieved)

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
  function fileUploaded(event){

    try{
      socket.emit('file',event.xhr.response)
      console.log(event.xhr.response)
    }
    catch(err)
    {
      console.log(err)
    }
  }
  function fileRecieved(file){
    console.log('file='+file)
    setFiles(files=>[...files,JSON.parse(file)])
  }
  function join(id){
    try{
      const socket = io(url);
      setSocket(socket)
      socket.emit('join', id);
      setjoined(true)
    }
    catch(err){
      alert('most likley server is sleeping pls wake ', url, 'by visiting it')
    }
      
  }
  return (
    <div className="App">
   
    { !joined  && <JoinRoom join={join}/> }
      { joined && <Messages msgs={msgs} send={send} url={url} files={files} fileUploaded={fileUploaded}/>}
    </div>
  );
}

export default App;
