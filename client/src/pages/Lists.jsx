import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Figure from 'react-bootstrap/Figure';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Lists() {
  const [lists, setLists] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [rankingValue, setRankingValue] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("/api/v1/lists", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        setLists(res.data); // axios returns the "data" key we're accessing
      });
  }, [token]);

  // edit & delete game helper functions
  const editGame = (e) => {
    e.preventDefault();
    setId(e.target.id)
    handleShow()
  }
  const deleteGame = () => {
    axios.delete(`/api/v1/lists/${id}`, {
      headers: {
        "x-access-token": token,
      },
    })
    .then(res => {
      setLists(res.data) // the DELETE route returns updated list as response
      handleClose()
    })
    .catch(err => {
      alert(err.response.data.error)
    })
  }
  const editRanking = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `/api/v1/lists/${id}`,
      data: {
        token,
        ranking: rankingValue
      },
    })
      .then((res) => {
       setLists(res.data)
      })
      .catch((err) => alert(err.response.data.error));
    e.target.innerText = "Success!";
    e.target.className = "bg-success text-light";
  };

  if (!token) {
    navigate("/login");
  }

  const goHome = () => {
    navigate("/")
  }

  return (
    <div>
      <div className="home__header">
      <div className="home__header--line"> </div>
      <h1 className="display-3 mt-5 pt-3 text-center">My List</h1>
      </div>
      {lists && lists.length === 0 && (
        <Figure className="d-flex flex-column justify-content-center align-items-center list-figure mx-4">
        <Figure.Image
          width={500}
          height={500}
          alt="game over"
          src="../game-over.jpg"
        />
        <Figure.Caption>
          <button onClick={goHome} className="btn btn-secondary">Add some games!</button>
        </Figure.Caption>
      </Figure>
      )}
      <ListGroup className="my-list mx-auto" as="ul">
        {lists.map((game) => (
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={game.id}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{game.game_name}</div>
               <form><button onClick={editGame} className="btn btn-secondary" id={game.id}>Edit</button></form>
            </div>
            <Badge bg="secondary" variant="primary" pill>
              {game.ranking}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <>
          <Modal className="mt-5" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                onSubmit={(e) => {
                  editRanking(e);
                }}
              >
                <Form.Select
                  onChange={(e) => {
                    setRankingValue(e.target.value);
                  }}
                  aria-label="Default select example"
                >
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
                <Button className="btn btn-secondary mt-3" variant="primary" type="submit">
                  Save
                </Button>
                <Button className="btn btn-secondary ms-3 mt-3" variant="primary" onClick={deleteGame}>
                  Delete
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
}

export default Lists;
