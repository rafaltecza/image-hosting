// napisz builder w pliku builder.js z export zgrabnej funkcji dla tworzenia i zwrócenia tekstu na podstawie:
const Jimp = require("jimp");
const renderLottie = require('puppeteer-lottie')
const cors = require("cors");
const bodyParser = require('body-parser')

/**
 *
 * @param image
 * @param color
 * @param font
 * @param text
 * @param alignment
 * @returns {Jimp}
 */
const buildAvatar = (image,
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

app.post('/render', jsonParser, async (req, res) => {
    console.log(req.body);
    const {lottieAnimation, animationConfiguration} = req.body;
    const {fileName, extension} = animationConfiguration;

    return await renderLottie({
        animationData: lottieAnimation,
        output: `renders/${fileName}.${extension}`,
    }).then(buffer => res.send(buffer))
        .catch(err => res.send(err))
})


module.exports = buildAvatar;