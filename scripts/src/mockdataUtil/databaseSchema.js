export const rideSchema = {
  driver: {
    type: 'driver',
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
      latitude: 35.2828,
      longitude: -120.6596,
    },
    {
      name: 'fresno',
      latitude: 36.7468,
      longitude: -119.7726,
    },
  ],
  arriveLocation: [
    {
      name: 'sf',
      latitude: 37.7749,
      longitude: -122.4194,
    },
    {
      name: 'la',
      latitude: 34.0522,
      longitude: -118.2437,
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
