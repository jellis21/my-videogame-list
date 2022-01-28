import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Figure from 'react-bootstrap/Figure';

function Lists() {
  const [lists, setLists] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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

  const deleteGame = (e) => {
    e.preventDefault();
    axios.delete(`/api/v1/lists/${e.target.id}`, {
      headers: {
        "x-access-token": token,
      },
    })
    .then(res => {
      setLists(res.data) // the DELETE route returns updated list as response
    })
    .catch(err => {
      alert(err.response.data.error)
    })
  }

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
        <Figure className="d-flex flex-column justify-content-center align-items-center list-figure">
        <Figure.Image
          width={200}
          height={200}
          alt="game over"
          src="../game-over.jpg"
        />
        <Figure.Caption>
          <button onClick={goHome} className="btn btn-primary">Add some games!</button>
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
               <form><button onClick={deleteGame} className="btn btn-secondary" id={game.id}>Remove</button></form>
            </div>
            <Badge bg="secondary" variant="primary" pill>
              {game.ranking}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Lists;
