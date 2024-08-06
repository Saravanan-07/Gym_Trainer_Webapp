import React, { useState, useEffect } from 'react';
import "../../../assets/css/Others/ExerciseDemos/Demos.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';  
const API_URL = 'http://localhost:5001/demovideodata';

const Demos = () => {
  const { admin } = useAuth();  
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [src, setSrc] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!admin) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setCards(cards.filter(card => card.id !== id));
    } catch (error) {
      console.error('Error deleting card', error);
    }
  };

  const handleAdd = async () => {
    if (!admin) {
      return;
    }

    const newCard = {
      title,
      description,
      src,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCards([...cards, data]);
      setTitle('');
      setDescription('');
      setSrc('');
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding card', error);
    }
  };

  return (
    <div className="outermost">
      <div className="header-main">
        <div className="header-list demo-navbar">
          <ul>
            <li><Link to='/home' id="Link">Back</Link></li>
          </ul>
        </div>
      </div>
      <div className='outer'>
        {admin && (
          <button onClick={() => setIsFormVisible(!isFormVisible)} className='add-card-btn'>
            {isFormVisible ? 'Cancel' : 'Add Card'}
          </button>
        )}
        {isFormVisible && admin && (
          <div className='form-container'>
            <h2>Add New Demo</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
              <label>
                Title:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
              <label>
                Video URL:
                <input
                  type="text"
                  value={src}
                  onChange={(e) => setSrc(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className='form-submit-btn'>Add Demo</button>
            </form>
          </div>
        )}
        {cards.map(card => (
          <div key={card.id} className='card-container'>
            <iframe className='card-img' width="560" height="315" src={card.src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3 className='card-title'>{card.title}</h3>
            <p className='card-description'>{card.description}</p>
            {admin && (
              <button onClick={() => handleDelete(card.id)} className='card-btn'>Delete</button>
            )}
          </div>
        ))}
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
    </div>
  );
};

export default Demos;
