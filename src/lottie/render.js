const renderLottie = require("puppeteer-lottie");
const fs = require('fs');

const renderLottieAnimation = async (lottieAnimation, userUUID, fileName, extension = "gif") => {

    const path = `public/generated/${userUUID}`
    if (!fs.existsSync(path)){
        console.log("NIE ISTNIEJE TAKI")
        fs.mkdirSync(path);
    }

    return await renderLottie({
        animationData: lottieAnimation,
        output: `public/generated/${userUUID}/${fileName}.${extension}`,
        puppeteerOptions: {
            executablePath: 'chromium-browser'
        }
    })
}

module.exports = renderLottieAnimation;