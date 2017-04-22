/* eslint no-throw-literal: "off", prefer-template: "off" */
import { rideSchema, possibleValues } from './databaseSchema';

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


function getRandomTimestamp(daysShift, dayRange) {
  // kinda crazy. nonsense is for post and driver to be sequential
  const initialDate = new Date();
  const start = new Date(initialDate.getTime() + (60 * 60 * 24 * daysShift * 1000));
  const end = new Date(start.getTime() + (60 * 60 * 24 * dayRange * 1000));

  return new Date(start.getTime() + (Math.random() * (end.getTime() - start.getTime()))).getTime();
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

function getRandomFromDefined(groupTitle) {
  const array = possibleValues[groupTitle];

  return array[Math.floor(Math.random() * array.length)];
}

function getRandomPassengers(min, max) {
  const passengers = {};
  const numPassengers = getRandomInteger(min, max);

  for (let i = 0; i < numPassengers; i += 1) {
    passengers[getRandomFromDefined('passengers')] = true;
  }

  return passengers;
}

function getRandomBody() {
  const res = [];

  for (let i = 0; i < 12; i += 1) {
    res.push(getRandomFromDefined('placeholder'));
  }

  return res.join(' ');
}

function getRandomRequest(min, max) {
  const res = {};

  const numRequests = getRandomInteger(min, max);

  for (let i = 0; i < numRequests; i += 1) {
    const uid = guid();

    res[uid] = {
      message: 'Give me a ride please!',
      requestTimestamp: getRandomTimestamp(3, 4),
    };
  }

  return res;
}

function getMockValue(entry) {
  if (typeof entry !== 'object') {
    return entry;
  }

  let res;

  switch (entry.type) {
    case 'guid':
      res = guid();
      break;
    case 'integer':
      res = getRandomInteger(entry.min, entry.max);
      break;
    case 'timestamp':
      res = getRandomTimestamp(entry.dayShift, entry.dayRange);
      break;
    case 'location':
      res = getRandomFromDefined(entry.name);
      break;
    case 'passengers':
      res = getRandomPassengers(entry.min, entry.max);
      break;
    case 'placeholder':
      res = getRandomBody();
      break;
    case 'request':
      res = getRandomRequest(entry.min, entry.max);
      break;
    default:
      throw 'database schemea contains invalid type';
  }

  return res;
}

export default function generateEntry() {
  const resEntry = {};

  const keys = Object.keys(rideSchema);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    resEntry[key] = getMockValue(rideSchema[key]);
  }

  return resEntry;
}

