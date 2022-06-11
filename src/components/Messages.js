import React,{useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

export default function Messages({msgs,send}){
	const [msg,setMsg] = useState('')

	return (
		<>
			<h1> Send or recieve msgs </h1>
			<InputText value={msg} onChange={e=>setMsg(e.target.value)}/>
			<Button label="send msg" onClick={()=>send(msg)}/>
			{msgs.map(msg=>(
					<div style={{marginTop:'1rem'}}> {msg} </div>
				))}
		</>
		)


}