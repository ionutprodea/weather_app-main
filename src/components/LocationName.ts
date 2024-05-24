/*

Types of names provided by API:

Type one: "Paris, Ile-de-France, Metropolitan France, France"
Type two: 

*/

function LocationName(input: string): string {
    const parts = input.split(", ");
    const lastIndex = parts.length - 1;

    // Check if the second-to-last part contains a number (indicating it's the second type of string)
    if (/^\d+$/.test(parts[lastIndex - 1])) {
        // For the second type
        const city = parts[0];
        const state = parts[parts.length - 3]; // Second-to-last element should be the state/province
        const country = parts[lastIndex]; // Last element is the country
        return `${city}, ${state}, ${country}`;
    } else {
        // For the first type
        return `${parts[0]}, ${parts[lastIndex-1]}, ${parts[lastIndex]}`;
    }
}

export default LocationName;
