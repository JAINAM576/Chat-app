import React,{useState} from 'react'
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';

// import ChannelContainer from './components/ChannelContainer';
// import ChannelListContainer from './components/ChannelListContainer';

import {ChannelContainer,ChannelListContainer,Auth} from './components'
import './App.css'
import 'stream-chat-react/dist/css/index.css'
import StarsCanvas from './components/stars';


const cookies=new Cookies();
const authtoken=cookies.get('token');
const api_key='aaxqdspgvrt9';
const client=StreamChat.getInstance(api_key);
if(authtoken){
  client.connectUser({
  id: cookies.get('userId'),
  name: cookies.get('Username'),
  image:cookies.get('AvatarURL'),
  fullName: cookies.get('fullName'),
PhoneNumber:cookies.get('PhoneNumber'),
  haseshpass:cookies.get('haseshpass'),
},authtoken)
}



const App = () => {
const [isCreating,setIsCreating]=useState(false);
const [isEditing,setIsEditing]=useState(false);
const [createType,setCreateType]=useState('team');
const [ToggleContainer, setToggleContainer] = useState(false)
const [toggle,settoggle]=useState(false)

  if(!authtoken) return (
<div className="relative">

  <Auth/>
  <StarsCanvas/>
</div>

  
  ) 


  if(toggle){

    document.getElementsByClassName('str-chat__input-flat')[0].style.zIndex="-1";
  
   
  }
else {
  if( document.getElementsByClassName('str-chat__input-flat')[0]){
  document.getElementsByClassName('str-chat__input-flat')[0].style.zIndex="1";
  }

}
  

  
  return (
    <div className='app__wrapper'>
      
      <Chat client={client} theme='team light '>
        <ChannelListContainer
        isCreating={isCreating}
setIsCreating={setIsCreating}
setCreateType={setCreateType}
setIsEditing={setIsEditing}
ToggleContainer={ToggleContainer}
setToggleContainer={setToggleContainer}
settoggle={settoggle}
toggle={toggle}
        />
<ChannelContainer
isCreating={isCreating}
setIsCreating={setIsCreating}
isEditing={isEditing}
setIsEditing={setIsEditing}
setCreateType={setCreateType}
createType={createType}
ToggleContainer={ToggleContainer}
setToggleContainer={setToggleContainer}
toggle1={toggle}
settoggle={settoggle}

/>        
      </Chat>
    </div>
  )
}

export default App

