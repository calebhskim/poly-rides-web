import { rideSchema, possibleValues } from './databaseSchema';


function getRandomTimestamp(daysShift, dayRange) {
  // range of up to a week in advance

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

function getRandomPassengers(start, end) {
  const passengers = {};
  const numPassengers = getRandomInteger(start, end);

  for (let i = 0; i < numPassengers; i += 1) {
    passengers[getRandomFromDefined('passengers')] = true;
  }

  return passengers;
}

function getRandomBody(groupTitle) {
  const res = [];

  for (let i = 0; i < 12; i += 1) {
    res.push(getRandomFromDefined(groupTitle));
  }

  return res.join(' ');
}

function getMockValue(typeString) {
  if (typeof typeString === 'number') {
    return typeString;
  }

  let res;
  const type = typeString.split(' ')[0];
  const details = typeString.split(' ').slice(1).map(n => parseInt(n, 10));

  switch (type) {
    case 'integer':
      res = getRandomInteger(details[0], details[1]);
      break;
    case 'timestamp':
      res = getRandomTimestamp(details[0], details[1]);
      break;
    case 'location':
      res = getRandomFromDefined(type);
      break;
    case 'passengers':
      res = getRandomPassengers(details[0], details[1]);
      break;
    case 'placeholder':
      res = getRandomBody(type);
      break;
    default:
      res = type;
  }

  return res;
}

export default function generateEntry() {
  let entry;
  const resEntry = {};

  for (let i = 0; i < rideSchema.length; i += 1) {
    entry = rideSchema[i];
    resEntry[entry[0]] = getMockValue(entry[1]);
  }

  return resEntry;
}

