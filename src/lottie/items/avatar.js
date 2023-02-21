const renderLottieAnimation = require("../render");
const lottieAvatarJson = require("../../../assets/lottie/avatar.json");

/**
 *
 * @param uuid
 * @returns {Promise<*>}
 */
const getAvatarItem = async (uuid) => {
    return await renderLottieAnimation(lottieAvatarJson, uuid, "avatar");
}

module.exports = getAvatarItem;