import React, { useState, useEffect } from 'react'
import { useChannelStateContext, useChatContext,Avatar } from 'stream-chat-react';

const Channeluser = ({channel1,settoggle,setuserlist}) => {
  const { channel } = useChannelStateContext();
 
  const { client } = useChatContext();
  const [channelUsers, setChannelUsers] = useState([]);

  var members = Object.values(channel.state.members)

  useEffect(() => {
    const updateChannelUsers = () => {
      // setChannelUsers(
      //   Object.values(channel.state.members).map((user) => ({
      //     name: user?.name,
      //     online:user?.user?.online,
      //   })),
      // );
    
   
      setChannelUsers(Object.values(channel.state.members))
    };
    updateChannelUsers();
  }, []);

  return (


    <ul className='users-list'>

      <div className="roles" >

        <div className="owners">
          <p className="header">Owner</p>
          {channelUsers.map((member,index) => (
            member.role === 'owner' && 
            <div className="userdetail" key={member?.user?.name}>

              <div className="name">
                -{member.role === 'owner' ?  member?.user?.name : ""}
              <Avatar 
                    image={members[index]?.user?.image}
                    name={members[index]?.user?.name || members[0]?.user?.id}
                    size={24}
                />
              
              </div>
              <div className={member?.user?.online?"status":"status1"}>

                {member.role === 'owner' ? member?.user?.online ? 'online' : 'offline' : " "}

              </div>
            </div>
          ))}

        </div>
        <div className="members">
          <p className="header">Members</p>
          {channelUsers.map((member,index) => (
            member.role !== 'owner' && member.role!=='admin' &&(
            <div className="userdetail" key={member?.user?.name}>
              <div className="name">
               -{member.role !== 'owner' ? member?.user?.name : ""}
              <Avatar 
                    image={members[index]?.user?.image}
                    name={members[index]?.user?.name || members[0]?.user?.id}
                    size={24}
                />
              </div>
              <div className={member?.user?.online?"status":"status1"}>

                {member.role !== 'owner' ? member?.user?.online ? 'online' : 'offline' : " "}

              </div>
            </div>)
          ))}
        </div>
        <div className="members">
          <p className="header">You</p>
          {channelUsers.map((member,index) => (
            member?.user?.id===client?.userID &&(
            <div className="userdetail" key={member?.user?.name}>
              <div className="name">
               -{ member?.user?.name}
              <Avatar 
                    image={members[index]?.user?.image}
                    name={members[index]?.user?.name || members[0]?.user?.id}
                    size={24}
                />
              </div>
              <div className={member?.user?.online?"status":"status1"}>

                { member?.user?.online ? 'online' : 'offline' }

              </div>
            </div>)
          ))}
        </div>

      </div>

    </ul>

  )
}

export default Channeluser
