const renderLottieAnimation = require("../render");
const lottieAvatarJson = require("../../../assets/lottie/avatar.json");

/**
 *
 * @param uuid
 * @param avatarUrl
 * @returns {Promise<*>}
 */
const getAvatarItem = async (uuid, avatarUrl) => {
    return await renderLottieAnimation(lottieAvatarJson, uuid, avatarUrl, "avatar");
}

module.exports = getAvatarItem;