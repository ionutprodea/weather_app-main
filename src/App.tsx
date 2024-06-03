import { useState } from "react";
import { City } from "./components/City";
import CitySearch from "./components/CitySearch";
import DisplaySearchResults from "./components/DisplaySearchResults";
import LocationName from "./components/LocationName";
import DetailsCard from "./components/DetailsCard";

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
        {selectedCoordinates && (
          <DetailsCard cityDetails={selectedCoordinates}></DetailsCard>
        )}
      </div>
    </>
  );
}

export default App;
