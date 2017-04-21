// Node.js chatbot workshop

// Import the necessary modules
var restify = require('restify');
var builder = require('botbuilder');

var recast = require('recastai');

// Initialize Recast.AI and the Microsoft Bot Framework
var recastClient = new recast.request('6baa431e9b50c582d17f354b23b6bd68', 'en');

//var client = new recastai.Client('6baa431e9b50c582d17f354b23b6bd68', 'en');

var connector = new builder.ChatConnector({
  appId: '1cc5bde6-6f13-4122-a2aa-0b7b650d711b',
  appPassword: 'EaO7wQJh6bXWZwzFgLLhf2m'
});

// Initialize the bot
var bot = new builder.UniversalBot(connector);

// Set the behavior when a request is sent '/'
bot.dialog('/', function(session) {
console.log(session.message.text); // Display the message we received in the console
recastClient.analyseText(session.message.text) // Have Recast analyze the message
.then(function(res) {

if (res.intent()) { console.log('Intent: ', res.intent().slug) }

if (res.intent().slug === 'greetings') {
    session.send("Hi there!");
}

if (res.intent().slug === 'howareyou') {
    session.send("I'm ok");
}


if (res.intent().slug === 'goodbye') {
    session.send("bye");
}


})

.catch(function() {

session.send('I need some sleep right now... Talk to me later!')

});

console.log(session.message.text);

});

var server = restify.createServer();

server.listen(8000);

server.post('/', connector.listen());

console.logrun;
