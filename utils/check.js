function checkboxInputa(checkBox) {
  let check = "";
  let checkNodejs = checkBox.includes("nodejs");

  if (checkNodejs == true) {
    check = "checked";
    return check;
  } else {
    check = "";
    return check;
  }
}
function checkboxInputb(checkBox) {
  let check = "";
  let checkNodejs = checkBox.includes("nextjs");
  if (checkNodejs == true) {
    check = "checked";
    return check;
  } else {
    check = "";
    return check;
  }
}
function checkboxInputc(checkBox) {
  let check = "";
  let checkNodejs = checkBox.includes("reachjs");
  if (checkNodejs == true) {
    check = "checked";
    return check;
  } else {
    check = "";
    return check;
  }
}
function checkboxInputd(checkBox) {
  let check = "";
  let checkNodejs = checkBox.includes("typescript");
  if (checkNodejs == true) {
    check = "checked";
    return check;
  } else {
    check = "";
    return check;
  }
}

function attributeIconsa(icons) {
  let check = "";
  let checkNodejs = icons.includes("nodejs");
  if (checkNodejs == true) {
    check = "/Asset/image/nodejs.png";
    return check;
  } else {
    check = "";
    return check;
  }  
}
function attributeIconsb(icons) {
  let check = "";
  let checkNodejs = icons.includes("nextjs");
  if (checkNodejs == true) {
    check = "/Asset/image/nextjs.png";
    return check;
  } else {
    check = "";
    return check;
  }  
}
function attributeIconsc(icons) {
  let check = "";
  let checkNodejs = icons.includes("reachjs");
  if (checkNodejs == true) {
    check = "/Asset/image/react.png";
    return check;
  } else {
    check = "";
    return check;
  }  
}
function attributeIconsd(icons) {
  let check = "";
  let checkNodejs = icons.includes("typescript");
  if (checkNodejs == true) {
    check = "/Asset/image/typescript.png";
    return check;
  } else {
    check = "";
    return check;
  }  
}

function classIconsa(icons) {
  let check = "";
  let checkNodejs = icons.includes("nodejs");
  if (checkNodejs == true) {
    check = "blog-icon";
    return check;
  } else {
    check = "";
    return check;
  }  
}
function classIconsb(icons) {
  let check = "";
  let checkNodejs = icons.includes("nextjs");
  if (checkNodejs == true) {
    check = "blog-icon";
    return check;
  } else {
    check = "";
    return check;
  }  
}

function classIconsc(icons) {
  let check = "";
  let checkNodejs = icons.includes("reachjs");
  if (checkNodejs == true) {
    check = "blog-icon";
    return check;
  } else {
    check = "";
    return check;
  }  
}
function classIconsd(icons) {
  let check = "";
  let checkNodejs = icons.includes("typescript");
  if (checkNodejs == true) {
    check = "blog-icon";
    return check;
  } else {
    check = "";
    return check;
  }  
}

module.exports = {
  checkboxInputa,
  checkboxInputb,
  checkboxInputc,
  checkboxInputd,
  attributeIconsa,
  attributeIconsb,
  attributeIconsc,
  attributeIconsd,
  classIconsa,
  classIconsb,
  classIconsc,
  classIconsd,

  
};
