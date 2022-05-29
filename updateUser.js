const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
let userId = ""
let action = "like"
let movieId = ""
let userDetails = {}
let movieDetails = {}

async function main() {
    const uri = "mongodb+srv://sriharsha:Harsha%402910@shashank.ljqig.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        var arguments = process.argv;
        if(arguments[2]) {
            this.userId = arguments[2]
            this.userDetails = await getUser(client)
        } else {
            console.log("As userId is mandatory to update the details, Please provide userId as 1st argument")
        }
        
        if(arguments[3]) {
            this.action = arguments[3]
        } else {
            console.log("Please provide what action need to be done as 2st argument")
        }

        if(arguments[4]) {
            this.movieId = arguments[4]
        } else {
            console.log("Please provide movieId as argument 2 for which", this.action, " action need to be performed")
        }
        
        await updateUser(client);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * updates user details when user likes some movie
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 */
async function updateUser(client) {
    this.movieDetails = await client.db("sample_mflix").collection("movies").findOne({ _id: new ObjectId(this.movieId) });
    console.log("movieDetails ==> ", this.movieDetails)
    
    let new_liked_genres = await updateData("genres")
    let new_liked_cast = await updateData("cast")
    let new_liked_countries = await updateData("countries")
    let new_liked_directors = await updateData("directors")
    let new_liked_releasedYear = await updateData("releasedYear")
    let new_values = {
        liked_genres : new_liked_genres,
        liked_cast : new_liked_cast,
        liked_countries : new_liked_countries,
        liked_directors : new_liked_directors,
        liked_releasedYear : new_liked_releasedYear
    }

    const result = await client.db("sample_mflix").collection("users")
                        .updateOne({ _id: new ObjectId(this.userId) }, { $set: new_values });

    console.log("User details updated successfully");
}

/**
 * get User based on userID
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 */
async function getUser(client) {
    let user = await client.db("sample_mflix").collection("users").findOne({ _id: new ObjectId(this.userId)});
    console.log("userDetails ==> ", user)
    return user
}

/**
 * get User based on userID or get users based on name
 * @param type indicates what need to be updated it may be genres, cast, countries, directors, releasedYear
 */
async function updateData(type) {
    let oldUserData = []
    let oldMoviesData = []
    
    if(type == "genres")
    {
        oldUserData = this.userDetails.liked_genres
        oldMoviesData = this.movieDetails.genres
    }
    if(type == "cast")
    {
        oldUserData = this.userDetails.liked_cast
        oldMoviesData = this.movieDetails.cast
    }
    if(type == "countries")
    {
        oldUserData = this.userDetails.liked_countries
        oldMoviesData = this.movieDetails.countries
    }
    if(type == "directors")
    {
        oldUserData = this.userDetails.liked_directors
        oldMoviesData = this.movieDetails.directors
    }
    if(type == "releasedYear")
    {
        oldUserData = this.userDetails.liked_releasedYear
        oldMoviesData[0] = this.movieDetails.year
    }

    if(oldUserData && oldUserData.length > 0) {
        for(let i = 0; i < oldMoviesData.length; i++) {
            if(!oldUserData.includes(oldMoviesData[i])) {
                oldUserData.push(oldMoviesData[i])
            }
        }
    } else {
        if(Array.isArray(oldMoviesData)) {
            oldUserData = oldMoviesData
        } else {
            oldUserData = []
            oldUserData.push(oldMoviesData)
        }
        
    }
    
    return oldUserData
}