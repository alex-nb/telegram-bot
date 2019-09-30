const Telegraf = require('telegraf');
const tunnel = require('tunnel');
const Markup = require('telegraf/markup');
//361094070
//200230222
exports.startBot = async (req, res, next) => {
    //console.log(req.body);
    const bot = new Telegraf(process.env.TELEGRAM_TOKEN, {
        telegram: {
            agent: tunnel.httpsOverHttp( { proxy: { host: process.env.PROXY_HOST, port: process.env.PROXY_PORT, proxyAuth: `${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}`, } } )
        }
    });
    bot.telegram.sendMessage(361094070, 'Хэй, появился новый тест: /start');
    res.status(200).json(req.body);
};