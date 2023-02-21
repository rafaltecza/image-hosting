const renderLottie = require("puppeteer-lottie");

const renderLottieAnimation = async (lottieAnimation, userUUID, fileName, extension = "gif") => {
    return await renderLottie({
        animationData: lottieAnimation,
        output: `public/generated/${userUUID}/${fileName}.${extension}`,
    })
}

module.exports = renderLottieAnimation;