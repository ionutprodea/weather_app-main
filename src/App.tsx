import { useState } from "react";
import { City } from "./components/City";
import CitySearch from "./components/CitySearch";
import DisplaySearchResults from "./components/DisplaySearchResults";

function App() {
  const [searchResult, setSearchResult] = useState<City[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    latitude: string;
    longitude: string;
  } | null>(null);

  const handleDetailsClick = (latitude: string, longitude: string) => {
    setSelectedCoordinates({ latitude, longitude });
    setSearchResult([]);
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center">
        <CitySearch onSearchResults={setSearchResult} />
        <DisplaySearchResults
          searchResults={searchResult}
          onDetailsClick={handleDetailsClick}
        />
        {selectedCoordinates && (
          <div>
            <h3>Selected Coordinates:</h3>
            <p>Latitude: {selectedCoordinates.latitude}</p>
            <p>Longitude: {selectedCoordinates.longitude}</p>
            {/* Render additional content based on selected coordinates */}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
