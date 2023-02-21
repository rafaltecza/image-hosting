const bodyParser = require("body-parser");
const getAvatarItem = require("../lottie/items/avatar");

const registerRender = (app) => {
    const jsonParser = bodyParser.json();

    app.post('/render', jsonParser, async (req, res) => {
        const avatarAnimation = getAvatarItem("TESTING");
        avatarAnimation.then(buffer => res.send(buffer))
            .catch(err => res.send(err))
    })
}

module.exports = registerRender;