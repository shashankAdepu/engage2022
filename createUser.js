const { MongoClient } = require('mongodb');
let name = ""
let email = ""
async function main() {
    const uri = "mongodb+srv://sriharsha:Harsha%402910@shashank.ljqig.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        var arguments = process.argv ;
        if(arguments[2]) {
            this.name = arguments[2]
        } else {
            console.log("Please provide name as 1st argument")
        }
        
        if(arguments[3]) {
            this.email = arguments[3]
        } else {
            console.log("Please provide email as 2st argument")
        }
        
        await createUser(client);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * creates new user
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 */
async function createUser(client){
    let newUser = {
        name : this.name,
        email : this.email
    }
    const result = await client.db("sample_mflix").collection("users").insertOne(newUser);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
