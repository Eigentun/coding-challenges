import fs from "node:fs/promises";

const chars = [
    "https://anapioficeandfire.com/api/characters/583",
    "https://anapioficeandfire.com/api/characters/584",
    "https://anapioficeandfire.com/api/characters/585",
];

const getData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
};

// const getPromises = async (url) => {
//     const character = getData(url);
//     return character;

// const characterName = character.name;
// await fs.writeFile(
//     `character-${characterName}.txt`,
//     characterName,
// );
// };

// const getPromises = async (url) => {
//     try {
//         const promise = await getData(url);
//         //console.log("success");
//         return promise;
//     } catch (error) {
//         console.error(error.message);
//     }
// };
// console.log();

const makePromisesArray = (charArr) => {
    const promiseArr = [];
    for (const el of charArr) {
        promiseArr.push(getData(el));
    }

    //console.log(promiseArr);
    return promiseArr;
};

const characters = await Promise.all(makePromisesArray(chars));
const writeFiles = characters.map((character) => {
    const characterName = character.name;
    fs.writeFile(`character-${characterName}.txt`, characterName);
});

console.log(writeFiles);

//const characterPromises = Promise.all([promises]).then(() => {});
//console.log(characterPromises);
//saveCharacterToFile("https://anapioficeandfire.com/api/characters/583");
