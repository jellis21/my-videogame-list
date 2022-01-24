import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Lists() {
  const [lists, setLists] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/v1/lists', {
      headers: {
        'x-access-token': token
      }
    })
      .then(res => {
        setLists(res.data) // axios retursn the "data" key we're accessing
      })
  }, [token])

  if (!token) {
    navigate('/login')
  }

  return <div>
    <h1>Teams</h1>
    {lists.map((game) => (
      <div key={game.id}>
        <h2>{game.game_name}</h2>
        <p>{game.ranking}</p>
      </div>
    ))}
  </div>;
}

export default Lists;
