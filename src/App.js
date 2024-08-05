import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import Demos from './components/others/Demos';
import Loginpage from './components/Loginpage';
import Signuppage from './components/Signuppage';
import Dietfoods from './components/others/Dietfoods';
import Workouts from './components/others/Workouts';
import VirtualTrainer from './components/others/VirtualTrainer';
import Goalsetting from './components/others/Goalsetting';
import Wpcardio from './components/Workoutplanss/Wpcardio';
import AdminDashboard from './components/AdminDashboard';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Homepage/>}></Route>
        <Route path='/home' element={<Homepage/>}></Route>
        <Route path='/login' element={<Loginpage/>}></Route>
        <Route path='/register' element={<Signuppage/>}></Route>
        <Route path='/workouts' element={<Workouts/>}></Route>
            <Route path='/workout-plans' element={<Wpcardio/>}></Route>
        <Route path='/demos' element={<Demos/>}></Route>
        <Route path='/nutrients' element={<Dietfoods/>}></Route>
        <Route path='/virtualtrainer' element={<VirtualTrainer/>}></Route>
        <Route path='/goals' element={<Goalsetting/>}></Route>
        <Route path='/AdminDashboard' element={<AdminDashboard></AdminDashboard>}></Route>
      </Routes>
   </div>
  );
}

export default App;
