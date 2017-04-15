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

## NOTES:
We support [`stage-1`](https://babeljs.io/docs/plugins/preset-stage-1/#community-discussion).  

## TODO:
* Auth
  * Implement persistence
  * Verify email
  * Password check/re-enter
* Finish SSR
* Handle routing
* Add Navbar
* Configure Webpack properly
* Setup testing
* Begin actual UI/UX
* Setup production
* Connect to Firebase
* Update to webpack 2

## DATA:
* Rides Object:
```
{
 id: "vCxcrCsnmJU3T8uvF1ZOucozad123asd",
 costPerSeat: 5,
 departTimestamp: 1490894453265,
 description: "test",
 driver: {
  uid: "vCxcrCsnmJU3T8uvF1ZOucozadx1",
  displayName: "Bob Doe",
  photoURL: "http://asdf.asdf"
 },
 fromLocation: "Seattle",
 postTimestamp: 1490890559240,
 requests: {
  "vCxcrCsnmJU3T_some_uid": {
   message: "hello",
   requestTimeStamp: 1490894453263 
  },
 },
 toLocation: "Austin",
 totalSeats: 4
}
```
