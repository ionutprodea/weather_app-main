import { useState } from "react";
import { City } from "./components/City";
import CitySearch from "./components/CitySearch";
import DisplaySearchResults from "./components/DisplaySearchResults";
import LocationName from "./components/LocationName";

function App() {
  const [searchResult, setSearchResult] = useState<City[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    latitude: string;
    longitude: string;
    city: string;
  } | null>(null);
  const [details, setDetails] = useState(false);

  const handleDetailsClick = (
    latitude: string,
    longitude: string,
    city: string
  ) => {
    setSelectedCoordinates({ latitude, longitude, city });
    setSearchResult([]);
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center">
        <CitySearch
          onSearchResults={setSearchResult}
          detailsVisibility={setSelectedCoordinates}
        />
        {!details && (
          <DisplaySearchResults
            searchResults={searchResult}
            onDetailsClick={handleDetailsClick}
            detailsVisibility={setDetails}
          />
        )}
        {selectedCoordinates && !details && (
          <div>
            <h3>{LocationName(selectedCoordinates.city)}</h3>
            <p>Latitude: {selectedCoordinates.latitude}</p>
            <p>Longitude: {selectedCoordinates.longitude}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
