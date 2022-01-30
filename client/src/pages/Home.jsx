import axios from "axios";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [gameName, setGameName] = useState("");
  const [ranking, setRanking] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
    if (!token) {
      navigate("/login");
      return;
    }
    handleShow();
    setGameName(e.target.id);
    console.log(gameName);
  };
  // Add game to db pt. 2
  const addGameFinish = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "/api/v1/lists/",
      data: {
        token,
        game_name: gameName,
        ranking,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => alert(err.response.data.error));
    e.target.innerText = "Success!";
    e.target.className = "bg-success text-light";
  };

  

  const moveForward = () => {
    const searchResultsCopy = Object.assign( searchResults, {
      ...searchResults
    })
    searchResultsCopy.push(searchResultsCopy[0])
    searchResultsCopy.shift()
    setSearchResults(searchResultsCopy)
    console.log(searchResultsCopy)
  }

  return (
    <div>
      <div className="">
        {" "}
        {/* mx-2 */}
        <div className="home__header">
          <div className="home__header--line"> </div>
          <h1 className="display-3 text-center mt-5 mb-3">
            What Have You Played?
          </h1>
          <p className="text-center">
            Create your personalized list from thousands of titles from the IGDB
            database.
          </p>
        </div>
        <form
          className="d-flex justify-content-center my-5"
          onSubmit={(e) => handleSearch(e)}
        >
          <input
            onChange={(e) => {
              setSearchValue(e.target.value);
              console.log(searchValue);
            }}
            value={searchValue}
            required
          />
          <button
            className="btn btn-secondary home__search-button"
            type="submit"
          >
            Search
          </button>
        </form>
        <button onClick={moveForward}>Next</button>
        <ul className="home__search-results d-flex mx-auto"> {/* d-sm-flex flex-sm-wrap justify-content-sm-around */}
          {searchResults.map((result) => (
            /* React-Bootstrap card, tooltip, & button components */
            <li className="search-result-li" key={result.id}>
              <Card className="mb-5 mx-auto" style={{ width: "12rem" }}>
                <Card.Img variant="top" src={result.url} />
                <Card.Body>
                  <OverlayTrigger
                    key={result.id}
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-${result.id}`}>
                        {result.name}
                      </Tooltip>
                    }
                  >
                    <Card.Title
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        width: "100%",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {result.name}
                    </Card.Title>
                  </OverlayTrigger>

                  <Button
                    onClick={addGameStart}
                    id={result.name}
                    variant="secondary"
                  >
                    Add game
                  </Button>
                </Card.Body>
              </Card>
            </li>
          ))
          }
          
        </ul>
        <h3 className="home__featured">Featured</h3>
        <div className="home__featured-container">
          <div
            className="home__featured-item__container"
            id="home__featured-item__container-1"
          >
            <div className="home__featured-item" id="home__featured-item__1">
              <h4 className="home__featured-item__content__top">
                <a
                  href="https://www.ign.com/articles/marvels-spider-man-miles-morales-ps5-review"
                  target="_blank"
                  rel="noreferrer"
                >
                  Spider-Man: Miles Morales
                </a>
              </h4>
            </div>
            <div className="home__featured-item" id="home__featured-item__2">
              <h4 className="home__featured-item__content__top">
                <a
                  href="https://www.ign.com/articles/tales-of-arise-review"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tales of Arise
                </a>
              </h4>
            </div>
            <div className="home__featured-item" id="home__featured-item__3">
              <h4 className="home__featured-item__content__top">
                <a
                  href="https://www.ign.com/articles/2019/11/15/star-wars-jedi-fallen-order-review"
                  target="_blank"
                  rel="noreferrer"
                >
                  Star Wars Jedi: Fallen Order
                </a>
              </h4>
            </div>
          </div>
          <div className="home__featured-container__inner">
            <div
              className="home__featured-item__container"
              id="home__featured-item__container-2"
            >
              <div className="home__featured-item" id="home__featured-item__4">
                <h4 className="home__featured-item__content__middle">
                  <a
                    href="https://www.ign.com/articles/persona-5-royal-review"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Personal 5 Royal
                  </a>
                </h4>
              </div>
            </div>
            <div
              className="home__featured-item__container"
              id="home__featured-item__container-3"
            >
              <div className="home__featured-item" id="home__featured-item__5">
                <h4 className="home__featured-item__content__bottom">
                  <a
                    href="https://www.ign.com/articles/destiny-2-beyond-light-review"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Destiny 2: Beyond Light
                  </a>
                </h4>
              </div>
              <div className="home__featured-item" id="home__featured-item__6">
                <h4 className="home__featured-item__content__bottom">
                  <a
                    href="https://www.ign.com/articles/2019/09/19/the-legend-of-zelda-links-awakening-review"
                    target="_blank"
                    rel="noreferrer"
                  >
                    The Legend of Zelda: Link's Awakening
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <>
          <Modal className="mt-5" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                onSubmit={(e) => {
                  addGameFinish(e);
                }}
              >
                <Form.Select
                  onChange={(e) => {
                    setRanking(e.target.value);
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
    </div>
  );
};

export default Home;
