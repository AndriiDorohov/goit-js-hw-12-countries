import { fetchCountryByName } from './fetchCountries';
import countryCardTpl from '../templates/country-item.hbs';
import countryListTpl from '../templates/countries-list.hbs';
import alert from './notify';
import debounce from 'lodash/debounce';

const refs = {
  countryContainer: document.querySelector('.markup-container'),
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-input'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  const searchQuery = refs.searchInput.value;

  if (searchQuery !== '') {
    fetchCountryByName(searchQuery)
      .then(renderCountry)
      .catch(error => console.log(error));
  }
}

function renderCountry(country) {
  refs.countryContainer.innerHTML = '';

  if (country.length < 2) {
    const singleCountry = country[0];
    const languages = singleCountry.languages;

    refs.countryContainer.innerHTML = countryCardTpl(singleCountry);
  } else if (country.length <= 10) {
    refs.countryContainer.innerHTML = countryListTpl(country);
  } else if (country.length > 10) {
    alert({
      text: "The query needs to be more specific!"
    });
  }
}
