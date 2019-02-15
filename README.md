# To set up unique index on userId
 - mongo mongodb://localhost:27017/Users
 - db.users.createIndex({ "userId": 1 }, { unique: true })