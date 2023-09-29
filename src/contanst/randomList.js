export default function getRandomValuesFromArray(arr, count) {
  var result = [];

  while (result.length < count) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    var randomValue = arr[randomIndex];

    if (!result.includes(randomValue)) {
      result.push(randomValue);
    }
  }

  return result;
}
