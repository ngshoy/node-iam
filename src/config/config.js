const env = process.env.NODE_ENV || 'development';

console.info(`current env is: ${env}`);
if(env === 'development') {
  process.env.PORT = 3001;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/Users';
} else if(env === 'test') {
  process.env.PORT = 3001;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/UsersTest';
};
