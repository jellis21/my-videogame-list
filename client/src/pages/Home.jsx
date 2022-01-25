import axios from "axios";
import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    axios.post('/api/v1/search', { searchValue })
    .then((res) => {
      console.log(res.data)
      setSearchResults(res.data)
    })
    .catch((err) => {alert(err)})
  };

  return (
    <div>
      <h1>My Videogame List</h1>
      <p>This is the home page.</p>
      <form onSubmit={(e) => handleSearch(e)}>
          <input
            onChange={(e) => {setSearchValue(e.target.value);console.log(searchValue)}}
            value={searchValue}
            required
          />
        <button className="btn btn-primary" type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="../logo512.png" />
  <Card.Body>
    <Card.Title>{result.name}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
            
            
            </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
