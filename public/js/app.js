console.log('Client side javascript file is loaded!')

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#m1')
const message2=document.querySelector('#m2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address=search.value
    message1.textContent='Loading....'
    message2.textContent=''
    fetch('http://localhost:3000/weather?address='+address).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=Error
            
        }
        else{
            message1.textContent=data.location
            message2.textContent=data.forecast
        }
    }
    )
}
)
})