const { open, readFile, readdir, readFileSync } = require("fs/promises");
const { resolve } = require("node:path");

async function readFilePromise(path) {
  const file = await readFile(path, { encoding: "utf8" });
  return file;
}

async function processFile(data) {
  let accumulator = 0;
  const filePath = resolve("./AdventDay1.txt");
  const fileStr = await readFilePromise(filePath);
  const fileArr = fileStr.split(/[\r\n]+/);
  //   console.log("fileArr at 0: " + fileArr[0]);
  const numArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (let i = 0; i < fileArr.length; i++) {
    let currCode = fileArr[i];
    console.log("currCode: " + currCode);
    currCode = convertStrToNum(currCode);
    console.log("currCode converted: " + currCode);
    let firstDigit, secondDigit, codeVal;
    //console.log("accumulator: " + accumulator);
    for (let j = 0; j < currCode.length; j++) {
      //console.log("val check: " + numArr.includes(currCode[j])+"  - " + currCode[j]);

      if (numArr.includes(currCode[j])) {
        //console.log("currCode[" + j + "]: " + currCode[j]);
        firstDigit = currCode[j];
        //console.log("firstDigit: " + firstDigit);
        break;
      }
    }
    for (let j = currCode.length - 1; j >= 0; j--) {
      //console.log("currCode: " + currCode);
      //console.log("currCode[k]: " + currCode[j]);
      if (numArr.includes(currCode[j])) {
        secondDigit = currCode[j];
        //console.log("secondDigit: " + secondDigit);
        codeVal = firstDigit + secondDigit;
        console.log("current Value: " + parseInt(codeVal));
        accumulator += parseInt(codeVal);
        console.log("new total: " + accumulator);
        break;
      }
    }
  }
  console.log(accumulator);
}

function convertStrToNum(str) {
  const strMapDouble = {
    oneight: "18",
    twone: "21",
    threeight: "38",
    fiveight: "58",
    nineight: "98",
    sevenine: "79",
    eightwo: "82",
    eighthree: "83",
  };
  const strMap = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };
  for (key of Object.keys(strMapDouble)) {
    str = replaceAll(str, key, strMapDouble[key]);
  }
  for (key of Object.keys(strMap)) {
    str = replaceAll(str, key, strMap[key]);
  }
  return str;
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

processFile();
