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

const makePromisesArray = (charArr) => {
    const promiseArr = charArr.map(async (char) => {
        const charData = await getData(char);
        await fs.writeFile(`${charData.name}.txt`, charData.name);
        return charData;
    });

    return promiseArr;
};

const characters = await Promise.all(makePromisesArray(chars));

console.log(characters);
