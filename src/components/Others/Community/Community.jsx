import React from 'react';
import '../../../assets/css/Others/Community/Community.css';
import jogimg from '../../../assets/images/Others/Workouts/Walkingimg.jpeg'
import milimg from '../../../assets/images/Others/Workouts/Joggingimg.jpeg'
const App = () => {
  return (
    <div className="app">
      <header className="header">
        <div className="challenge-banner">
          <div className="challenge-info">
            <h1>You VS The Year 2024</h1>
            <p>Log 1,024 km in 2024</p>
          </div>
          <div className="challenge-image">
            <img src={jogimg} alt="Runners" />
          </div>
        </div>
      </header>

      <section className="features">
        <h2>Unlock Your Fitness Potential</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Personalized Workouts</h3>
            <p>Receive custom workout plans tailored to your fitness level and goals.</p>
          </div>
          <div className="feature-item">
            <h3>Exercise Demos</h3>
            <p>Learn proper form and technique with our extensive library of exercise demonstrations.</p>
          </div>
          <div className="feature-item">
            <h3>Nutrition and Diet</h3>
            <p>Offers basic dietary advice to complement fitness routines.</p>
          </div>
        </div>
      </section>

      <section className="challenge-yourself">
        <h2>CHALLENGE YOURSELF</h2>
        <p>
          Participate in challenges to set goals, motivate yourself, and cheer on your friends. Prizes are given for certain challenges, so don't wait—join a challenge today!
        </p>
      </section>
      <section className="my-challenges">
        <h2>My Challenges</h2>
        <div className="challenge-card">
          <img src={milimg} alt="You VS The Year 2024" />
          <div className="challenge-details">
            <h3>You VS The Year 2024</h3>
            <p>Ends in 147 day(s)</p>
            <p>Log 1,024 km in 2024</p>
            <div className="progress">
              <p>0/1024 kilometers</p>
            </div>
            <p className="next-milestone">NEXT MILESTONE</p>
            <p>FIRST STEPS DOWN</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
