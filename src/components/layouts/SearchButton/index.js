import "./searchButton.scss";
import { ReactComponent as SearchIcon } from "../../../assets/header/SearchIcon.svg";

const SearchButton = () => {
  return (
    <div className="search-button d-flex justify-content-center align-items-center">
      <SearchIcon />
    </div>
  );
};

export default SearchButton;
