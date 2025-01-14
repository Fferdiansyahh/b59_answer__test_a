function triangle(num) {
  triangleStr = "";
  let k, j, i;

  for (i = num; i > 0; i--) {
    triangleStr += "#" + " ";
    console.log(triangleStr);
  }
}

function prima(no) {
  let count = 0;
  let i, j;
  for (j = 2; j <= no; j++) {
    for (i = 1; i <= j; i++) {
      if (j % i == 0) count++;
    }

    console.log(i);
    if (count == 2);
    count = 0;
  }
}

function test(no) {
  let newString = (() => {
    let concatenatedString = "";
    for (let i = 0; i <= no; i++) {
      concatenatedString += i;
    }
    return concatenatedString;
  })();

  console.log(newString);
}

function test(input) {
  let rows = input;
  // variable contains the next element of the pattern
  let variable = 1;
  // pattern variable carries the final pattern in string format
  let pattern = "";
  let count = 0;
  let i, j;

  // outer loop runs for `rows` no. of times
  for (let n = 1; n <= rows; n++) {
    for (let num = 1; num <= n; num++) {      
      if (variable < 10) {
        pattern += variable + "    ";
      } else {
        pattern += variable + "   ";
      }

      variable++;
    }

    pattern += "\n";
  }
  console.log(pattern);
}

function result(input) {
  let n = 10;
  nextPrime: for (let i = 2; i <= n; i++) {
    // for each i...
    for (let j = 2; j < i; j++) {
      // look for a divisor..
      if (i % j == 0) continue nextPrime; // not a prime, go next i
    }

    console.log(i); // a prime
  }
}

prima(30);
// triangle(5);
// test(7);
// result(6);
