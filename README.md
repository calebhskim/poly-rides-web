# poly-rides-web
Web implementation of the PolyRides application using React, Redux, and Firebase. Polyrides web looks to provide an easily searchable interface for the Cal Poly Rideshare facebook page along with providing a smooth platform to request and post rides.

## Install
To install this project you will need [yarn](https://yarnpkg.com/).
Follow the guide [here](https://yarnpkg.com/en/docs/install) to install [yarn](https://yarnpkg.com/).
Then to install this project run:
```
git clone https://github.com/calebhskim/poly-rides-web.git
cd poly-rides-web
yarn
```

## Development
In order to develop you will need to be added to the polyrides facebook application and polyrides firebase application. Ask either @lukasfroehlich or @calebhskim to be added.


## TODO:
* Auth
  * Implement persistence
  * Verify email
  * Password check/re-enter
* Finish SSR
* Update routing to react-router 2
* Add production webpack configuration
* Update to webpack 2
* Make application mobile friendly
* Error handling and logging
* Finish merging in facebook posts
* Validate users are in facebook group
* Merge with polyrides mobile applications
* Secure and setup environments: change config keys
  * Setup development
  * Setup testing
  * Setup production

## Data:
### Members
A map of all the members in the ridesharing group. Is used to verify users are in the rideshare group and is populated running
```
yarn run members
```
### fbposts
A map of all the facebook posts in the ridesharing page based on some timeline. Is populated running
```
yarn run fbposts
```
### Rides Object:
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
