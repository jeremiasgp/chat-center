const PORT = process.env.PORT || 4001;
const RESPONSES_FILE_PATH = './response_dataset.csv';
const RESPONSES_INPUT_KEY = 'input';
const RESPONSES_OUTPUT_KEY = 'output';
const USER_MESSAGE_EVENT = 'user-message';
const CHAT_MESSAGE_EVENT = 'chat-message';
const BOT_MESSAGE_EVENT = 'bot-message';
const USER_CHAT_MESSAGE_EVENT = 'user-chat-message';
const BOT_TYPING_EVENT = 'bot-typing';
const USER_TYPING_EVENT = 'user-typing';
const STOP_TYPING_EVENT = 'stop-typing';
const USER_LIST = 'user-list';
const USER_DATA = 'user-data';

// Bot Natural Defaults
const DEFAULT_RESPONSE = 'Sorry, I didn\'t quite understand that.';
const RESPONSE_MATCH_THRESHOLD = 0.4;
const MIN_TYPING_S = 1;
const MAX_TYPING_S = 3;
const MIN_NATURAL_PAUSE_S = 0.5;
const MAX_NATURAL_PAUSE_S = 2;

// Users

const ALL_USERS = [
  { name: 'Carol', userId: 'bot', icon: 'fas fa-comment-dots', isOnline: true, color: '#4DB8EF', id: 'bot', location: 'Cloud, The Internet', email: 'carol@cloud.com', phone: '123-456-7890', labels: ['AI', 'Bot', 'Support'] },
  { name: 'Brandon Andrews', userId: 'brandon', isOnline: false, lastActive: '3 hours ago', color: '#DD95BA', location: 'New York, USA', email: 'brandon.andrews@example.com', phone: '234-567-8901', labels: ['User', 'New York'] },
  { name: 'Clayton Day', userId: 'clayton', isOnline: false, lastActive: 'Yesterday', color: '#62D5D1', location: 'London, UK', email: 'clayton.day@example.com', phone: '345-678-9012', labels: ['User', 'London'] },
  { name: 'Bernice Clark', userId: 'bernice', isOnline: false, color: '#82D39F', location: 'Tokyo, Japan', email: 'bernice.clark@example.com', phone: '456-789-0123', labels: ['User', 'Tokyo'] },
  { name: 'Christine Fields', userId: 'christine', isOnline: false, lastActive: 'Jul 28', color: '#FFBB75', location: 'Sydney, Australia', email: 'christine.fields@example.com', phone: '567-890-1234', labels: ['User', 'Sydney'] },
  { name: 'Mike Morgan', userId: 'mike', isOnline: false, lastActive: 'Jul 27', color: '#F47E64', location: 'Paris, France', email: 'mike.morgan@example.com', phone: '678-901-2345', labels: ['User', 'Paris'] },
  { name: 'Callie Schmidt', userId: 'callie', isOnline: false, lastActive: 'Jul 23', color: '#F57971', location: 'Berlin, Germany', email: 'callie.schmidt@example.com', phone: '789-012-3456', labels: ['User', 'Berlin'] },
  { name: 'Herbert Watkins', userId: 'herbert', isOnline: false, lastActive: 'Jul 23', color: '#B967B9', location: 'Toronto, Canada', email: 'herbert.watkins@example.com', phone: '890-123-4567', labels: ['User', 'Toronto'] },
  { name: 'Bessie Coleman', userId: 'bessie', isOnline: false, lastActive: 'Jul 23', color: '#4DB8EF', location: 'São Paulo, Brazil', email: 'bessie.coleman@example.com', phone: '901-234-5678', labels: ['User', 'São Paulo'] },
  { name: 'Lottie Jordan', userId: 'lottie', isOnline: false, lastActive: 'Jul 23', color: '#62D5D1', location: 'Cape Town, South Africa', email: 'lottie.jordan@example.com', phone: '012-345-6789', labels: ['User', 'Cape Town'] },
  { name: 'Augusta Castillo', userId: 'augusta', isOnline: false, lastActive: 'Jul 23', color: '#82D39F', location: 'Mumbai, India', email: 'augusta.castillo@example.com', phone: '123-456-7890', labels: ['User', 'Mumbai'] }
];

module.exports = {
  PORT,
  RESPONSES_FILE_PATH,
  RESPONSES_INPUT_KEY,
  RESPONSES_OUTPUT_KEY,
  USER_MESSAGE_EVENT,
  BOT_MESSAGE_EVENT,
  BOT_TYPING_EVENT,
  DEFAULT_RESPONSE,
  RESPONSE_MATCH_THRESHOLD,
  MIN_TYPING_S,
  MAX_TYPING_S,
  MIN_NATURAL_PAUSE_S,
  MAX_NATURAL_PAUSE_S,
  USER_LIST,
  USER_DATA,
  CHAT_MESSAGE_EVENT,
  USER_CHAT_MESSAGE_EVENT,
  ALL_USERS,
  STOP_TYPING_EVENT,
  USER_TYPING_EVENT
};
