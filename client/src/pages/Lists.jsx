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
      <h1 className="display-1 text-center mt-3">My List</h1>
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
      <ListGroup as="ul">
        {lists.map((game) => (
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={game.id}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{game.game_name}</div>
              placeholder <form><button onClick={deleteGame} className="btn btn-primary" id={game.id}>Remove</button></form>
            </div>
            <Badge variant="primary" pill>
              {game.ranking}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Lists;
