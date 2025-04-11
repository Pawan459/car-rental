export function getRandomReviewsNumber() {
  const reviews = 200 + Math.floor(Math.random() * 1000);
  return reviews;
}

export function getRandomRating() {
  const rating = (3.5 + (Math.random() * 1.49)).toFixed(1);
  return parseFloat(rating);
}

export function getRandomTransmission() {
  const transmissionTypes = ['Automatic', 'Manual'];
  const randomIndex = Math.floor(Math.random() * transmissionTypes.length);

  return transmissionTypes[randomIndex];
}

export function getRandomFuelType() {
  const fuelTypes = ['Petrol', 'Diesel', 'Electric'];
  const randomIndex = Math.floor(Math.random() * fuelTypes.length);

  return fuelTypes[randomIndex];
}

export function getRandomSeats() {
  const seats = Math.floor(Math.random() * 8) + 2; // Random number between 2 and 8
  return seats;
}

