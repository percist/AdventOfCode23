const { open, readFile, readdir, readFileSync } = require("fs/promises");

const { resolve } = require("node:path");

async function readFilePromise(path) {
    const file = await readFile(path, { encoding: "utf8" });
    return file;
}

async function processFile() {
    const filePath = resolve("./day2Input.txt");
    const fileStr = await readFilePromise(filePath);
    const fileArr = fileStr.split(/[\r\n]+/); //["game 1: 3 blue, 4 red 5 green", 'game 2: ...]
    return fileArr;
}

async function minCubeCalculator(){
    const fileArr = await processFile();
    let totalPower = 0;
    for(let i = 0; i<fileArr.length; i++){
        let gameStr = fileArr[i].split(":");
        const gameId = parseInt(gameStr[0].match(/\d/g).join(''));
        console.log(gameId);
        let trials = gameStr[1].split(';');
        let trialPower = 0;
        let minGreen=0, minRed=0, minBlue=0;
        for(let j = 0; j<trials.length; j++){
            const trialArr = trials[j].split(',');
            for(let k = 0; k<trialArr.length; k++){
                if(trialArr[k].indexOf('blue') != -1){
                    const currBlueScore = parseInt(trialArr[k].match(/\d/g).join(''));
                    if(minBlue === 0 || minBlue < currBlueScore){
                        minBlue = currBlueScore;
                        console.log('minBlue: '+ minBlue)
                    }
                }
                 if(trialArr[k].indexOf('red') != -1){
                    const currRedScore = parseInt(trialArr[k].match(/\d/g).join(''));
                    if(minRed === 0 || minRed < currRedScore){
                        minRed = currRedScore;
                    }
                }
                else if(trialArr[k].indexOf('green') != -1){
                    const currGreenScore = parseInt(trialArr[k].match(/\d/g).join(''));
                    if(minGreen === 0 || minGreen < currGreenScore){
                        minGreen = currGreenScore;
                    }
                }
            }
        }
        console.log('mins: '+ minBlue +', '+ minGreen+', '+minRed);
        trialPower = minGreen * minBlue * minRed;
        console.log('trialPower: '+ trialPower);
        totalPower += trialPower;
    }
    console.log(totalPower);
}

async function possibleGameEvaluator(){
    const fileArr = await processFile();
    let possibleGameIdsTotal = 0;
    let totalGameIdValue = 0;
    const RED = 12, GREEN = 13, BLUE = 14;
    for(let i = 0; i<fileArr.length; i++){
        let gamePossible = true;
        let gameStr = fileArr[i].split(":");
        const gameId = parseInt(gameStr[0].match(/\d/g).join(''));
        totalGameIdValue += gameId;
        let trials = gameStr[1].split(';');
        for(let j = 0; j<trials.length; j++){
            const trialArr = trials[j].split(',');
            for(let k = 0; k<trialArr.length; k++){
                if(trialArr[k].indexOf('blue') != -1){
                    const blueScore = parseInt(trialArr[k].match(/\d/g).join(''));
                    if(blueScore > BLUE){
                        gamePossible = false;
                        break;
                    }
                }
                else if(trialArr[k].indexOf('red') != -1){
                    const redScore = parseInt(trialArr[k].match(/\d/g).join(''));
                    if(redScore > RED){
                        gamePossible = false;
                        break;
                    }
                }
                else if(trialArr[k].indexOf('green') != -1){
                    const greenScore = parseInt(trialArr[k].match(/\d/g).join(''));
                    if(greenScore > GREEN){
                        gamePossible = false;
                        break;
                    }
                }
            }
            if(!gamePossible){
                console.log('Impossible gameId: '+ gameId)
                possibleGameIdsTotal += gameId;
                break;
            }
        }
        
    }
    console.log(totalGameIdValue - possibleGameIdsTotal);
    //const fileArr = fileStr.split(\[\r\n]+/);

}

minCubeCalculator();
