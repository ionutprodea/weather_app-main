import { City } from "./City";
import Card from "./Card";

interface Props {
  searchResults: City[];
  onDetailsClick: (latitude: string, longitude: string) => void;
}

const DisplaySearchResults = ({ searchResults, onDetailsClick }: Props) => {
  const filteredResults = searchResults.filter(
    (city, index, self) =>
      city.class === "boundary" &&
      index === self.findIndex((t) => t.display_name === city.display_name)
  );

  return (
    <>
      {searchResults.length > 0 && (
        <div>
          <div className="d-flex justify-content-center">
            <h2 className="my-5">Search Results:</h2>
          </div>
          <ul className="list-group d-flex flex-row flex-wrap justify-content-evenly">
            {filteredResults.map((city) => (
              <li
                key={filteredResults.indexOf(city) + city.lat + city.lon}
                className="mb-5"
                style={{ listStyle: "none" }}
              >
                <Card
                  latitude={city.lat}
                  longitude={city.lon}
                  city={city.display_name}
                  onDetailsClick={onDetailsClick}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default DisplaySearchResults;
