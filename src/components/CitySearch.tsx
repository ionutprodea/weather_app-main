import { useEffect, useState } from "react";
import { City } from "./City";
import axios, { CanceledError } from "axios";

interface Props {
  onSearchResults: (results: City[]) => void;
}

const CitySearch = ({ onSearchResults }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchKey, setSearchKey] = useState(0);

  useEffect(() => {
    if (searchStatus) {
      const controller = new AbortController();
      axios
        .get(
          `https://eu1.locationiq.com/v1/search?key=pk.e6631c0c752c38430cfcebb1d0807d03&q=${searchQuery}&format=json`,
          { signal: controller.signal }
        )
        .then((response) => {
          console.log(response.data);
          onSearchResults(response.data);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          console.log(err);
        });
      return () => controller.abort();
    }
  }, [searchStatus, onSearchResults, searchKey]);
  const handleSearch = () => {
    setSearchKey((prevKey) => prevKey + 1);
    setSearchStatus(true);
  };
  return (
    <>
      <div className="container d-flex  mt-5">
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Search city..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleSearch}
          className="btn btn-primary ms-3"
          style={{ height: "38px" }}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default CitySearch;
