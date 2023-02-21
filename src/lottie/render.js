const renderLottie = require("puppeteer-lottie");

const renderLottieAnimation = async (lottieAnimation, userUUID, fileName, extension = "mp4") => {
    return await renderLottie({
        animationData: lottieAnimation,
        output: `public/generated/${userUUID}/${fileName}.${extension}`,
        puppeteerOptions: {
            executablePath: 'chromium-browser'
        }
    })
}

module.exports = renderLottieAnimation;