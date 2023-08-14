import React,{useState} from 'react'
import {useChatContext,useChannelStateContext} from 'stream-chat-react'
import {CloseCreateChannel} from '../assets'
import {Userslist} from './'


const ChannelNameInput=({channelName="",setchannelName})=>{

  const handlechange=(e)=>{
    e.preventDefault();
    
    setchannelName(e.target.value)
  }
return(
  <div className="channel-name-input__wrapper">
    <p>Name</p>
    <input type="text" className=""  value={channelName} onChange={handlechange} placeholder='Channel Name' />
    <p>Add members</p>
  </div>
)
} 

const EditChannel = ({setIsEditing,createType,setToggleContainer,setCreateType,setIsCreating,channel1}) => {
  const {channel,client,setActiveChannel}=useChatContext();

  const [channelName, setchannelName] = useState(channel?.data?.name.slice(7,channel.length))
  const [selectedUsers, setselectedUsers] = useState([])
  
  const updatechannel=async(e)=>{

const namechanged=channelName!==(channel.data.name.slice(7,channel.length) || channel.data.id);
let text=channel?.data?.name.slice(0,7);
text=text+channelName;
if(namechanged){
  await channel.update({name:text},{text:`Channel name changed to ${channelName}`})
}
if(selectedUsers.length){
  await channel.addMembers(selectedUsers)
}
text=""
setchannelName(null)
setIsEditing(false)
setselectedUsers([])
}

const deletechannel=async(e)=>{
  e.preventDefault();
  let text=channel?.data?.name.slice(0,7);
text=text+channelName;
  await channel.delete({name:text})
  const filters = {
    type: 'team',
    members: { $in: [client.user.id, client.userID] },
  };
  const filters1= {
    type: 'messaging',
    members: { $in: [client.user.id, client.userID] },
  };

  const [existingChannel] = await client.queryChannels(filters);
  const [existingChannel1] = await client.queryChannels(filters1);

  if(existingChannel){
    await existingChannel.watch();
    setActiveChannel(existingChannel);
    setCreateType('team')
  }
  else if(existingChannel1){
    await existingChannel1.watch();
    setActiveChannel(existingChannel1);
    setCreateType('messaging')
  }
  else{
    setToggleContainer((p)=>!p)
  }
  setchannelName(null)
  setIsEditing(false)
  text=" "
  setselectedUsers([])
}
if(createType==='messaging'){
  return (
    <div className='edit-channel__container edit-channel__container1'>
    <div className="edit-channel__header">
      <p className="">Edit Channel</p>
      <CloseCreateChannel setIsEditing={setIsEditing} setToggleContainer={setToggleContainer} setIsCreating={setIsCreating}/>
    </div>
          <div className="edit-channel__button-wrapper" >
        
            <p className="delete" onClick={deletechannel}>Delete Channel</p>
          </div>
        
        </div>
  )
}
const leave=async ()=>{

  var members = Object.values(channel.state.members,"channelmembers")
  console.log(members)
  members.pop();
  const filters = {
    type: 'team',
    members: { $in: [client.user.id, client.userID] },
  };
  const filters1= {
    type: 'messaging',
    members: { $in: [client.user.id, client.userID] },
  };
await channel.removeMembers([client.userID]);
const [existingChannel] = await client.queryChannels(filters);
const [existingChannel1] = await client.queryChannels(filters1);

if(existingChannel){
  await existingChannel.watch();
  setActiveChannel(existingChannel);
  setCreateType('team')
}
else if(existingChannel1){
  await existingChannel1.watch();
  setActiveChannel(existingChannel1);
  setCreateType('messaging')
}
else{
  setToggleContainer((p)=>!p)
}
setIsEditing(false)
}
if(channel?.data?.created_by?.id!==client.userID){
  console.log(channel,"channle")
  return (
    <div className='edit-channel__container'>
    <div className="edit-channel__header">
      <p className="">Edit Channel</p>
      <CloseCreateChannel setIsEditing={setIsEditing} setToggleContainer={setToggleContainer} setIsCreating={setIsCreating}/>
    </div>
 
          <div className="edit-channel__button-wrapper" >
        
            <p className="delete" onClick={leave}>leave Channel</p>
          </div>
        
        </div>
  );
}
console.log(channel?.data?.created_by?.id,"channel details");

  return (
    <div className='edit-channel__container'>
<div className="edit-channel__header">
  <p className="">Edit Channel</p>
  <CloseCreateChannel setIsEditing={setIsEditing} setToggleContainer={setToggleContainer} setIsCreating={setIsCreating}/>
</div>
      <ChannelNameInput channelName={channelName} setchannelName={setchannelName}/>
      <Userslist setselectedUsers={setselectedUsers}/>
      <div className="edit-channel__button-wrapper" >
        <p className="" onClick={updatechannel}>Save changes</p>
        <p className="delete" onClick={deletechannel}>Delete Channel</p>
      </div>
    
    </div>
  )
}

export default EditChannel
