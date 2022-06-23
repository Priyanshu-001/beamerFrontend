import React,{useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';


export default function Messages({msgs,send,url,files,fileUploaded}){
	const [msg,setMsg] = useState('')

	return (
		<>
		
			<h1> Send or recieve msgs </h1>
			<InputText value={msg} onChange={e=>setMsg(e.target.value)}/>
			<Button label="send msg" onClick={()=>send(msg)}/>
			{msgs.map(msg=>(
					<div style={{marginTop:'1rem'}}> {msg} </div>
				))}
		<div>
		{url}
			<h1>Send files</h1>
			<FileUpload name="file" url={`${url}upload`} onUpload={fileUploaded} mode="basic" emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}  />
			<h2>Recieved Files</h2>
			
			{files.map(file=>(
				<>
					<a href={url+'files/'+file.url} target='_external' download> {file.name}</a>
					<br/>
				</>
				)
			)}
		</div>
		</>
		)


}