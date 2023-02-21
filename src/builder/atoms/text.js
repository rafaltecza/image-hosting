// napisz builder w pliku builder.js z export zgrabnej funkcji dla tworzenia i zwrócenia tekstu na podstawie:
const Jimp = require("jimp");

/**
 *
 * @param image
 * @param color
 * @param font
 * @param text
 * @param alignment
 * @returns {Jimp}
 */
const buildText = (image,
                   color = 0xFFFFFFFF,
                   font = Jimp.fonts.verdana10,
                   text,
                   alignment = Jimp.HORIZONTAL_ALIGN_CENTER) => {
    const builtText = new Jimp(image.bitmap.width, Jimp.AUTO, color);
    return builtText.print(font, 0, 0, {
        text: text,
        alignmentX: alignment,
    }, image.bitmap.width);
}

module.exports = buildText;