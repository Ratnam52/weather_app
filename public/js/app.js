const weatherForm = document.querySelector('form')
const searchForm = document.querySelector('input')
const message_one = document.querySelector('#message_1')
const message_two = document.querySelector('#message_2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchForm.value
    message_one.textContent = 'Loding...'
    message_two.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message_one.textContent = data.error
            } else {
                message_one.textContent = data.location
                message_two.textContent = data.foreCast
            }
        })
    })
})