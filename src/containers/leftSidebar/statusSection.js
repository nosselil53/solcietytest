import { client } from "../../lib/client";
import { Edit,X } from "react-feather"
import { useState } from 'react';
const StatusSection = (props) => {
  const [profile, setProfile] = useState({
    username: 'Josephin water',
    address: 'Alabma , USA',
    editStatus: false,
  });
	const closeLeftSide = () => {
    document.querySelector(".notification-tab").classList.remove("active")
    document.querySelector(".recent-default").classList.add("active");
    props.ActiveTab("")
    }
    
    const ProfileHandle = (e) => {
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
    };
  
    const EditProfile = (e) => {
      e.preventDefault();
      setProfile({ ...profile, editStatus: !profile.editStatus });
    };

    return (
        <div className={`status-tab custom-scroll dynemic-sidebar ${props.tab === "status" ? "active" : ""}`} id="status">
            <div className="my-status-box">
              <div className="status-content">
                <div className="media">
                  <div className="img-status">
                    <div className="user-status  bg-size" style={{ backgroundImage: `url('../assets/images/avtar/2.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}></div>
                    <div className="upload-img">
                      <input type="file"/>
                    </div>
                  </div>
                  <div className="media-body">
                    
                    <h3>my status</h3>
                    <p>tap to add status Update</p>
                    
                  </div>
                  <div className='media-body text-right'>
               {' '}
              <a
              className='icon-btn btn-outline-light btn-sm close-panel'
              
              onClick={() => closeLeftSide()}
            >
              <X />
            </a>
          </div>
         
                </div>
              </div>
            </div>
            <div className='theme-title'>
        <div className='media'>
          <div>
            <h2>Settings</h2>
            <h4>Change your app setting.</h4>
          </div>
          <div className='media-body text-right'>
            {' '}
         
          </div>
        </div>
        <div className='profile-box'>
          <div className={`media ${profile.editStatus ? 'open' : ''}`}>
            <div
              className='profile'
              style={{
                backgroundImage: `url('assets/images/avtar/3.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'block',
              }}
            >
              <img
                className='bg-img'
                src='/assets/images/avtar/3.jpg'
                alt='Avatar'
                style={{ display: 'none' }}
              />
            </div>
            <div className='details'>
              <h5>{profile.username}</h5>
              <h6>{profile.address}</h6>
            </div>
            <div className='details edit'>
              <form className='form-radious form-sm'>
                <div className='form-group mb-2'>
                  <input
                    className='form-control'
                    type='text'
                    name='username'
                    defaultValue={profile.username}
                    onChange={(e) => ProfileHandle(e)}
                  />
                </div>
                <div className='form-group mb-0'>
                  <input
                    className='form-control'
                    type='text'
                    name='address'
                    defaultValue={profile.address}
                    onChange={(e) => ProfileHandle(e)}
                  />
                </div>
              </form>
            </div>
            <div className='media-body'>
              <a
                className='icon-btn btn-outline-light btn-sm pull-right edit-btn'
               
                onClick={(e) => EditProfile(e)}
              >
                {' '}
                <Edit />
              </a>
            </div>
          </div>
        </div>
      </div>
            </div>
       
    );
}

export default StatusSection;