import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Assuming you have an AuthContext for user authentication
import '../../assets/css/others/VirtualTrainer.css';
import axios from 'axios';
const VirtualTrainer = () => {
  const { user } = useAuth(); // Getting user from AuthContext
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

  if (!user) {
    return <div>Please log in to view the list of trainers.</div>;
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualTrainer;
