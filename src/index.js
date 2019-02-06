//assign some useful variables
const filterDogsBtn = document.querySelector('#good-dog-filter')
const filterDiv = document.querySelector('#filter-div')
const dogBar = document.querySelector('#dog-bar')
const dogSummaryContainer = document.querySelector('#dog-summary-container')
const dogInfo = document.querySelector('#dog-info')


//functions

//state
const state = {
  dogs: [],
  selectedDog: null,
  filter: false
}

//main fetch
function getAllPups() {
  return fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {state.dogs = data})
    .then(renderAllPups)
}
//render all
function renderAllPups() {
  return state.dogs.forEach(dog => renderPup(dog))
}

//render only good boys
function renderGoodPups() {
  goodBois = state.dogs.filter(dog => dog.isGoodDog)
  return goodBois.forEach(dog => renderPup(dog))
}

//render one
function renderPup(dog) {
  const dogContainer = document.createElement('div')
    dogContainer.id = "dog-info"
  const nameSpan = document.createElement('span')
    nameSpan.innerText = `${dog.name}`
    nameSpan.addEventListener('click', event => {
      state.selectedDog = dog
      showSelectedDog(state.selectedDog)
    })
    dogContainer.append(nameSpan)
  dogBar.appendChild(dogContainer)
}

//show individual dog in more detail
function showSelectedDog(dog) {
  dogInfo.innerHTML = `
    <span>${dog.name}</span>
    <img src="${dog.image}" >
    <button class="goodBoyBtn">${dog.isGoodDog ? "Good Doge" : "Bad Doge" }</button>
  `

  //Good/Bad doge button switcheroo
  const goodBoyBtn = document.querySelector('.goodBoyBtn')
    goodBoyBtn.addEventListener('click', function() {
      state.selectedDog.isGoodDog = !state.selectedDog.isGoodDog
      showSelectedDog(state.selectedDog)
    })
}

//filter button
filterDogsBtn.addEventListener('click', function() {
  state.filter =!state.filter
  filterDogsBtn.innerText = state.filter ? "Filter good dogs: ON" : "Filter good dogs: OFF"
  updateFilterBar()
})

//conditional to load either all the dogs or just the good bois
function updateFilterBar() {
  if (state.filter) {
    dogBar.innerHTML = ""
    renderGoodPups()
  } else {
    dogBar.innerHTML = ""
    renderAllPups()
  }
}

//initalize function
function init() {
  getAllPups()
  console.log("got all da pups");
  console.log(state)

}

init()
