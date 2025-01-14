function array(sortArray) {
  result = sortArray.sort((a, b) => a - b).toString();

  const even = sortArray.filter((number) => {
    return number % 2 === 0;
  });

  const odd = sortArray.filter((number) => {
    return number % 2 !== 0;
  });

  console.log(`Array : ${result}`);
  console.log(`Ganjil : ${odd}`);
  console.log(`Genap : ${even}`);
}

function order(sortArray) {
  for (var i = 0; i < sortArray.length; i++) {
    for (var j = 0; j < sortArray.length; j++) {
      if (sortArray[i] < sortArray[j]) {
        var temp = sortArray[i];
        sortArray[i] = sortArray[j];
        sortArray[j] = temp;
      }
    }
  }
  sortArray = sortArray.toString();
  console.log("Array: ", sortArray);
}

function even(sortArray) {
  for (var i = 0; i < sortArray.length; i++) {
    for (var j = 0; j < sortArray.length; j++) {
      if (sortArray[i] < sortArray[j]) {
        var temp = sortArray[i];
        sortArray[i] = sortArray[j];
        sortArray[j] = temp;
      }
    }
  }
  sortArray = sortArray.filter((number) => {
    return number % 2 === 0;
  });
  sortArray = sortArray.toString();
  console.log("Genap: ", sortArray);
}

function odd(sortArray) {
  for (var i = 0; i < sortArray.length; i++) {
    for (var j = 0; j < sortArray.length; j++) {
      if (sortArray[i] < sortArray[j]) {
        var temp = sortArray[i];
        sortArray[i] = sortArray[j];
        sortArray[j] = temp;
      }
    }
  }

  sortArray = sortArray.filter((number) => {
    return number % 2 !== 0;
  });

  sortArray = sortArray.toString();
  console.log("Ganjil: ", sortArray);
}

let sortArray = [2, 24, 32, 22, 31, 100, 56, 21, 99, 7, 5, 37, 97, 25, 13, 11];
order(sortArray);
odd(sortArray);
even(sortArray);
