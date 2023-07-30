import React, { useEffect, useState } from 'react'
import { useChatContext } from 'stream-chat-react'
import { SearchIcon } from '../assets'
import { ResultsDropDown } from './'
const ChannelSearch = ({ setToggleContainer }) => {
    const { client, setActiveChannel } = useChatContext()

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [teamChannels, setteamChannels] = useState([])
    const [directChannels, setdirectChannels] = useState([])
    useEffect(() => {
        if (!query) {
            setteamChannels([])
            setdirectChannels([])
        }
    }, [])

    const [blu, setblu] = useState(true)
    const getChannel = async (text) => {
        try {
            const channels1 = await client.queryChannels({
                type: "team",

                members: { $in: [client.userID] }
            })
           
            var si = 0;
            var max;
            var maximum = -1;
            var text1=text;

      
            channels1.forEach(element => {
                let temp = "";
                temp = element.data.name.slice(7, element.data.name.length);
                for (let i = 0; i < temp.length; i++) {
                  
                    if (i > text.length - 1) {
                        break;
                    }
                    if (temp[i] === text[i]) {
                        si++;

                    }
                }
                if (si > maximum) {
                    max = element.data.name;
                    maximum = si;

                }
                if (si === maximum) {

                }
                si = 0;
            });
       
            text = max.slice(0, 7) + text;
         
            max = "";
            maximum = -1
            //  setInterval(() => {

            //  },2000);

            const channelres = await client.queryChannels({
                type: 'team', name: { $autocomplete: text }, members: { $in: [client.userID] }
            })
            const userres = await client.queryUsers({
                id: { $ne: client.userID },
                name: { $autocomplete: text1 }
            })
            const [channels, { users }] = await Promise.all([channelres, userres])
            if (channels.length) setteamChannels(channels)
            if (users.length) setdirectChannels(users)
        } catch (error) {
            setQuery('');
        }
    }
    const setChannel = (channel) => {
        setQuery('');
        setActiveChannel(channel)
    }
    return (
        <div className='channel-search__container'>

            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon />
                </div>
                <input type="text" className='channel-search__input__text' placeholder='search' value={query} onBlur={()=>{ setblu(false)}} onFocus={()=>{setblu(true)}}
                
                 onChange={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    setQuery(e.target.value);
                    getChannel(e.target.value)

                }} />
            </div>
            {(query && blu) && (
                <ResultsDropDown
                    teamChannels={teamChannels}
                    directChannels={directChannels}
                    loading={loading}
                    setChannel={setChannel}
                    setQuery={setQuery}
                    setToggleContainer={setToggleContainer}
                />
            )}
        </div>
    )
}

export default ChannelSearch
