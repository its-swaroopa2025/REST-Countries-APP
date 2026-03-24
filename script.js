const filterByRegion=document.querySelector('.filter-by-region')
const countriesContainer=document.querySelector('.countries-container')
let allCountriesData
const sun=document.querySelector('.sun')
const searchInput=document.querySelector('.search-container input')
const themeSwitcher=document.querySelector('.moon')


fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital')
.then((res)=>res.json())
.then((data)=>{
  renderCountries(data)
  allCountriesData=data
  console.log(allCountriesData);
})


filterByRegion.addEventListener('change',(e)=>{
fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}?fields=name,flags,population,region,capital`)
.then((res)=>res.json())
.then(renderCountries)
})

function renderCountries(data){
   countriesContainer.innerHTML=''
    data.forEach(country=>{
  
        const countryCard=document.createElement('a');
countryCard.classList.add('country-card')
        countryCard.href = `/country.html?name=${country.name.common}`
 countryCard.innerHTML=''
countryCard.innerHTML=`<img src="${country.flags.svg}" alt="${country.name.common}">
    <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
    <p><b>Population:</b>${country.population.toLocaleString('en-IN')}</p>
    <p><b>Region:</b>${country.region}</p>
    <p><b>Capital:</b>${country.capital?country.capital[0]:"no Capital"}</p></div>

`
countriesContainer.append(countryCard)
    })
}

searchInput.addEventListener('input',(e)=>{
      const filteredCountries=allCountriesData.filter((country)=>
            country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
      if(filteredCountries.length===0){
        countriesContainer.innerHTML='<p class="not-found">"Oops! No results found 🌍"<p>'
       
      }
      else{
        renderCountries(filteredCountries)
      }
              
       
})


function updateThemeUI() {
    const isDark = document.body.classList.contains('dark-mode')

    sun.style.display = isDark ? "block" : "none"
    themeSwitcher.style.display = isDark ? "none" : "block"
}

themeSwitcher.addEventListener('click', () => {
    document.body.classList.add('dark-mode')
    updateThemeUI()
})

sun.addEventListener('click', () => {
    document.body.classList.remove('dark-mode')
    updateThemeUI()
})






