import React, { useState, useEffect } from 'react';
import '../../../assets/css/Others/GoalSetting/Goalsetting.css';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

const Goals = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [goalType, setGoalType] = useState('short-term');
  const [goalDescription, setGoalDescription] = useState('');
  const [target, setTarget] = useState('');
  const [reminder, setReminder] = useState('');
  const [activeTab, setActiveTab] = useState('in-progress');
  const [completedGoals, setCompletedGoals] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.role === 'admin') {
      // If the user is an admin, show the message to sign in as a user
      return <div>Sign in as user</div>;
    } else {
      // Load goals from local storage
      const storedGoals = JSON.parse(localStorage.getItem('goals')) || [];
      setGoals(storedGoals);
    }
  }, [user]);

  const saveGoals = (goals) => {
    localStorage.setItem('goals', JSON.stringify(goals));
  };

  const addGoal = () => {
    if (!goalDescription || !target || !reminder) return;
    const newGoal = {
      id: goals.length + 1,
      userId: user.id,
      type: goalType,
      description: goalDescription,
      target: target,
      reminder: reminder,
      completed: false
    };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
    setGoalDescription('');
    setTarget('');
    setReminder('');
  };

  const deleteGoal = async (id) => {
    console.log(`Attempting to delete goal with ID: ${id}`);
    try {
      // Send a delete request to the server
      await axios.delete(`http://localhost:5001/goals/${id}`);
      console.log(`Goal with ID ${id} deleted successfully from the server.`);
  
      // Update state and local storage
      const updatedGoals = goals.filter((goal) => goal.id !== id);
      setGoals(updatedGoals);
      saveGoals(updatedGoals);
  
      // Log the updated state for debugging
      console.log('Updated goals after deletion:', updatedGoals);
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };
  
  const completeGoal = async (id) => {
    const goalToComplete = goals.find(goal => goal.id === id);
    if (goalToComplete) {
      goalToComplete.completed = true;
      await axios.post('http://localhost:5001/goals', goalToComplete);
      const updatedGoals = goals.filter(goal => goal.id !== id);
      setGoals(updatedGoals);
      saveGoals(updatedGoals);
    }
  };

  const userGoals = goals.filter(goal => goal.userId === user.id);
  const inProgressGoals = userGoals.filter(goal => !goal.completed);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.role !== 'admin') {
      const fetchCompletedGoals = async () => {
        const response = await axios.get('http://localhost:5001/goals');
        const userCompletedGoals = response.data.filter(goal => goal.userId === user.id);
        setCompletedGoals(userCompletedGoals);
      };

      if (activeTab === 'completed') {
        fetchCompletedGoals();
      }
    }
  }, [activeTab, user]);

  if (!user) {
    return <div id='errorheading'>Sign in as user</div>;
  }

  return (
    <div className='bbody'>
      <div className="goal-setting-container">
        <h1>Set Your Fitness Goals</h1>
        <div className="tabs">
          <button onClick={() => setActiveTab('in-progress')} className={activeTab === 'in-progress' ? 'active' : ''}>In Progress</button>
          <button onClick={() => setActiveTab('completed')} className={activeTab === 'completed' ? 'active' : ''}>Completed</button>
        </div>
        {activeTab === 'in-progress' && (
          <>
            <form className="goal-form">
              <select value={goalType} onChange={(e) => setGoalType(e.target.value)}>
                <option value="short-term">Short-term</option>
                <option value="long-term">Long-term</option>
              </select>
              <input
                type="text"
                placeholder="Goal Description"
                value={goalDescription}
                onChange={(e) => setGoalDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Target (e.g., 5kg, 10km)"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
              <textarea
                placeholder="Reminders (e.g., Daily, Weekly)"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              ></textarea>
              <button
                type="button"
                onClick={addGoal}
                disabled={!goalDescription || !target || !reminder}
              >
                Add Goal
              </button>
            </form>
            <div className="goal-list">
              {inProgressGoals.map(goal => (
                <div key={goal.id} className="goal-item">
                  <h3>{goal.type.charAt(0).toUpperCase() + goal.type.slice(1)} Goal</h3>
                  <p><strong>Description:</strong> {goal.description}</p>
                  <p><strong>Target:</strong> {goal.target}</p>
                  <p><strong>Reminders:</strong> {goal.reminder}</p>
                  <button onClick={() => completeGoal(goal.id)}>Completed</button>
                  <button onClick={() => deleteGoal(goal.id)}>Delete</button>
                </div>
              ))}
            </div>
          </>
        )}
        {activeTab === 'completed' && (
          <div className="goal-list">
            {completedGoals.map(goal => (
              <div key={goal.id} className="goal-item">
                <h3>{goal.type.charAt(0).toUpperCase() + goal.type.slice(1)} Goal</h3>
                <p><strong>Description:</strong> {goal.description}</p>
                <p><strong>Target:</strong> {goal.target}</p>
                <p><strong>Completed:</strong> Yes</p>
                <button onClick={() => deleteGoal(goal.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;
