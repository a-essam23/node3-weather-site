console.log('Client side javascript file!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#result')
const messageTwo = document.querySelector('#error')




weatherForm.addEventListener('submit', (e)=> {
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    response.json().then((data)=>{
        if(!data.error){
            messageOne.textContent=data.location 
            messageTwo.textContent=data.weatherData.weather
            console.log(data)
        }else{
            messageOne.textContent=data.error
        }
        
    })
})
})