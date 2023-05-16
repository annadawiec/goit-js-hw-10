import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

export const refs = {
  inputSearchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const enterDataSearchCountry = event => {
  event.preventDefault();

  const seekedCountry = refs.inputSearchBox.value.trim();
  if (!seekedCountry) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }

  fetchCountries(seekedCountry);
};

refs.inputSearchBox.addEventListener(
  'input',
  debounce(enterDataSearchCountry, DEBOUNCE_DELAY)
);

function createCountryInfo({ name, capital, population, flags, languages }) {
  const countryEl = `<div class="country-flag">
      <img src='${flags.svg}' alt='${name}'>
      <p class="country-name">${name.official}</p>
  </div>
    <ul class="country-list">
        <li class="country-item">Capital: <span class="country-capital">${capital}</span></li>
        <li class="country-item">Population: <span class="country-population">${population}</span></li>
        <li class="country-item">Languages: <span class="country-languages">${Object.values(
          languages
        )}</span></li>
  </ul>`;
  refs.countryInfo.insertAdjacentHTML('beforeend', countryEl);
}

function createCountryList({ name, flags }) {
  const countryEl = `<ul class="country-list-info">
  <li class="country-list-item">
      <img src='${flags.svg}' alt='${name}'>
      <p class="country-name-list">${name.official}</p>
  </li>
  </ul>`;
  refs.countryList.insertAdjacentHTML('beforeend', countryEl);
}

export const renderMarkupListCountries = array => {
  array.forEach(item => createCountryList(item));
};

export const renderMarkupCountries = array => {
  array.forEach(el => createCountryInfo(el));
};
