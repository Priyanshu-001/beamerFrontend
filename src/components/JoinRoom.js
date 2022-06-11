import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import React from 'react';

import {useState} from 'react';
export default function JoinRoom({join}){
	const [id,setId] = useState('')
	return (
		<>
			<InputText value={id} onChange={(e)=>setId(e.target.value)} />
			<Button label="join" icon="pi pi-send" onClick={()=>join(id)} />
		</>
		)
}