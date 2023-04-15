//sanity client import
import { client } from '../../lib/client';
import axios from 'axios';
import { useState , useEffect} from 'react';
import {
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
} from 'reactstrap';

const ChatSection = () => {
  const [rooms,setRooms]= useState([])
  const [activeTab] = useState('chat');
  const [chatSubTab, setChatSubTab] = useState('direct');

  const [accountInfo, setAccountInfo] = useState();

function fetchinfo(){
   


axios.get('https://api.solana.fm/v0/accounts/Cs23cJMRuahuKh5oNhVmLhM2UrtaZLULLF3HqrxfTnHc')
  .then( (res)=>{
    setAccountInfo(res.data)
    console.log("acount info ", accountInfo) 
  }).catch((error)=>{
   console.log(error)
  })

  
    
   }
  


    //sanity fetch
    useEffect(()=>{
      client.fetch(
        `*[_type == "rooms"]{
          roomName,
          roomId,
          "avatar":image.asset->url,
        }`
      ).then((data)=> setRooms(data)).catch(console.error)
    },[])
  const ToggleChatSubTab = (tab) => {
    setChatSubTab(tab);

    if (tab === 'direct') {
      var element = document.getElementById('chating');
      element.classList.add('active');
    } else {
       element = document.getElementById('chating');
      element.classList.remove('active');
    }

    if (tab === 'group') {
     element = document.getElementById('group_chat');
      element.classList.add('active');
    } else {
       element = document.getElementById('group_chat');
      element.classList.remove('active');
    }
  };
  return (
    <div className='chat custom-scroll'>
      <div className='theme-title'>   
      </div>
      <div className='theme-tab tab-sm chat-tabs'>
        <TabContent activeTab={activeTab}>
          <TabPane
            tabId='chat'
            className='fade show'
            id='chat'
            role='tabpanel'
            aria-label='chat-tab'
          >
            <div className='theme-tab'>
              <Nav tabs id='myTab1' role='tablist'>
                <NavItem>
                  <NavLink
                    className={`button-effect ${chatSubTab === 'direct' ? 'active' : ''
                      }`}
                    onClick={() => ToggleChatSubTab('direct')}
                    id='direct-tab'
                    data-toggle='tab'
                    href='#direct'
                    role='tab'
                    aria-controls='direct'
                    aria-selected='false'
                    data-to='chating'
                  >
                    Daos
                  </NavLink>
               
                </NavItem>
                <NavItem>
                  <NavLink
                    className={`button-effect ${chatSubTab === 'group' ? 'active' : ''
                      }`}
                    onClick={() => ToggleChatSubTab('group')}
                    id='group-tab'
                    data-toggle='tab'
                    href='#group'
                    role='tab'
                    aria-controls='group'
                    aria-selected='true'
                    data-to='group_chat'
                    
                    >
            
                    Group

                    
                  </NavLink>
                  <button onClick={fetchinfo} >test</button>
                </NavItem>
              </Nav>
              <TabContent activeTab={chatSubTab}>
                <TabPane
                  tabId='direct'
                  className='fade show'
                  id='direct'
                  role='tabpanel'
                  aria-labelledby='direct-tab'
                >
                              <ul className="chat-main">
                 {rooms.map((room)=>(
                   <a key ={room.roomId} href={room.roomId}>
                    <li className="active" data-to="chating">
                   <div className="chat-box">
                     <div className="profile online">
                       <img
                         className="bg-img"
                         src={room.avatar}
                         alt="Avatar"
                   width={50}
                   height={50}
             
           
                       />
                     </div>
                     <div className="details">
                       <h5>{room.roomName}</h5>
                       <h6>{room.roomId}</h6>
                     </div>
                     <div className="date-status">
                       <div className="badge badge-primary sm">8</div>
                     </div>
                   </div>
                 </li>
                   </a>
                 ))}
                
                  
                </ul>
                </TabPane>
                <TabPane
                  tabId='group'
                  className='fade show'
                  id='group'
                  role='tabpanel'
                  aria-labelledby='group-tab'
                >
                            <ul className="group-main">
                  <li data-to="group_blank">
                    <div className="group-box">
                      <div className="profile">
                        <img
                          className="bg-img"
                          src="../assets/images/avtar/family.png"
                          alt="Avatar"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="details">
                        <h5>Make Solana greater</h5>
                        <h6>
                          Lorem Ipsum is simply dummy text the printing and
                          typesetting industry.
                        </h6>
                      </div>
                      <div className="date-status">
                        <ul className="grop-icon">
                          <li>
                            <a
                              className="group-tp"
                              href="#"
                              data-tippy-content="Josephin"
                            >
                              <img
                                src="../assets/images/contact/1.jpg"
                                alt="group-icon-img"
                                width={50}
                                height={50}
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              className="group-tp"
                              href="#"
                              data-tippy-content="Jony "
                            >
                              <img
                              src="../assets/images/contact/2.jpg"
                                alt="group-icon-img"
                                width={50}
                                height={50}
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              className="group-tp"
                              href="#"
                              data-tippy-content="Pabelo"
                            >
                              <img
                                src="../assets/images/contact/3.jpg"
                                alt="group-icon-img"
                                width={50}
                                height={50}
                              />
                            </a>
                          </li>
                          <li>+ 12</li>
                        </ul>
                        <div className="badge badge-primary" />
                      </div>
                    </div>
                  </li>
                  <li data-to="group_blank">
                    <div className="group-box">
                      <div className="profile">
                        <img
                          className="bg-img"
                          src="../assets/images/avtar/onboard.png"
                          alt="Avatar"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="details">
                        <h5>Onboarding and normies</h5>
                        <h6>
                          Lorem Ipsum is simply dummy text the printing and
                          typesetting industry.
                        </h6>
                      </div>
                    </div>
                  </li>
                  <li data-to="group_blank">
                    <div className="group-box">
                      <div className="profile">
                        <img
                          className="bg-img"
                          src="../assets/images/avtar/jobboard.png"
                          alt="Avatar"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="details">
                        <h5>Open Fee-less Marketplace</h5>
                        <h6>
                          Lorem Ipsum is simply dummy text the printing and
                          typesetting industry.
                        </h6>
                      </div>
                    </div>
                  </li>
                </ul>
                </TabPane>
              </TabContent>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default ChatSection;
