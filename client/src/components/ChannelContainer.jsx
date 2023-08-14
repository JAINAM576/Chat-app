import React from 'react'
import {Channel,useChatContext,MessageSimple} from 'stream-chat-react'
import {ChannelInner,CreateChannel,EditChannel} from './'
const ChannelContainer = ({isCreating,setIsCreating,isEditing,setIsEditing,createType,setToggleContainer,ToggleContainer,toggle1,settoggle,setCreateType,channel1}) => {
  const {channel,client}=useChatContext();


  if(isCreating){
return(
  <div className="channel__container" >

    <CreateChannel createType={createType} setIsCreating={setIsCreating} setToggleContainer={setToggleContainer}/>
  </div>
  ) 
  }
  if(isEditing ) {
return(
   <div className="channel__container">

   
<EditChannel createType={createType} channel1={channel1} setToggleContainer={setToggleContainer} setCreateType={setCreateType} setIsCreating={setIsCreating} setIsEditing={setIsEditing}/>
  </div>
) 

  }
  const EmptyState=()=>(
   <div className="channel-empty__container">
    <p className="channel-empty__first">This is the beggining of your chat history.</p>
    <p className="channel-empty__second">Send messages,links,emojis, attachment and more! </p>
   </div> 
  )

  let styles={
    width:toggle1? "var(--width)":'100%',
    
  }
  

  
  return (
<div className="channel__container" style={styles}>
  <Channel
  EmptyStateIndicator={EmptyState}
  Message={(messageprops,i)=><MessageSimple key={i} {...messageprops}/>}
  >
    <ChannelInner setIsEditing={setIsEditing} setToggleContainer={setToggleContainer} toggle1={toggle1} settoggle={settoggle} channel1={channel}/>
  </Channel>
</div>
  )
}

export default ChannelContainer
