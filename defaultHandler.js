


let  HELP_MESSAGE = ' You can ask me things like, What is the latest status for product!! What can I help you with?'
let  HELP_REPROMPT = 'What can I help you with?'
let  STOP_MESSAGE = 'Goodbye!'
const defaultHandler = {
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

module.exports = defaultHandler;