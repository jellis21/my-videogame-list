import axios from "axios";
import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

function Social() {
  const [searchValue, setSearchValue] = useState("");
  const [lists, setLists] = useState([]);

  const token = localStorage.getItem("token");
  

    // Submit function in form
    const handleSearch = (e) => {
      e.preventDefault();
      axios
        .get(`/api/v1/social/${searchValue}`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          axios({
            method: "POST",
            url: "/api/v1/social",
            data: {
              UserId: res.data.id.toString()
            },
            headers: {
              "x-access-token": token,
            }
          }).then((response) => {setLists(response.data)})
        })
        .catch((err) => {
          alert(err);
        });
    };

  return (
    <div>
      <div className="home__header">
        <div className="home__header--line"> </div>
        <h1 className="display-3 text-center mt-5 mb-3">Social</h1>
        <p className="text-center">
        Have a friend on MVGL? See what games they have in their list!
      </p>
      </div>

      <form className="d-flex justify-content-center my-5" onSubmit={(e) => handleSearch(e)}>
        <input
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          value={searchValue}
          placeholder="Find your friends' lists"
          required
        />
        <button className="btn btn-secondary home__search-button" type="submit">
          <i className="bi bi-search"></i>
        </button>
      </form>

      <ListGroup className="my-list mx-auto" as="ul">
        {lists.map((game) => (
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={game.id}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{game.game_name}</div>
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

export default Social;
