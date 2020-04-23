const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCodePage = require('./utils/geoCode');
const foreCast = require('./utils/foreCast');


const app = express()

//define pathname
const pathDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//set static derectory to server
app.use(express.static(pathDir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Author'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Author'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help text',
        title: 'Help',
        name: 'Author'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geoCodePage.geoCode(req.query.address, (error, { location, latitude, longitude } = {}) => {

        if (error) {
            return res.send({
                error: error
            })
        }

        foreCast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                foreCast: foreCastData,
                location,
                address: req.query.address
            })

        })

    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Chennai',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search'
        })
    }

    res.send({
        products: [],
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errormessage: 'page not found',
        name: 'Author'
    })
})

app.listen(3000, () => {
    console.log('server running')
})