# To set up unique index on userName
 - mongo mongodb://localhost:27017/Users
 - db.users.createIndex({ "userName": 1 }, { unique: true })

# To drop an existing index
  - mongo mongodb://localhost:27017/Users
  - db.users.dropIndex({ "userName": 1 })