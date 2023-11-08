// your code here
const cakeAPI = 'http://localhost:3000/cakes'
let cakeList = []

//On page load, render details for first cakeObj in CakeList array
fetch(`${cakeAPI}/1`)
.then(res => res.json())
.then(cakeObj => renderDetails(cakeObj))

fetch(cakeAPI)
.then(res => res.json())
.then(cakeData => {
    cakeList = cakeData;
    renderAllCakes(cakeList)
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
    name.textContent = cakeObj.name
    image.src = cakeObj.image_url
    desc.textContent = cakeObj.description
    const reviews = cakeObj.reviews
    reviews.forEach(review => {
        const reviewLi = document.createElement('li')
        reviewLi.textContent = review
        reviewLi.id = cakeObj.id
        reviewLi.addEventListener('click', handleDelete)
        reviewList.append(reviewLi)
    })
}

//Review form setup

const form = document.querySelector('#review-form')

form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    //POST REQUEST


    //Add .then before below:
    const reviewList = document.querySelector('#review-list')
    const reviewLi = document.createElement('li')
    reviewLi.textContent = e.target.review.value
    reviewLi.addEventListener('click', handleDelete)
    reviewList.append(reviewLi)
}


//Function to delete comment when clicked

function handleDelete(e){
    e.target.remove()
}

//Functions to handle description submit
const descForm = document.querySelector('#description-form')
descForm.addEventListener('submit', handleDescSubmit)

function handleDescSubmit(e) {
    e.preventDefault()
    const newDesc = e.target.description.value
    const desc = document.querySelector('#cake-description')
    //PATCH REQUEST

    // fetch(`${cakeAPI}/${cakeObj.id}`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(newDesc)
    // })
    // .then(res => res.json())
    // .then(() => {
    //     desc.textContent = newDesc})
    desc.textContent = newDesc
}