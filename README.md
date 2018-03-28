## Getting up and running:

1) Clone the repo:
```
git clone https://github.com/LevytsRoman/code-assessment-web.git
```

2) Install dependencies by running:
```
npm install
```

3) Start a development server with scss watcher: 
```
npm start
```
4) For testing run: 
```
npm test
```

## Design decisions explanation:

### Implementing the API:
  I've decided to use axios library for making the API call. As far as I know built in fetch doesn't enter the .catch block in case of error status.

  Since redux-thunk was already set up, I've taken advantage of that and just replaced the asyncronys call to the mock api with the actual call. 

  There were two notable differences between the API response and products.json:
  1) **title** property was called **productTitle** in the response
  2) **price** property was represented with a hash composed of value(the price) and denomination

  I've decided it would be a lot of work to rewrite the entire app, to handle these differences, so I used a spread operator 
  `{...}` to keep the data that I had and over-write the keys that weren't formated the way I needed. I've also included an imgUrl variable which would hold an image url, which I use to render product images in the app.
  

### Enchancing cart functionality:
  I've decided to utilize TDD approach to the best of my ability. Once I figured out how the app works and had a clear understanding of how I want to tackle a given feature, I wrote out tests for the reducers to cover given feature, then modified reducers to pass those test, and from there moved on to developing appropriate action creators and injecting those into the APP where they were necessary.

  I decided to keep following the container pattern(only container components subscribe to the store and pass all the props necessary to presentational components) for managing state, rather then connecting presentation components to the store directly. Mosly for the sake of consistency.

  #### Removing items from the store:
  I had two options of how to handle remove item and decrement item. First would be to implement action that decrements an item, and later reuse that action in a loop to decrement all items. But ultimately rejected this and decided to have two separate actions for the sake of performance. An action creator dispatching actions in a loop just sounded like a bad idea.

  #### Modifying amount of items in a cart:
  I've chosen to reuse addToCart action because it did exactly what I wanted for the ```+``` button and built a separate action creator for the ```-``` button that only decrements if the count is greater then one. 
  
  An alternative was to rewrite addToCart to increment or decrement based on a variable that was passed in. I was very drawn to that idea but figured there was a large chance of making an error in the addToCart action creator which would result in other features either breaking or developping bugs, so decided to keep those separate.

### Styling:
  I've chosen to use SCSS. I think it's the most flexible approach. If you were to move from react to something like Vue.js or plain html, you'd be able to reuse the styling if you keep html structure the same. It'd prove more difficult with inline styles or CSS-in-JS. I also enjoy the ability to define nested syles which improves the readability of CSS and prevents me from having to write overly long CSS selector chains or give everything an id for specificity purposes.

  SCSS also provided a nice solution to the problem of reusing same Product component both in ProductList and Cart by allowing me to define different style rules depending on the parent class.

  I've approach styling by going from top to bottom and styling each section of the project individually. Once it was done, I've spent some time writing media queries for responsive design, and a little bit of time refactoring and doing my best to reuse as much styling as I could. This particular area could use a lot of imporvement, but sadly I'm just not there yet.