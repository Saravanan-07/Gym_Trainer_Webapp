import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../assets/css/AdminDashboard.css';

const AdminDashboard = () => {
  const { admin } = useAuth();
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const [newTrainer, setNewTrainer] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndTrainers = async () => {
      try {
        const [usersResponse, trainersResponse] = await Promise.all([
          axios.get('http://localhost:5001/users'),
          axios.get('http://localhost:5001/trainers'),
        ]);

        setUsers(usersResponse.data);
        setTrainers(trainersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (admin) {
      fetchUsersAndTrainers();
    }
  }, [admin]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTrainerChange = (e) => {
    const { name, value } = e.target;
    setNewTrainer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/users', newUser, {
        headers: { 'Content-Type': 'application/json' },
      });
      setUsers((prevState) => [...prevState, response.data]);
      setNewUser({ username: '', email: '', password: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleAddTrainer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/trainers', newTrainer, {
        headers: { 'Content-Type': 'application/json' },
      });
      setTrainers((prevState) => [...prevState, response.data]);
      setNewTrainer({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error adding trainer:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5001/users/${userId}`);
      setUsers((prevState) => prevState.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteTrainer = async (trainerId) => {
    try {
      await axios.delete(`http://localhost:5001/trainers/${trainerId}`);
      setTrainers((prevState) => prevState.filter((trainer) => trainer.id !== trainerId));
    } catch (error) {
      console.error('Error deleting trainer:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!admin) {
    return <div className="not-admin">Sign In as Admin</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="section">
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="list-item">
              {user.username} ({user.email})
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddUser} className="form">
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={newUser.username}
            onChange={handleUserChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="User Email"
            value={newUser.email}
            onChange={handleUserChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="User Password"
            value={newUser.password}
            onChange={handleUserChange}
            required
          />
          <button type="submit">Add User</button>
        </form>
      </div>

      <div className="section">
        <h2>Trainers</h2>
        <ul>
          {trainers.map((trainer) => (
            <li key={trainer.id} className="list-item">
              {trainer.name} ({trainer.email})
              <button onClick={() => handleDeleteTrainer(trainer.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddTrainer} className="form">
          <input
            type="text"
            name="name"
            placeholder="Trainer Name"
            value={newTrainer.name}
            onChange={handleTrainerChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Trainer Email"
            value={newTrainer.email}
            onChange={handleTrainerChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Trainer Password"
            value={newTrainer.password}
            onChange={handleTrainerChange}
            required
          />
          <button type="submit">Add Trainer</button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
