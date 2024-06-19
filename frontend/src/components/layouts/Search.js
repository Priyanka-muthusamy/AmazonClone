import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation(); //this hook func is give the current url location
  const [keyword, setKeyword] = useState("");

  //here this func is execute when the search btn click
  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`); //here set the url when search run
  };

  //here set this func for remove the searched val
  const clearKeyword = () => {
    setKeyword(""); //here set the keyword val as empty
  }

  //here set the webpage is in the home page then clear the searched val in the search btn
  useEffect(() => {
    if(location.pathname === "/") { //here set the current location url is same with home page url then the keyword val will be cleared
      clearKeyword();
    }
  }, [location]) //here when this location val change this hook will execute

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => {
            setKeyword(e.target.value);
          }} //here change the keyword value as per the user searched data
          value={keyword} //here set the keyword val as input field val
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
}
