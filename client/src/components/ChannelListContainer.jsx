import React,{useState,useEffect} from 'react'
import { ChannelList ,useChatContext} from 'stream-chat-react'
import { ChannelSearch,TeamChannelList,TeamChannelPreview } from './'
import Cookies from 'universal-cookie'
import icon from '../assets/icon.png'
import logout from '../assets/logout.png'

const cookies=new Cookies();
const Sidebar=({logout1})=>(
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={icon}  alt="Chat" width={30}/>
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout1}>
                <img src={logout}  alt="logout" width={30}/>
            </div>
        </div>
    </div>
)
const CompanyHeader=({setToggleContainer})=>{
    const toggle=()=>{
        setToggleContainer((prev)=>!prev)
     
    }
return (
    <div className="channel-list__header">
        <p className="channel-list__headr__text">Chat Application</p>
        
        
        <div className="hamburger1" onClick={toggle}>

<div className="cross rightside"></div>
</div>
    </div>
)
}

const CustomChannelTeamFilter=(channels)=>{
    return channels.filter((channel)=>channel.type==='team')
}
const CustomChannelMessageFilter=(channels)=>{
    return channels.filter((channel)=>channel.type==='messaging')
}
const ChannelListContent = ({isCreating,setIsCreating,setCreateType,setIsEditing,setToggleContainer}) => {
    // isCreating={isCreating}
    // setIsCreating={setIsCreating}
    // setCreateType={setCreateType}
    // setIsEditing={setIsEditing}
    const {client}=useChatContext();
    const logout1=()=>{
        cookies.remove('token');
        cookies.remove('userId');
        cookies.remove('Username',)
        cookies.remove('AvatarURL')
        cookies.remove('fullName',)
        cookies.remove('PhoneNumber')
        cookies.remove('haseshpass')
        window.location.reload();
    }
    const filters={members:{$in:[client.userID]} }
  return (
    <>
    <Sidebar logout1={logout1}/>
    <div className="channel-list__list__wrapper">

    <CompanyHeader setToggleContainer={setToggleContainer}/>
    <ChannelSearch setToggleContainer={setToggleContainer}/>
    <ChannelList
    filters={filters}
    channelRenderFilterFn={CustomChannelTeamFilter}
    List={(listProps)=>(
<TeamChannelList
{...listProps}
type="team"
isCreating={isCreating}
setIsCreating={setIsCreating}
setCreateType={setCreateType}
setToggleContainer={setToggleContainer}
setIsEditing={setIsEditing}
/>
    )}
    Preview={(previewProps)=>(
        <TeamChannelPreview 
        {...previewProps}
        type="team"
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
        setToggleContainer={setToggleContainer}
        />
    )}
    />
    <ChannelList
    filters={filters}
    channelRenderFilterFn={CustomChannelMessageFilter}
 

    List={(listProps)=>(
<TeamChannelList
{...listProps}
type="messaging"
isCreating={isCreating}
setIsCreating={setIsCreating}
setCreateType={setCreateType}
setIsEditing={setIsEditing}
setToggleContainer={setToggleContainer}
/>
    )}
    Preview={(previewProps)=>(
        <TeamChannelPreview 
        {...previewProps}
        type="messaging"
        isCreating={isCreating}
setIsCreating={setIsCreating}
setCreateType={setCreateType}
setIsEditing={setIsEditing}
setToggleContainer={setToggleContainer}
        />
    )}
    />
    </div>

    </>
  )
}

const ChannelListContainer=({isCreating,setIsCreating,setCreateType,setIsEditing,setToggleContainer,ToggleContainer,toggle,settoggle})=>{
//  const {client,serverClient}=useChatContext();
        //  useEffect(() => {
        //      const getusers=async ()=>{
          
// await client.partialUpdateUser({id:client.userID, set: {role: "admin"}})
// const { grants } = await client.getChannelType("messaging");

// update "channel_member" role grants in "messaging" scope
// await client.updateChannelType("messaging", {
//   grants: {
//     channel_member: [
//       "read-channel",         // allow access to the channel
//       "create-message",       // create messages in the channel
//       "update-message-owner", // update own user messages
//       "delete-message-owner", // delete own user messages
//     ],
//   }



// const update = await serverClient.updateUser({
//     id: client.userID,
  
//     role: 'admin',
// });
// const permissions = [
//   new Permission("Admin users can perform any action", 600, AnyResource, ["admin"], false, Allow),
//   new Permission("Anonymous users are not allowed", 500, AnyResource, ["anonymous"], false, Deny),
//   new Permission("Users can modify their own messages", 400, ["UpdateMessage"], ["user"], true, Allow),
//   new Permission("Users can create channels", 300, ["CreateChannel"], ["user"], false, Allow),
//   new Permission("Channel Members", 200, ["ReadChannel", "CreateMessage"], ["channel_member"], false, Allow),
//   new Permission("Discard all", 100, AnyResource, AnyRole, false, Deny),
// ];

// await client.updateChannelType("messaging", {permissions});




    // }
    // if(client) getusers();
    //    }, [])
    let styles={
        display:toggle?"none":"flex",
    }
return (
    <>
    <div className="channel-list__container" style={styles}>
    <ChannelListContent
     isCreating={isCreating}
     setIsCreating={setIsCreating}
     setCreateType={setCreateType}
     setIsEditing={setIsEditing}
     setToggleContainer={setToggleContainer}
    />
    </div>
    <div className="channel-list__container-responsive" style={{left:!ToggleContainer?'0%':'-70%',backgroundColor:"#005fff"}}>
        <div className="channerl-list__container-toggle" onClick={()=>{setToggleContainer((prev)=>!prev)}}>
            
        </div>
        <ChannelListContent
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
        setToggleContainer={setToggleContainer}
       />
    </div>
    
    </>
)
}

export default ChannelListContainer
