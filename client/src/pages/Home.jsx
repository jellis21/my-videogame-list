import axios from "axios";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [gameName, setGameName] = useState("");
  const [ranking, setRanking] = useState("");
  const token = localStorage.getItem("token");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Submit function in form
  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/search", { searchValue })
      .then((res) => {
        console.log(res.data);
        setSearchResults(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // Add game to db pt. 1
  const addGameStart = (e) => {
    handleShow()
    setGameName(e.target.id)
    console.log(gameName)
  }
  // Add game to db pt. 2
  const addGameFinish = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "/api/v1/lists/",
      data: {
        token,
        game_name: gameName,
        ranking
      }
    })
      .then(res => { console.log(res)})
      .catch(err => alert(err.response.data.error));
    e.target.innerText = 'Success!';
    e.target.className = "bg-success text-light"
  }

  return (
    <div>
      <h1>My Videogame List</h1>
      <p>This is the home page.</p>
      <form onSubmit={(e) => handleSearch(e)}>
        <input
          onChange={(e) => {
            setSearchValue(e.target.value);
            console.log(searchValue);
          }}
          value={searchValue}
          required
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={result.url} />
              <Card.Body>
                <Card.Title>{result.name}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button onClick={addGameStart} id={result.name} variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>

      <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => {addGameFinish(e)}}>
            <Form.Select onChange={(e) => {setRanking(e.target.value)}} aria-label="Default select example">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Form.Select>
          <Button variant="primary" type="submit">
            Save
          </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    </div>
  );
};

export default Home;
