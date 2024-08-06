import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext'; 
import '../../../assets/css/Others/VirtualTrainer/VirtualTrainer.css';
import axios from 'axios';

const VirtualTrainer = () => {
  const { user } = useAuth(); 
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      if (user) {
        try {
          const response = await axios.get('http://localhost:5001/trainers');
          setTrainers(response.data);
        } catch (error) {
          console.error('Error fetching trainers:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTrainers();
  }, [user]);

  const handleChooseTrainer = (trainerId) => {
    
    alert('Trainer with ID ${trainerId} chosen');
  };

  if (!user) {
    return <div className='errmsgtr'>Please log in as a user to choose the trainer(s).</div>;
  }

  if (loading) {
    return <div>Loading trainers...</div>;
  }

  return (
    <div>
      <h1 id='adph1'>Available Trainers</h1>
      <div className="trainers-list">
        {trainers.map(trainer => (
          <div key={trainer.id} className="trainer-item">
            <h2>{trainer.name}</h2>
            <p>{trainer.email}</p>
            <button 
              className="choose-trainer-btn" 
              onClick={() => handleChooseTrainer(trainer.id)}
            >
              Choose Trainer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualTrainer;