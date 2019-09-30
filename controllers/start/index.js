const Stage = require('telegraf/stage');
const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/base');

const start = new Scene('start');

start.enter(async (ctx) => {
    //console.log(ctx.from);
    await ctx.reply('Привет. Хочешь пройти немного теста?', Markup.inlineKeyboard([
        Markup.callbackButton('Хочу!', 'choose-test')
    ]).extra());
});

start.action(/choose-test/, async (ctx) => {
    //здесь получение не пройденных тестов для конкректного пользователя (в модели теста должен быть этот юзер, в модели юзера не должно быть этого теста)
    //получаем id, title, description, time, attempts
    const tests = [
        {
            id: '123',
            title: 'Тест 1',
            description: 'Описание теста 1',
            time: 20,
            attempts: 5
        },
        {
            id: '1234',
            title: 'Тест 2',
            description: 'Описание теста 2',
            time: 5,
            attempts: 2
        }
    ];

    if (tests.length > 0) {
        const testButtons = tests.map((test) => {
            return Markup.callbackButton(test.title,  JSON.stringify({ a: 'check-test', id: test.id, title: test.title, time: test.time}), false);
        });

        const testList  = tests.map((test) => {
            return `✅ <b>${test.title}</b> (${test.description}). Время прохождения: ${test.time}. Количество попыток: ${test.attempts}\n`;
        }).join('');

        await ctx.replyWithHTML(`Есть следующие тесты для прохождения:\n\n${testList}`,
            Markup.inlineKeyboard([testButtons]).extra());
    } else {
        await ctx.reply('Сейчас нет доступных тестов. :(');
        ctx.scene.leave(ctx);
    }
});

start.action(/check-test/, async (ctx) => {
    const action = JSON.parse(ctx.callbackQuery.data);
    ctx.state.test = {id: action.id, title: action.title, time: action.time};
    await ctx.answerCbQuery();
    ctx.scene.leave(ctx);
});

start.leave(async (ctx) => {
    if (ctx.state.test && ctx.state.test.title && ctx.state.test.time) {
        await ctx.reply(`Вы выбрали тест ${ctx.state.test.title}. Время прохождения: ${ctx.state.test.time}`,
            Markup.inlineKeyboard([
                Markup.callbackButton('Начать тестирование.', JSON.stringify({ a: 'testing', id: ctx.state.test.id}), false)
            ]).extra()
        );
    }
});

module.exports = start;
