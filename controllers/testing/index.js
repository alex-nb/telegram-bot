const Stage = require('telegraf/stage');
const Markup = require('telegraf/markup');
const WizardScene = require('telegraf/scenes/wizard');


const testing = new WizardScene('testing',
    (ctx) => {
        ctx.session['123'] = ctx.session['123'] ? ctx.session['123'] : [];
        ctx.editMessageText('Сколько будет 2+2', Markup.inlineKeyboard([
            Markup.callbackButton('4', JSON.stringify({
                a: 'get-answer',
                id: '1',
                correct: true,
                idQuest: '1'
            }), false),
            Markup.callbackButton('5', JSON.stringify({
                a: 'get-answer',
                id: '2',
                correct: false,
                idQuest: '1'
            }), false),
            Markup.callbackButton('12', JSON.stringify({
                a: 'get-answer',
                id: '3',
                correct: false,
                idQuest: '1'
            }), false),
            Markup.callbackButton('Не знаю', JSON.stringify({
                a: 'get-answer',
                id: '4',
                correct: false,
                idQuest: '1'
            }), false),
        ]).extra());
        return ctx.wizard.next();
    },
    (ctx) => {
        if (ctx.callbackQuery && ctx.callbackQuery.data) {
            const action = JSON.parse(ctx.callbackQuery.data);
            ctx.session['123'].push({id: action.id, correct: action.correct, idQuest: action.idQuest});
            ctx.editMessageText('Сколько будет 6/2?', Markup.inlineKeyboard([
                Markup.callbackButton('8', JSON.stringify({
                    a: 'get-answer',
                    id: '1',
                    correct: false,
                    idQuest: '2'
                }), false),
                Markup.callbackButton('3', JSON.stringify({
                    a: 'get-answer',
                    id: '2',
                    correct: true,
                    idQuest: '2'
                }), false),
                Markup.callbackButton('Буква И', JSON.stringify({
                    a: 'get-answer',
                    id: '3',
                    correct: false,
                    idQuest: '2'
                }), false),
                Markup.callbackButton('42', JSON.stringify({
                    a: 'get-answer',
                    id: '4',
                    correct: false,
                    idQuest: '2'
                }), false),
            ]).extra());
        }
        return ctx.wizard.next();
    },
    (ctx) => {
        if (ctx.callbackQuery && ctx.callbackQuery.data) {
            const action = JSON.parse(ctx.callbackQuery.data);
            ctx.session['123'].push({id: action.id, correct: action.correct, idQuest: action.idQuest});
            ctx.editMessageText('Что из перечисленного умеет летать (с помощью крыльев)?', Markup.inlineKeyboard([
                Markup.callbackButton('Кошка', JSON.stringify({
                    a: 'get-answer',
                    id: '1',
                    correct: false,
                    idQuest: '3'
                }), false),
                Markup.callbackButton('Слон', JSON.stringify({
                    a: 'get-answer',
                    id: '2',
                    correct: false,
                    idQuest: '3'
                }), false),
                Markup.callbackButton('Рыба', JSON.stringify({
                    a: 'get-answer',
                    id: '3',
                    correct: false,
                    idQuest: '3'
                }), false),
                Markup.callbackButton('Голубь', JSON.stringify({
                    a: 'get-answer',
                    id: '4',
                    correct: true,
                    idQuest: '3'
                }), false),
            ]).extra());
        }
        return ctx.wizard.next();
    },
    (ctx) => {
        if (ctx.callbackQuery && ctx.callbackQuery.data) {
            const action = JSON.parse(ctx.callbackQuery.data);
            ctx.session['123'].push({id: action.id, correct: action.correct, idQuest: action.idQuest});
            ctx.editMessageText('Сколько зубов в норме у взрослого человека?', Markup.inlineKeyboard([
                Markup.callbackButton('32', JSON.stringify({
                    a: 'get-answer',
                    id: '1',
                    correct: true,
                    idQuest: '4'
                }), false),
                Markup.callbackButton('2', JSON.stringify({
                    a: 'get-answer',
                    id: '2',
                    correct: false,
                    idQuest: '4'
                }), false),
                Markup.callbackButton('0', JSON.stringify({
                    a: 'get-answer',
                    id: '3',
                    correct: false,
                    idQuest: '4'
                }), false),
                Markup.callbackButton('14', JSON.stringify({
                    a: 'get-answer',
                    id: '4',
                    correct: false,
                    idQuest: '4'
                }), false),
            ]).extra());
        }
        return ctx.wizard.next();
    },
    (ctx) => {
        if (ctx.callbackQuery && ctx.callbackQuery.data) {
            const action = JSON.parse(ctx.callbackQuery.data);
            ctx.session['123'].push({id: action.id, correct: action.correct, idQuest: action.idQuest});
            ctx.editMessageText('Сколько весит 1 кг. гвоздей?', Markup.inlineKeyboard([
                Markup.callbackButton('5 тонн', JSON.stringify({
                    a: 'get-answer',
                    id: '1',
                    correct: false,
                    idQuest: '5'
                }), false),
                Markup.callbackButton('80 кг', JSON.stringify({
                    a: 'get-answer',
                    id: '2',
                    correct: false,
                    idQuest: '5'
                }), false),
                Markup.callbackButton('100 гр', JSON.stringify({
                    a: 'get-answer',
                    id: '3',
                    correct: false,
                    idQuest: '5'
                }), false),
                Markup.callbackButton('1 кг', JSON.stringify({
                    a: 'get-answer',
                    id: '4',
                    correct: true,
                    idQuest: '5'
                }), false),
            ]).extra());
        }
        return ctx.wizard.next();
    },
    (ctx) => {
        if (ctx.callbackQuery && ctx.callbackQuery.data) {
            const action = JSON.parse(ctx.callbackQuery.data);
            ctx.session['123'].push({id: action.id, correct: action.correct, idQuest: action.idQuest});
            let allAnswer = 0;
            let correctAnswer = 0;
            ctx.session['123'].map( question => {
                allAnswer++;
                question.correct ? correctAnswer++ : null;
            });
            ctx.editMessageText(`Тест завершен. Правильных ответов: ${correctAnswer}/${allAnswer}. Спасибо.`);
            delete ctx.session['123'];
        }
        return ctx.scene.leave()
    }
);

/*
const Scene = require('telegraf/scenes/base');
const { leave } = Stage;
const testing = new Scene('testing');


testing.enter(async (ctx) => {
    const action = JSON.parse(ctx.callbackQuery.data);
    const test =
        {
            id: '123',
            title: 'Тест 1',
            description: 'Описание теста 1',
            questions: [
                {
                    id: 1,
                    title: 'Вопрос 1',
                    answers: [
                        { title: 'Ответ 1', correct: true}, { title: 'Ответ 2', correct: false}, { title: 'Ответ 3', correct: false}
                    ]
                },
                {
                    id: 2,
                    title: 'Вопрос 2',
                    answers: [
                        { title: 'Ответ 4', correct: false}, { title: 'Ответ 5', correct: true}, { title: 'Ответ 6', correct: false}
                    ]
                },
                {
                    id: 3,
                    title: 'Вопрос 3',
                    answers: [
                        { title: 'Ответ 7', correct: false}, { title: 'Ответ 8', correct: false}, { title: 'Ответ 9', correct: true}
                    ]
                }
            ],
            time: 20,
            attempts: 5
        };
    if (test.questions.length > 0) {
        //const quesionsFuncs =
        test.questions.map(async (question) => {
            let nextStep = 'get-answer';
            if (question === test.questions[test.questions.length-1]) nextStep = 'end-test';
            const answersButton = question.answers.map((answer) => {
                return Markup.callbackButton(answer.title,  JSON.stringify({
                    a: nextStep,
                    id: answer.id,
                    correct: answer.correct,
                    idTest: action.id
                }), false);
            });
            //return (ctx) => {
            ctx.answerCbQuery();
            await ctx.reply(question.title, Markup.inlineKeyboard([answersButton]).extra());
            //};
        });
    }
    else {
        await ctx.reply('По какой-то причине в этом тесте нет вопросов.');
        ctx.scene.leave(ctx);
    }
});


testing.action(/end-test/, async (ctx) => {
    console.log('I get answer end');
    const action = JSON.parse(ctx.callbackQuery.data);
    await ctx.answerCbQuery();
    ctx.scene.leave(ctx);
});


testing.action(/get-answer/, async (ctx) => {
    console.log(ctx);
    const action = JSON.parse(ctx.callbackQuery.data);
    await ctx.answerCbQuery();
});

testing.leave(async (ctx) => {
    await ctx.reply('Тест завершен. Спасибо.', Markup.inlineKeyboard([
        Markup.callbackButton('Выход', 'start')]).extra());
});
*/

module.exports = testing;
