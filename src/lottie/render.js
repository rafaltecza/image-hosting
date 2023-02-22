const renderLottie = require("puppeteer-lottie");
const fs = require('fs');

const renderLottieAnimation = async (lottieAnimation, userUUID, avatarUrl, fileName, extension = "gif") => {

    lottieAnimation.assets[0].p = fileName;

    return await renderLottie({
        animationData: lottieAnimation,
        output: `public/generated/${userUUID}/${fileName}.${extension}`,
        puppeteerOptions: {
            executablePath: 'chromium-browser'
        }
    })
}

module.exports = renderLottieAnimation;