import * as fs from "fs";

const characterArray = [];

const getData = async () => {
    try {
        const response = await fetch(
            "https://anapioficeandfire.com/api/books/1",
        );
        if (!response.ok) {
            throw new Error("Couldn't fetch.");
        }
        const data = await response.json();
        const characters = data.povCharacters;
        const promises = await Promise.all(characters.map(async (url) => {
            const resp = await fetch(url);
            const respData = await resp.json();
            const names = respData.name;
            return names;
        }));
        const namesList = promises.join("\n");
        fs.writeFile("character.txt", namesList, fileWritten);

        function fileWritten() {
            console.log("file written");
        }
    } catch (error) {
        console.error(error);
    }
};

getData();
