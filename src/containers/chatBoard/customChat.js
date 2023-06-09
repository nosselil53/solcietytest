import {  useEffect, useState, useReducer } from 'react';
import {client} from '../../lib/client'
import axios from 'axios';
import {
  Button,
  Dropdown,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import {
  Trash2,
  Slash,
  MoreVertical,
  Send,
} from 'react-feather';
import { Tooltip } from 'react-tippy';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from "@solana/wallet-adapter-react";
import"@solana/wallet-adapter-react-ui/styles.css"
import Gun from 'gun'


// Port 5050 is the port of the gun server we previously created
const gun = Gun({
  peers: [
    'http://localhost:3040/gun'
  ]
})
// The messages array will hold the chat messages
const currentState = {
  messages: []
}
// This reducer function will edit the messages array
const reducer = (state, message) => {
  return {
    messages: [message, ...state.messages]
  }
}

const CustomChat = (props) => {

  const [search, setSearch] = useState(false);
  const [audiocall, setAudiocall] = useState(false);
  const [videocall, setVideocall] = useState(false);
  const [videoscreen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState('');
  const [rooms, setRooms]= useState([])
  const [user , setUser] = useState([])
  const [userName,setUserName]=useState(null)
  const [UserAvatar,setUserAvatar] = useState(null)
  const { wallet } = useWallet();

  const [accountInfo, setAccountInfo] = useState({});
/////////////////////////////////////////////////////////
  
const [isFirstRefresh, setIsFirstRefresh] = useState(true);
console.log("awell halla ",isFirstRefresh)




  async function fetchAccountInfo() {
   if(isFirstRefresh){
    const response = await axios.get('https://api.solana.fm/v0/accounts/Cs23cJMRuahuKh5oNhVmLhM2UrtaZLULLF3HqrxfTnHc');
      
    setAccountInfo(response.data);
    
   }
   
  }


  useEffect(() => {
   
    fetchAccountInfo()
    

         if(isFirstRefresh){
          localStorage.setItem("sfkaa",JSON.stringify(accountInfo))
         }


        
        console.log("lkQSJHDLKJhdkQSHDJMKDhj",localStorage.getItem("sfkaa"))
        console.log("mte3 piston :",isFirstRefresh) 
  
     
  
  }, []);



  const { publicKey } = useWallet();
 var key 
  useEffect(() => {
    
      console.log(`Wallet address: ${publicKey}`);
if(isFirstRefresh){
  key = publicKey
  localStorage.setItem("key",key)
}
console.log("bchachel", localStorage.getItem("key"))
  
  }, []);


  useEffect(() => {
    if (isFirstRefresh) {
      setIsFirstRefresh(false);
    }
  }, [isFirstRefresh]);





  const currentuser="8193WXJo2EMgHHTTxjhHyNV3VnpZxvCtUDSDbmt7YMY4"
//fetch user
useEffect(()=>{

  client.fetch(
    `*[_type == "users" && walletAddress == "${currentuser}"]{
      name,
      "avatar":profileImage.asset->url,
    }`
  ).then((datas)=> setUser(datas)).catch(console.error)

},[currentuser])
 //sanity fetch room
 useEffect(()=>{
  client.fetch(
    `*[_type == "rooms" && roomId == "${currentRoomId}"]{
      roomName,
      "avatar":image.asset->url,
    }`
  ).then((data)=> setRooms(data)).catch(console.error)
},[currentRoomId])


 //get current room  id

 useEffect(() => {

  const handleHashChange = () => {
    const hash = window.location.hash;
    setCurrentRoomId(hash);
   
  };

  // Call the handleHashChange function when the component mounts
  handleHashChange();

  // Add an event listener to the 'hashchange' event
  window.addEventListener('hashchange', handleHashChange);

  // Remove the event listener when the component unmounts
  return () => {
    window.removeEventListener('hashchange', handleHashChange);
  };
  
}, []);


  const toggleAudiocall = () => {
    setAudiocall(!audiocall);
  };
  const toggleVideocall = () => {
    setVideocall(!videocall);
  };
  const [messageText, setMessageText] = useState('')
  const [state, dispatch] = useReducer(reducer, currentState)

   // fires immediately the page loads
   useEffect(() => {
    const messagesRef = gun.get('MESSAGES')
    messagesRef.map().on(m => {
      dispatch({
        sender: m.sender,
        userid:m.userid,
        avatar: m.avatar,
        content: m.content,
        selectedRoom:m.selectedRoom,
        timestamp: m.timestamp
      })
    })
  }, [])

   // remove duplicate messages
   const newMessagesArray = () => {
    const formattedMessages = state.messages.filter((value, index) => {
      const _value = JSON.stringify(value)
      return (
        index ===
        state.messages.findIndex(obj => {
          return JSON.stringify(obj) === _value
        })
      )
    })

    return formattedMessages
  }
  
 // save message to gun / send message
 const sendMessage = () => {
  // a reference to the current room
  const messagesRef = gun.get('MESSAGES')


user.map((u)=>{
setUserName(u.name)
setUserAvatar(u.avatar)
})
// the message object to be sent/saved
  const messageObject = {
    sender: userName,
    userid:currentuser,
    avatar: UserAvatar,
    content: messageText,
    selectedRoom:currentRoomId,
    timestamp: Date().substring(16, 21)
  }

  // this function sends/saves the message onto the network
  messagesRef.set(messageObject)

  // clear the text field after message has been sent
  setMessageText('')
}

  return  (
    <>
    <div    className='messages custom-scroll active wallpapers' id='chating'>
      <div className='contact-details'>
        <div className='row'>
          <form className={`form-inline search-form ${search ? 'open' : ''}`}>
            <div className='form-group'>
              <input
                className='form-control-plaintext'
                type='search'
                placeholder='Search...'
              />
              <div
                className='icon-close close-search'
                onClick={() => setSearch(false)}
              ></div>
            </div>
          </form>
          <div className='col-7'>
              {rooms.map((room)=>(
                <div className='media left' key={room.roomId}>
                <div
                  className='media-left mr-3'
                
                >
                  <div
                    className={`profile menu-trigger `}
                    style={{
                      backgroundImage: `url(${room.avatar})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'block',
                    }}
                  ></div>
                </div>
                <div className='media-body'>
                <h5>{room.roomName}</h5>
                  <div
                    className={`badge ${'online'
                      ? 'badge-success'
                      : 'badge-danger'
                      }`}
                  >
                    { 'online'
                      ? '256 Active users'
                      : 'InActive'}
                  </div>
                </div>
               
              </div>
              ))}
            </div>
          <div className='col'>
            <ul className='calls text-right'>
            <li>
              <WalletMultiButton
            
              />
              
              </li>
              <li>
                <Tooltip
                  title='Community gallery'
                  position='bottom-end'
                  trigger='mouseenter'
                >
                  <a
                    className='icon-btn btn-light button-effect'
                    
                    onClick={() => setAudiocall(!audiocall)}
                  >
                   <i className="fa-solid fa-palette"></i>
                  </a>
                </Tooltip>
                <Modal
                  className='show'
                  isOpen={audiocall}
                  toggle={toggleAudiocall}
                  centered={true}
                >
              
                </Modal>
                <Modal
                  className='show'
                  isOpen={audiocall}
                  toggle={toggleAudiocall}
                  centered={true}
                >
                  <ModalBody className='p-0'
                   >

                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-body">
                        <div
                          className='audiocall1 call-modal backgallery'
                          style={{
                            backgroundImage: `url('../assets/images/avtar/big/audiocall.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='../assets/images/avtar/big/audiocall.png'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                          <div className='center-con1 text-center'>
                            <br />
                            <br />
                            <br />
                            <div className='title2'>Community Gallery</div>
                            <h6>Contact us to be featured</h6>
                            <ul>
                              <li>
                                <a
                                  className="icon-btn btn-outline-light button-effect btn-xl "
                                  href="https://www.google.com/"
                                  data-bs-toggle="modal"
                                  data-bs-target="#audiorcvcall"
                                  data-bs-dismiss="modal"
                                >
                                  <i className="fa-solid fa-arrow-up-right-from-square" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                      </div>
                    </div>
                  </ModalBody>
                </Modal>
              </li>
              <li>
                <Tooltip
                  title='On going vote'
                  position='bottom-end'
                  trigger='mouseenter'
                >
                  <a
                    className='icon-btn btn-light button-effect'
                    
                    onClick={() => setVideocall(!videocall)}
                  >
                  <i className="fa-solid fa-gavel"></i>                    </a>
                </Tooltip>
                <Modal
                  className={`viddiolog fade show ${videoscreen ? 'active' : ''
                    }`}
                  isOpen={videocall}
                  toggle={toggleVideocall}
                  centered={true}
                >
                  <ModalBody>
                  
                    <div
                      className='videocall call-modal '
                      style={{
                        backgroundImage: `url('../assets/images/avtar/big/videocall_bg.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'block',
                      }}
                    >
                     <div className="media videocall-details">
                          <div className="usersprof">
                            <div className="profile"  >
                              <img
                                className="bg-img"
                                src="../assets/images/avtar/2.jpg"
                                alt="Avatar"
                                style={{  width:60,
                        height:60 ,
                        borderRadius:20,
                        display:'inline-block',
                        position:'relative' }}
                              />
                            </div>
                              <div className="profile">
                                <img
                                  className="bg-img"
                                  src="../assets/images/avtar/3.jpg"
                                  alt="Avatar"
                                  style={{  width:60,
                          height:60 ,
                          borderRadius:20,
                          display:'inline-block',
                          position:'relative' }}
                                />
                              </div>
                            </div>
                            <div className="media-body" >
                              <h5>Implement FFF Raffles</h5>
                              <h6>Proposed by Degenboy420 </h6>
                            </div>
                            <div id="basicUsage">00:00:00</div>
                          </div>
                          <div className="center-con text-center">
                            <div
                              style={{
                                position: "relative",
                                left: "-270px",
                                top: 100,
                                color: "white",
                                textAlign: "left"
                              }}
                            >
                              <h5 className="votedetails">
                                Financed : <span className="votedetails">Yes </span>
                              </h5>
                              <h5 className="votedetails">
                                Need Help : <span className="votedetails">Yes </span>
                              </h5>
                              <hr />
                              <h5 className="votedetails">
                                We want to implement the FFF Raffles as a new application within{" "}
                                <br /> Solciety as soon as possible. <br />
                              </h5>
                            </div>
                                  <ul style={{ position: "relative", top: 80,left:-150 }}>
                                    <li>
                                      <a
                                        className="icon-btn btn-outline-danger button-effect pause"
                                        
                                      >
                                        <i className="fa-solid fa-xmark" />
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="icon-btn btn-success button-effect btn-xl is-animating"
                                        
                                        data-bs-dismiss="modal"
                                      >
                                        <i className="fa-solid fa-check" />
                                      </a>
                                    </li>
                                  </ul>
                                          </div>
                                          </div>
                                            </ModalBody>
                                          </Modal>
                                        </li>
          
                                                  <li className='chat-friend-toggle'>
                                                    <Dropdown
                                                      isOpen={props.quickAction}
                                                      toggle={() => props.setQuickAction(!props.quickAction)}
                                                    >
                                                      <Tooltip
                                                        title='Quick action'
                                                        trigger='mouseenter'
                                                        position='bottom-end'
                                                      >
                                                        <DropdownToggle
                                                          tag='button'
                                                          data-toggle='dropdown'
                                                          aria-expanded={props.quickAction}
                                                          className='icon-btn btn-light bg-transparent button-effect outside'
                                                        >
                                                          <MoreVertical />
                                                        </DropdownToggle>
                                                      </Tooltip>
                                                      <div
                                                        className='chat-frind-content'
                                                        style={
                                                          props.quickAction
                                                            ? { display: 'block' }
                                                            : { display: 'none' }
                                                        }
                                                      >
                                                        <ul>
                                                        
                                                          <li>
                        <a
                          className='icon-btn btn-outline-danger button-effect btn-sm'
                       
                          onClick={() => setDeleteModal(!deleteModal)}
                        >
                          <Trash2 />
                        </a>
                        <h5 onClick={() => setDeleteModal(!deleteModal)}>
                          Donate
                      </h5>
                      </li>
                      <li>
                        <a
                          className='icon-btn btn-outline-light button-effect btn-sm'
                         
                          onClick={() => setBlockModal(!blockModal)}
                        >
                          <Slash />
                        </a>
                        <h5 onClick={() => setBlockModal(!blockModal)}>
                          Block
                      </h5>
                      </li>
                    </ul>
                  </div>
                </Dropdown>
              </li>
             
            </ul>
          </div>
        </div>
      </div>
      <Modal
        isOpen={blockModal}
        className='add-popup delete-modal'
        toggle={() => setBlockModal(!blockModal)}
        centered
      >
        <ModalHeader toggle={() => setBlockModal(!blockModal)}></ModalHeader>
        <ModalBody>
          <h3>Do you want to block this user?</h3>
          <div className='delete-btn'>
            <Button
              className='button-effect'
              size='sm'
              color='danger'
              onClick={() => setBlockModal(!blockModal)}
            >
              Block
          </Button>
            <Button
              className='button-effect ml-2'
              size='sm'
              color='primary'
              onClick={() => setBlockModal(!blockModal)}
            >
              Close
          </Button>
          </div>
        </ModalBody>
      </Modal>
      <div className='contact-chat'>
        <ul className='chatappend'>
        
        {newMessagesArray().map((msg) => {
         if(msg.selectedRoom===currentRoomId){
            if (msg.userid === currentuser) {
              
              return(
                <li className='replies'>
                        <div className='media'>
                          <div
                            className='profile mr-4'
                            style={{
                              backgroundImage: `url(${msg.avatar})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              display: 'block',
                            }}
                          >
                            <img
                              className='bg-img'
                              src={msg.avatar}
                              alt='Avatar'
                              style={{ display: 'none' }}
                            />
                          </div>
                          <div className='media-body'>
                            <div className='contact-name'>
                              <h5>{msg.sender}</h5>
                              
                              <ul className='msg-box'>
                                <li className='msg-setting-main'>
                                  <h5>{msg.content}</h5>
                                </li>
                               
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
              )
            } else{
              return(
                <li index = {msg.userid} className='sent'>
              <div className='media'>
                <div
                  className='profile mr-4'
                  style={{
                    backgroundImage: `url(${msg.avatar})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                  >
                  <img
                    className='bg-img'
                    src={msg.avatar}
                    alt='Avatar'
                    style={{ display: 'none' }}
                  />
                </div>
                <div className='media-body'>
                  <div className='contact-name'>
                    <h5>{msg.sender}</h5>       
                    <ul className='msg-box'>
                      <li className='msg-setting-main'>
                        <h5>{msg.content}</h5>
                      </li>
                      <li className='msg-setting-main'>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
              )
            }
         }
        })}
                      
                  </ul>
      </div>


   {rooms.map((r)=>{
    if(currentRoomId ){
      
      return(
        <div className='message-input'>
        <div className='wrap emojis-main'>
          <input
            className='setemoj'
            id="chatin"
            type='text'
            placeholder='Write your message  ...'
            onChange={e => setMessageText(e.target.value)}
            value={messageText}
          />
          <button
            className={`submit icon-btn btn-primary $`}
            onClick={sendMessage}
          >
            <Send />
          </button>
        </div>
      </div>
      )
    }
   })}

    </div>
  </>

  ) 
};

export default CustomChat;
