import { useEffect, useState } from "react";
import { City } from "./components/City";
import CitySearch from "./components/CitySearch";
import DisplaySearchResults from "./components/DisplaySearchResults";
import DetailsCard from "./components/DetailsCard";
import UserLocation from "./components/UserLocation";

function App() {
  const [searchResult, setSearchResult] = useState<City[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    latitude: string;
    longitude: string;
    city: string;
  } | null>(null);

  const [details, setDetails] = useState(false);
  useEffect(() => {
    const savedCoordinates = sessionStorage.getItem("savedCoordinates");
    if (savedCoordinates) {
      setSelectedCoordinates(JSON.parse(savedCoordinates));
    }
    const toggleDetails = sessionStorage.getItem("toggleDetails");
    if (toggleDetails) {
      setDetails(JSON.parse(toggleDetails));
    }
  }, []);

  const handleDetailsClick = (
    latitude: string,
    longitude: string,
    city: string
  ) => {
    setSearchResult([]);
    setSelectedCoordinates({ latitude, longitude, city });
    const savedCoordinates = { latitude, longitude, city };
    const toggleDetails = true;
    sessionStorage.setItem(
      "savedCoordinates",
      JSON.stringify(savedCoordinates)
    );
    sessionStorage.setItem("toggleDetails", JSON.stringify(toggleDetails));
  };

  return (
    <>
      <UserLocation />
      <div className="container d-flex flex-column align-items-center">
        <CitySearch
          onSearchResults={setSearchResult}
          detailsLocation={setSelectedCoordinates}
          detailsVisibility={setDetails}
        />
        {!details && (
          <DisplaySearchResults
            searchResults={searchResult}
            onDetailsClick={handleDetailsClick}
            detailsVisibility={setDetails}
          />
        )}
        {selectedCoordinates && (
          <DetailsCard cityDetails={selectedCoordinates}></DetailsCard>
        )}
      </div>
    </>
  );
}

export default App;
