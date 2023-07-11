import "./searchButton.scss";
import { ReactComponent as SearchIcon } from "../../../assets/header/SearchIcon.svg";

const SearchButton = ({ onClick = () => {} }) => {
  return (
    <div
      className="search-button d-flex justify-content-center align-items-center"
      onClick={onClick}
    >
      <SearchIcon />
    </div>
  );
};

export default SearchButton;
