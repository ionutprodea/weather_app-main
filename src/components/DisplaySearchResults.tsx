import { City } from "./City";
import Card from "./Card";

interface Props {
  searchResults: City[];
  onDetailsClick: (latitude: string, longitude: string, city: string) => void;
  detailsVisibility: (details: boolean) => void;
}

const DisplaySearchResults = ({
  searchResults,
  onDetailsClick,
  detailsVisibility,
}: Props) => {
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
            <h2 className="my-5 text-dark">Search Results:</h2>
          </div>
          <ul
            className="list-group d-flex flex-row flex-wrap justify-content-evenly"
            style={{ maxWidth: "700px" }}
          >
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
                  detailsVisibility={detailsVisibility}
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
