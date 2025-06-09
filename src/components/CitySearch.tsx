import { useEffect, useState } from "react";
import { City } from "./City";
import axios, { CanceledError } from "axios";

interface Props {
  onSearchResults: (results: City[]) => void;
  detailsLocation: (location: any) => void;
  detailsVisibility: (details: boolean) => void;
}

const CitySearch = ({
  onSearchResults,
  detailsLocation,
  detailsVisibility,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchKey, setSearchKey] = useState(0);
  const showDetails = false;

  useEffect(() => {
    const savedResults = sessionStorage.getItem("searchResults");
    if (savedResults) {
      onSearchResults(JSON.parse(savedResults));
    }
  }, [onSearchResults]);

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
          sessionStorage.setItem(
            "searchResults",
            JSON.stringify(response.data)
          );
          onSearchResults(response.data);
          setSearchQuery("");
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
    detailsLocation(showDetails);
    detailsVisibility(showDetails);
    sessionStorage.setItem("toggleDetails", "");
    sessionStorage.setItem("savedCoordinates", "");
  };

  return (
    <>
      <div className="container d-flex mt-5" style={{ maxWidth: "620px" }}>
        <form
          className="d-flex w-100"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            className="form-control mb-3 search-box"
            type="text"
            placeholder="Search city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-warning ms-3"
            style={{ height: "38px" }}
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default CitySearch;
