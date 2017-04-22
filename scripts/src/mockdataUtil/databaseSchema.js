export const rideSchema = {
  id: {
    type: 'guid',
  },
  driver: {
    type: 'integer',
    min: 1,
    max: 10,
  },
  totalSeats: 4,
  departTimestamp: {
    type: 'timestamp',
    dayShift: 6,
    dayRange: 10,
  },
  postTimestamp: {
    type: 'timestamp',
    dayShift: 0,
    dayRange: 5,
  },
  departLocation: {
    type: 'location',
    name: 'departLocation',
  },
  arriveLocation: {
    type: 'location',
    name: 'arriveLocation',
  },
  requests: {
    type: 'request',
    min: 0,
    max: 2,
  },
  passengers: {
    type: 'passengers',
    min: 0,
    max: 4,
  },
  costPerSeat: {
    type: 'integer',
    min: 10,
    max: 30,
  },
  description: {
    type: 'placeholder',
  },
};

export const possibleValues = {
  passengers: [
    'caleb',
    'lukas',
    'tyler',
    'bob',
    'jack',
    'smith',
    'billy',
    'larry',
    'gorman',
    'rich',
  ],
  departLocation: [
    {
      name: 'slo',
      lat: 35.2828,
      lng: -120.6596,
    },
    {
      name: 'fresno',
      lat: 36.7468,
      lng: -119.7726,
    },
  ],
  arriveLocation: [
    {
      name: 'sf',
      lat: 37.7749,
      lng: -122.4194,
    },
    {
      name: 'la',
      lat: 34.0522,
      lng: -118.2437,
    },
  ],
  placeholder: [
    'the',
    'i',
    'car',
    'very',
    'fast',
    'good',
    'enjoy',
    'thinking',
    'books',
    'stop',
    'read',
    'trump',
    'quick',
    'slow',
    'angry',
    'french',
  ],
};
