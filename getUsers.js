const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

async function main() {
    const uri = "mongodb+srv://sriharsha:Harsha%402910@shashank.ljqig.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        
        var arguments = process.argv ;
        this.getUserBy = arguments[2] ? arguments[2] : "name"
        this.idOrName = arguments[3] ? arguments[3] : "a"
        this.limit = arguments[4] ? parseInt(arguments[4]) : 10

        await getUser(client);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);


/**
 * get User based on userID or get users based on name
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 */
async function getUser(client) {
    let result
    if(getUserBy == "id") {
        result = await client.db("sample_mflix").collection("users").findOne({ _id: new ObjectId(this.idOrName) });
    } else if( getUserBy == "name") {
        result = await client.db("sample_mflix").collection("users").find({ name: this.idOrName }).limit(this.limit).toArray();;
    }
    console.log(result)
}
