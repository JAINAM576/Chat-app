import React,{useEffect,useState} from 'react'
import { InviteIcon } from '../assets'
import { Avatar,useChatContext } from 'stream-chat-react'
const ListenContainer=({children,user,loading,setselectedUsers,selectedUsers})=>{
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {loading?<div className='user-list__message'>
Loading Users...
      </div>:
        
  user?.map((element) => 
    
  (  <UserItem key={element.id} setselectedUsers={setselectedUsers} selectedUsers={selectedUsers} user={element} role={element.role}/>)
  )
  
  
  
  
}
    </div>
  )
}
const UserItem=({user,setselectedUsers,selectedUsers,role})=>{

  const [selected, setselected] = useState(false)
  const handlechange=()=>{
    if(selected){
setselectedUsers((prevusers)=>prevusers.filter((prevuser)=>prevuser!==user.id))
    }
    else{
setselectedUsers((prevusers)=>[...prevusers,user.id])
    }
    setselected((prev)=>!prev)
  }

  return(
    <div className="user-item__wrapper" onClick={handlechange}>
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.name || user.id} size={32}/>
{

     role==='admin'?( <p className='user-item__name'>{user.name || user.id}
     <div className="status2">Admin</div>
     </p>):   <p className='user-item__name'>{user.name || user.id}</p>
}
 
      </div>
    {selected?  <InviteIcon/>
     : <div className="user-item__invite-empty"/>  }
    </div>
  )
}
const Userslist = ({setselectedUsers,selectedUsers}) => {
  const {client}=useChatContext();
  const [loading,setloading]=useState(false)
  const [users, setusers] = useState([])
  const [empty, setempty] = useState(false)
  const [error, seterror] = useState(false)
 useEffect(() => {
  const getusers=async ()=>{
if(loading) return ;

setloading(true)
try {
  const response=await client.queryUsers(
{id:{$ne:client.userID}},
{id:1},
{limit:50}
  );
  if(response.users.length){
    setusers(response.users);
  
  }
  else{
    setempty(true)
  }
} catch (error) {
seterror(true)
}
setloading(false)
  }
  if(client) getusers();
 }, [])
 
 if(error){
  return(
    <ListenContainer>

    <div className='user-list__message'>
Error loading ,please refresh and try again
      </div>
    </ListenContainer>
  )
 }
 if(empty){
  return(
    <ListenContainer>

    <div className='user-list__message'>
      No user found
      </div>
    </ListenContainer>
  )
 }

  return (
    <>
   
      {/* {loading?(<div className='user-list__message'>
Loading Users...
      </div>):(
        
  users?.map((element) => 
    
    (<UserItem key={element} user={element}/>)
  )

        
      
      )
        } */}
  

  <ListenContainer  setselectedUsers={setselectedUsers}  selectedUsers={selectedUsers} user={users} loading={loading} />

  
    
        </>
  )
}

export default Userslist
