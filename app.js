require('dotenv').config();
const express = require('express');
const tunnel = require('tunnel');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const cors = require('cors');

const startScene = require('./controllers/start');
const testingScene = require('./controllers/testing');
const basicRoutes = require('./routes/basic');

const tests = [
    {
        id: '123',
        title: 'Тест 1',
        description: 'Описание теста 1',
        questions: [
            {
                title: 'Вопрос 1',
                answers: [
                    { title: 'Ответ 1', correct: true}, { title: 'Ответ 2', correct: false}, { title: 'Ответ 3', correct: false}
                ]
            },
            {
                title: 'Вопрос 2',
                answers: [
                    { title: 'Ответ 1', correct: false}, { title: 'Ответ 2', correct: true}, { title: 'Ответ 3', correct: false}
                ]
            },
            {
                title: 'Вопрос 3',
                answers: [
                    { title: 'Ответ 1', correct: false}, { title: 'Ответ 2', correct: false}, { title: 'Ответ 3', correct: true}
                ]
            }
        ],
        time: 20,
        attempts: 5
    },
    {
        id: '1234',
        title: 'Тест 2',
        description: 'Описание теста 2',
        questions: [
            {
                title: 'Вопрос 1',
                answers: [
                    { title: 'Ответ 1', correct: true}, { title: 'Ответ 2', correct: false}, { title: 'Ответ 3', correct: false}
                ]
            },
            {
                title: 'Вопрос 2',
                answers: [
                    { title: 'Ответ 1', correct: false}, { title: 'Ответ 2', correct: true}, { title: 'Ответ 3', correct: false}
                ]
            },
            {
                title: 'Вопрос 3',
                answers: [
                    { title: 'Ответ 1', correct: false}, { title: 'Ответ 2', correct: false}, { title: 'Ответ 3', correct: true}
                ]
            }
        ],
        time: 5,
        attempts: 2
    }
    ];

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/server/api/posts', basicRoutes);

mongoose
    .connect(process.env.DATABASE_HOST, { useNewUrlParser: true })
    .then(result => {
        const bot = new Telegraf(process.env.TELEGRAM_TOKEN, {
            telegram: {
                agent: tunnel.httpsOverHttp( { proxy: { host: process.env.PROXY_HOST, port: process.env.PROXY_PORT, proxyAuth: `${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}`, } } )
            }
        });

        const stage = new Stage([
            startScene,
            testingScene
        ]);
        bot.use(session());
        bot.use(stage.middleware());
        bot.start(async (ctx) =>  await ctx.scene.enter('start'));
        bot.action(/testing/, async (ctx) => await ctx.scene.enter('testing'));
        bot.launch();
        app.listen(8080);
    })
    .catch(err => console.log(err));
/*
При отправке теста:
1. проверяем chat_id. Если есть — отправляем
2. Если нет, проверяем наличие телеграм, если есть — отправляем смс
3. Если телеграм нет, возвращаем ошибку

При запуске бота /start, сохраняем в БД chat_id,
пишем приветственное сообщение,
проверяем наличие тестов для прохождения,
если есть — отправляем, если нет — ничего не отправляем.
* */