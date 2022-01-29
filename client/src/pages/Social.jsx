import axios from "axios";
import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Figure from "react-bootstrap/Figure";

function Social() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
          // setSearchResults(res.data);
          // console.log(res.data.id.toString())
          axios({
            method: "POST",
            url: "/api/v1/social",
            data: {
              UserId: res.data.id.toString()
            },
            headers: {
              "x-access-token": token,
            }
          }).then((response) => {console.log(response)})
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
          required
        />
        <button className="btn btn-secondary home__search-button" type="submit">
          Search
        </button>
      </form>

    </div>
  );
}

export default Social;
