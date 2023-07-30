import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type,setCreateType }) => {
    const { channel:activeChannel, client } = useChatContext();

    const ChannelPreview = ({setCreateType}) => (
        <p className="channel-preview__item" onClick={()=>{setCreateType('team')
      
        }}>
            
               
                # {channel?.data?.name.slice(7,channel.length) || channel?.data?.id}
            
            
        </p>
    );


    const DirectPreview = ({setCreateType}) => {
        // const { channel:activechannel, client } = useChatContext();

        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    


        return (
            <div className="channel-preview__item single" onClick={()=>{setCreateType('messaging')
      
            }}>
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.name || members[0]?.user?.id}
                    size={24}
                />
                <p >{members[0]?.user?.name || members[0]?.user?.id}</p>
            </div>
        )
    }


    return (
        <div className={
            channel?.id === activeChannel?.id
                ? 'channel-preview__wrapper__selected'
                : 'channel-preview__wrapper'
        }
        onClick={() => {
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel);
            if(setToggleContainer) {
                setToggleContainer((prevState) => !prevState)
            }
        }}
        >
            {type === 'team' ? <ChannelPreview setCreateType={setCreateType}/> : <DirectPreview  setCreateType={setCreateType}/>}
        </div>
    );
}

export default TeamChannelPreview