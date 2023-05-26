function fetchCountryByName(countryName) {
return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
  .then(response => {
if (!response.ok) {
  throw new Error('Request failed');
}
return response.json();
  })
  .catch(error => {
console.log(error);
  });
  }
  
  export { fetchCountryByName };  