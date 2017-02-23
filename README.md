# poly-rides-web
React native implementation of the PolyRides application.

## Install
To install this project you will need [yarn](https://yarnpkg.com/).
Follow the guide [here](https://yarnpkg.com/en/docs/install) to install [yarn](https://yarnpkg.com/).
Then to install this project run:
```
git clone https://github.com/calebhskim/poly-rides-web.git
cd poly-rides-web
yarn
```


## Generating Mock Data

To generate mock data run:
```
yarn run mockdata
```



## TODO:
* Finish SSR
* Configure Webpack properly
* Begin actual UI/UX
* Setup production



## Database Access Examples


The following code snippets are examples of how actions should access the database.
All snippets assume the same database ref:
```javascript
const rides = firebase.database().ref("rides");
```


One thing that is unclear is if the firebase handlers should be:
```
on('value') or on('child_added')
```
I suspect that on('value') is what we want becuase it can directly be set as the state. 
Read more about it [here](https://firebase.google.com/docs/database/web/lists-of-data).


## Testing

To run tests run:
```
yarn run test
```

To run tests while watching run:
```
yarn run test:watch
```

To turn off code coverage checks on each run change the following in package.json:
```
{
  "jest": {
    "codeCoverage": true
  }
}
```


### Get all trips as a passenger

```javascript
const passenger = 'caleb';
rides.orderByChild(`passengers/${passenger}`).equalTo(true).on('value', (snap) => {
  console.log(`getting all trips with ${passenger} as rider`);
  console.log(snap.val());
});
```


### Get all trips as a driver

```javascript
driver = 'caleb';
rides.orderByChild('driver').equalTo(driver).on('value', (snap) => {
  console.log(`getting all trips with ${driver} as driver`);
  console.log(snap.val());
});
```


### Get all current trips

```javascript
const currentTime = 6;
rides.orderByChild('departureTime').startAt(currentTime).on('value', (snap) => {
  console.log(`getting all trips ending after currentTime: ${currentTime}`);
  console.log(snap.val());
});
```
This can be limited to return a range after the current time by adding 'endAt'.


### Are there still seats for a trip?

```javascript
const trip = "one";
rides.child(`${trip}`).once('value', (snap) => {
  const tripVal = snap.val();
  const numPassengers = Object.keys(tripVal.passengers).length;

  if (numPassengers < tripVal.availableSeats) {
    console.log(`There are seats available in trip ${trip}`);
  } else {
    console.log(`There are no seats available in trip ${trip}`);
  }
});
```


### Simple Search
this is looking like just getting all current trips and doing the algorithm client side.

Ex: iterating through all current rides and sorting them by which are best

