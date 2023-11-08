// your code here
const cakeAPI = 'http://localhost:3000/cakes'
let cakeList = []

fetch(cakeAPI)
.then(res => res.json())
.then(cakeData => {
    cakeList = cakeData;
    renderAllCakes(cakeList)
    //On page load, render details for first cakeObj in CakeList array
    renderDetails(cakeList[0])
})

function renderAllCakes() {
    const cakeDiv = document.querySelector('#cake-list')
    cakeDiv.innerHTML = ''
    cakeList.forEach(cakeObj => renderOneCake(cakeObj))
}

function renderOneCake(cakeObj){
    const cakeDiv = document.querySelector('#cake-list')
    const cakeLi = document.createElement('li')
    cakeLi.addEventListener('click', (e) => renderDetails(cakeObj))
    cakeLi.textContent = cakeObj.name
    cakeDiv.append(cakeLi)
}

function renderDetails(cakeObj) {
    const name = document.querySelector('#cake-name')
    const image = document.querySelector('#cake-image')
    const desc = document.querySelector('#cake-description')
    const reviewList = document.querySelector('#review-list')
    reviewList.innerHTML = ''
    console.log('clicked')
    name.textContent = cakeObj.name
    image.src = cakeObj.image_url
    desc.textContent = cakeObj.description
    const reviews = cakeObj.reviews
    reviews.forEach(review => {
        const reviewLi = document.createElement('li')
        reviewLi.textContent = review
        reviewList.append(reviewLi)
    })
}

//Form setup

const form = document.querySelector('#review-form')

form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    const reviewList = document.querySelector('#review-list')
    const reviewLi = document.createElement('li')
    reviewLi.textContent = e.target.review.value
    reviewList.append(reviewLi)
}