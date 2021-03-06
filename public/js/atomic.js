String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function getRandomArbitaryInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomSubArray (array) {
  if (array.length < 4) return false;
  var randomSubArray = [];
  _.each(array, function (elem, i) {
    if (Math.random() > 0.5) {
      randomSubArray.push(elem);
    }
  })
  return randomSubArray.length > 3 && randomSubArray.length < Math.ceil(array.length*0.5)  ? randomSubArray : getRandomSubArray(array);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}