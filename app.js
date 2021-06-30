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

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(restaurant =>
    restaurant.name.toLowerCase().includes(keyword.toLocaleLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  )
  if (restaurants.length === 0) {
    res.render('index', { keyword: keyword, searchResult: '<h3>沒有符合的餐廳</h3>' })
  } else if (restaurants.length > 0)
    res.render('index', { restaurants: restaurants, keyword: keyword })
})


// start and listen on Express server
app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`)
})