// Include express from node_modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
// Define server related variables
const port = 3000

// import json
const restaurantList = require('./restaurant.json')

// setting static files
app.use(express.static('public'))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant =>
    restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant })
})

// start and listen on Express server
app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`)
})