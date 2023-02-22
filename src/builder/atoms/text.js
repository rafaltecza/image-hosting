// napisz builder w pliku builder.js z export zgrabnej funkcji dla tworzenia i zwrócenia tekstu na podstawie:
const Jimp = require("jimp");
const fs = require("fs");
const svgson = require("svgson");
const path = require("path");

/**
 *
 * @param userUUID
 * @param svgPath
 * @param text
 * @returns {Promise<string>}
 */
const addTextToSVG = async (
    svgPath, text = { id, firstName, month, day, year }) => {
        const svgText = fs.readFileSync(svgPath, 'utf8');
        const svgObj = await svgson.parse(svgText);

        svgObj.children.forEach(elem => {
            if(elem.name === "text") {
                elem.children.forEach(child => {
                    if(child.type === "text") {
                        child.value = child.value
                            .replaceAll('USER', text.firstName)
                            .replaceAll('MM', text.month)
                            .replaceAll('DD', text.day)
                            .replaceAll("RRRR", text.year);
                    }
                })

            }
        })

        const svgString = await svgson.stringify(svgObj);
        const outputPath = path.join(__dirname, `../../../public/generated/${text.id}`, 'status.svg');
        fs.writeFileSync(outputPath, svgString);

        // zwróć ścieżkę zapisanego pliku SVG
        return outputPath;
}

module.exports = addTextToSVG;