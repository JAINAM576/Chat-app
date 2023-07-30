import React, { useState } from 'react';
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react';

import { ChannelInfo } from '../assets';
import usersicon from '../assets/usersicon.png'
import {Channeluser} from './'


export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing ,setToggleContainer,toggle1,settoggle,channel1}) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();
const [t,sett]=useState(false)
const [k, setk] = useState(1)
if(t && k===1){
  var j=document.getElementsByClassName('str-chat__thread-header-subtitle')[0]?.innerHTML;


  document.getElementsByClassName('str-chat__thread-header-subtitle')[0].innerHTML=   j.slice(7, j.length);

  setk(-1)


}

  
  const overrideSubmitHandler = (message) => {
  
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };
    
    if (giphyState) {
    
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }
    
    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      {
      document.getElementsByClassName('str-chat__thread-header-subtitle')[0]?.innerHTML && k===1?
    sett(true):''
       }
      <div style={{ display: 'flex', width: '100%' }}>
        <Window>
          <TeamChannelHeader  setIsEditing={setIsEditing} setToggleContainer={setToggleContainer} toggle1={toggle1} settoggle={settoggle} channel1={channel1}/>
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
      
          <Thread />
    
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = ({ setIsEditing,setToggleContainer,toggle1,settoggle,channel1 }) => {
    const { channel, watcher_count } = useChannelStateContext();
    const { client } = useChatContext();

    const toggle=()=>{
        setToggleContainer((prev)=>!prev)
  
    }
    const MessagingHeader = () => {
      const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
      const additionalMembers = members.length - 3;
  
      if(channel.type === 'messaging') {
        return (
          <div className='team-channel-header__name-wrapper'>
               <div className="hamburger" onClick={toggle}>

<div className="first"></div>
<div className="first"></div>
<div className="first"></div>
            </div>
    
 
            {members.map(({ user }, i) => (
              <div key={i} className='team-channel-header__name-multi'>
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className='team-channel-header__name user'>{user.fullName || user.id}</p>
              </div>
            ))}
                <span style={{ display: 'flex' ,cursor:'pointer' }} onClick={() => setIsEditing(true)}>
            <ChannelInfo />
          </span>
  
            {additionalMembers > 0 && <p className='team-channel-header__name user'>and {additionalMembers} more</p>}
          </div>
        );
      }
  
      return (
        <div className='team-channel-header__channel-wrapper'>
            
                    
                        <div className="hamburger" onClick={toggle}>

            <div className="first"></div>
            <div className="first"></div>
            <div className="first"></div>
                        </div>
                
             
            
          <p className='team-channel-header__name'># {channel?.data?.name.slice(7,channel.length) || channel?.data?.fullName.slice(7,channel.length)} </p>
         {
channel?.data?.created_by?.id===client.userID &&
          <span style={{ display: 'flex' }} onClick={() => setIsEditing(true)}>
            <ChannelInfo />
          </span>
    }
        </div>
      );
    };
  
    const getWatcherText = (watchers) => {
      if (!watchers) return 'No users online';
      if (watchers === 1) return '1 user online';
      return `${watchers} users online`;
    };

    const [userlist, setuserlist] = useState(false)
    return (
      <div className='team-channel-header__container'>
        <MessagingHeader />
        <div className='team-channel-header__right'>
          <p className='team-channel-header__right-text'>{getWatcherText(watcher_count)}</p>
       {channel.type==='team'?   <img src={usersicon} style={{cursor:'pointer'}} alt='users' onClick={()=>{setuserlist((userlist)=> !userlist)
         settoggle((set)=>!set)
      

      
        
          }}/>:
          " "}
        </div>
        {channel.type==='team'? userlist &&  <>

         <div className="userlist">
<div className="hamburger2" onClick={()=>{ settoggle((prev)=>!prev)
setuserlist((previ)=>!previ)}}>
  <div className="cross" ></div>
 
</div>
        {userlist?<Channeluser channel1={channel1} setuserlist={setuserlist} settoggle={settoggle}/>:""}
        </div></>:" "
}
      </div>
    );
  };

  export default ChannelInner;