import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'
import { CloseCreateChannel } from '../assets'
import {Userslist} from './';

const ChannelNameInput=({channelName="",setchannelName})=>{

  const handlechange=(e)=>{
    e.preventDefault();
    setchannelName(e.target.value)
  }
return(
  <div className="channel-name-input__wrapper">
    <p>Name</p>
    <input type="text" className=""  value={channelName} onChange={handlechange} placeholder='Channel Name' required />
    <p>Add members</p>
  </div>
)
}

const CreateChannel = ({createType,setIsCreating,setToggleContainer}) => {
  const {client,setActiveChannel}=useChatContext();
  const [selectedUsers, setselectedUsers] = useState([client.userID || ' '])
  const [channelName,setchannelName]=useState('')
  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
  const createchannel= async (e)=>{
  e.preventDefault();
  try {
    if(!channelName.length && createType==='team'){
      alert("First Enter Channel Name")
      return ;
    }
   let text= makeid(7);
   text=text+channelName

    const newChannel=await client.channel(createType,text,{
      name:text,members:selectedUsers
    })
    text=" ";
    await newChannel.watch();
    setchannelName('');
    setIsCreating(false);
    setselectedUsers([client.userID || ' '])
    setActiveChannel(newChannel)
  } catch (error) {
    console.log(error)
  }
  }
  return (
   <div className="create-channel__container  ">
    <div className="create-channel__header">
      <p className="">
        {createType==='team'?'Create a Channel' :' Send a Direct Message'}
      </p>
      <CloseCreateChannel setIsCreating={setIsCreating}   setToggleContainer={setToggleContainer}/>
    </div>
    {createType==='team' && <ChannelNameInput channelName={channelName} setchannelName={setchannelName}/> }
    <Userslist setselectedUsers={setselectedUsers} selectedUsers={selectedUsers}/>
    <div className="create-channel__button-wrapper" onClick={createchannel} >
      <p>{createType==='team'?'Create Channel':'Create Message Group'}</p>
    </div>
   </div>
  )
}

export default CreateChannel
