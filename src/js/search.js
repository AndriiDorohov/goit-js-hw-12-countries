import fetchCountrieByName from '../js/fetchCountries'
import countryCardTpl from '../templates/country-item.hbs'
import countryListTpl from '../templates/countries-list.hbs'
import alert from '../js/notify'
import debounce from 'lodash/debounce'

const refs = {
  countryContainer: document.querySelector('.markup-container'),
  searchForm: document.querySelector('.search-input'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  const form = e.target;
    const searchQuery = form.value;
   
     if (searchQuery != '') {
        fetchCountrieByName(searchQuery)
        .then(renderCounrty)
        .catch(error => console.log(error));}
};


function renderCounrty(country) {
  refs.countryContainer.innerHTML = '';
  if (country.length < 2) { refs.countryContainer.innerHTML = countryCardTpl(country); }
  else if (country.length <= 10) { refs.countryContainer.innerHTML = countryListTpl(country) }
  else if (country.length > 10) {alert({
            text: "Необходимо сделать запрос более специфичным!"
        }); }
}