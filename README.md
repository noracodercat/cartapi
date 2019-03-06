# cartapi
Simple REST API - CRUD methods for webshop cart data

To Start this server, install the LTS node.js on your computer, start MongoDB locally by running 'mongod.exe' in your MongoDB bin folder,
then in the root of cartapi folder run "npm install" and then you can start the server with "node index" .

In your local MongoDB run this command: db.tokenblacklists.createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } )  . This is needed
to delete the expired tokens from the blacklist.

The test data for logging in is in the dbpopulate folder, there you can see the test credentials. You should manually add the two users 
to the locally running MongoDB, after you can make request to log in with the test data.


