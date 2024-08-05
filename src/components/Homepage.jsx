import React, { useState } from 'react';
import '../assets/css/Homepage.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Homepage = () => {
  const navigate = useNavigate();
  const { user, admin, logout } = useAuth();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "3143c6a1-b8fd-4762-b4de-e5b7c6d2149e");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      alert('Form Submitted Successfully');
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutPopup(false);
    navigate('/login');
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <div>
      {showLogoutPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <button className="popup-button confirm" onClick={handleConfirmLogout}>Yes</button>
            <button className="popup-button cancel" onClick={handleCancelLogout}>No</button>
          </div>
        </div>
      )}

      <div className={`homepage-content ${showLogoutPopup ? 'blurred' : ''}`}>
        <div className="header-main">
          <div className="header-list">
            <ul>
              <li><a href='#abt' id="Link">About</a></li>
              <li><a href='#cont' id="Link">Contact</a></li>
              {user || admin ? (
                <>
                  {user && <li><Link to='/Profile' id="Link">Profile</Link></li>}
                  {admin && <li><Link to='/AdminDashboard' id="Link">Admin Dashboard</Link></li>}
                  <li><Link id="Link" onClick={handleLogoutClick}>Logout</Link></li>
                </>
              ) : (
                <>
                  <li><Link to='/login' id="Link" className='login_btn'>Login</Link></li>
                  <li><Link to='/register' id="Link" className='signup_btn'>Sign Up</Link></li>
                </>
              )}
            </ul>
          </div>
          <div className="contentbox wwe">
            <div className="contentbox-one-1">
              <h1>Take Control of Your <br /> Fitness Journey</h1>
              <p>Gym Trainer is your personal fitness companion, helping you
                achieve your goals through personalized workout plans, real-time
                progress tracking, and expert guidance.</p>
              {user || admin ? (
                <>
                  <h3>Welcome, {user ? user.username : admin.username}</h3>
                </>
              ) : (
                <div className='login_and_signup'>
                  <button className='blk-button top-btn' onClick={() => { navigate('/register') }}>Sign Up</button>
                  <button className='wht-button top-btn' onClick={() => { navigate('/login') }}>Login</button>
                </div>
              )}
            </div>
            <div className="contentbox-one-1">
              <div className="contextbox-one-1-img">
              </div>
            </div>
          </div>

          

        <div className="contentbox dummy">
          <div className="dummyimg">
            <div className="imginsidedummy"></div>
            <h1>YOU VS THE YEAR 2024<br />Log 1,024 km in 2024</h1>
          </div>
        </div>

        <div className="contentbox">
          <div className="contentbox-one-1 box2">
            <h1>Unlock Your Fitness Potential</h1>
            <h6>Gym Trainer offers a comprehensive suite of features to help you reach your fitness goals, whether you're a beginner or an experienced athlete.</h6>
            <div className="boxinsidecb">
              <div className=".box2insidebox1" onClick={() => { navigate('/workouts') }}>
                <div className="innerboxx">
                  <div className="logobox">
                    
                  </div>
                  <h3>Personalized Workouts</h3>
                  <p>Receive custom workout plans tailored to your fitness level and goals.</p>
                </div>
              </div>
              <div className=".box2insidebox1" onClick={() => { navigate('/demos') }}>
                <div className="innerboxx">
                  <div className="logobox">
                  </div>
                  <h3>Exercise Demos</h3>
                  <p>Learn proper form and technique with our extensive library of exercise demonstrations</p>
                </div>
              </div>
              <div className=".box2insidebox1" onClick={() => { navigate('/nutrients') }}>
                <div className="innerboxx">
                  <div className="logobox">
                  </div>
                  <h3>Nutrition and Diet</h3>
                  <p>Offers basic dietary advice to complement fitness routines. </p>
                </div>
              </div>
              <div className=".box2insidebox1" onClick={() => { navigate('/virtualtrainer') }}>
                <div className="innerboxx">
                  <div className="logobox">
                  </div>
                  <h3>Virtual Trainer</h3>
                  <p>Get personalized guidance and support from our team of experienced fitness experts.</p>
                </div>
              </div>
              <div className=".box2insidebox1" onClick={() => { navigate('/goals') }}>
                <div className="innerboxx">
                  <div className="logobox">
                  </div>
                  <h3>Goal Setting</h3>
                  <p>Users can set short-term and long-term fitness goals, such as weight targets or muscle mass goals</p>
                </div>
              </div>
              <div className=".box2insidebox1" onClick={() => { navigate('/community') }}>
                <div className="innerboxx">
                  <div className="logobox">
                  </div>
                  <h3>Challenges<br />& Community</h3>
                  <p>Join our vibrant community, participate in challenges, and connect with like-minded individuals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contentbox">
          <div className="logcontent">
            <div className="logs">
              <h6>MILES LOGGED</h6>
              <h1>9.42</h1>
              <h4>Billion</h4>
            </div>
            <div className="logs">
              <h6>ROUTES CREATED</h6>
              <h1>1.85</h1>
              <h4>Billion</h4>
            </div>
            <div className="logs">
              <h6>WORKOUTS LOGGED</h6>
              <h1>2.44</h1>
              <h4>Billion</h4>
            </div>
          </div>
        </div>

        <div className="contentbox graybox">
          <h1>What Our Users Say</h1>
          <p>Hear from real people who have transformed their lives with Gym Trainer.</p>
          <div className="grayinner">
            <div className=".box2insidebox1">
              <div className="innerbox bb1">
                <div className="logobox">
                </div>
                <h1>"Gym Trainer has been a game-changer for me.
                  The personalized workouts and progress tracking
                  have helped me stay motivated and see real results."
                </h1>
                <h2>- Sarah, 32</h2>
              </div>
            </div>
            <div className=".box2insidebox1">
              <div className="innerbox bb1">
                <div className="logobox">
                </div>
                <h1>"I was hesitant to try a fitness app, but Gym
                  Trainer has exceeded all my expectations.
                  The virtual trainer feature is incredibly
                  helpful and keeps me on track."
                </h1>
                <h2>- Michael, 45</h2>
              </div>
            </div>
            <div className=".box2insidebox1">
              <div className="innerbox bb1">
                <div className="logobox">
                </div>
                <h1>"I love the community aspect of Gym Trainer.
                  The challenges and social features keep me engaged
                  and motivated to push myself further."
                </h1>
                <h2>- Emily, 28</h2>
              </div>
            </div>
          </div>
          <button className='wht-button cmty-btn' onClick={() => { navigate('/community') }}>Join Community</button>
        </div>

        <div className="contentbox contclass">
          <div id='cont'>
            <div className='contimg'></div>
            <div className='contdesc'>
              <form className='contcontainer' onSubmit={onSubmit}>
                <h3 className='conth3'>CONTACT US</h3>
                <input type='text' placeholder='Enter your name' className='continp' name='name' required />
                <input type='text' placeholder='Enter your email' className='continp' name='email' required />
                <textarea className='continptarea' placeholder='Enter your queries here' name='message' required></textarea>
                <button className='continpbut' type='submit'>SEND</button>
              </form>
            </div>
          </div>
        </div>
          
          <div className="contentbox footer">
            <ul>
              <li><h1>VEST ARMOUR</h1></li>
              <li>© 2024 Vest Armour®, Inc. All rights reserved</li>
              <li>Privacy Policy  /</li>
              <li>Terms of use  /</li>
              <li>Cookie Policy  /</li>
              <li>Manage Your Content /</li>
              <li>AdChoices</li>
            </ul>
          </div>
          <div className="contentbox footer">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
