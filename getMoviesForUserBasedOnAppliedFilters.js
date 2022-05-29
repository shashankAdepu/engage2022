const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
let userID = ""
let filterBy = "genres"
let limit = 10
let movies = []

async function main() {
    const uri = "mongodb+srv://sriharsha:Harsha%402910@shashank.ljqig.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        var arguments = process.argv ;
        if(arguments[2]) {
            this.userId = arguments[2]
        } else {
            console.log("As userId is mandatory to update the details, Please provide userId as 1st argument")
        }
        this.filterBy = arguments[3] ? arguments[3] : "genres"
        this.limit = arguments[4] ? parseInt(arguments[4]) : 10
        await getUser(client);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * get User and get movies based on filter data
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 */
async function getUser(client) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany for the insertMany() docs
    const user = await client.db("sample_mflix").collection("users").findOne({ _id: new ObjectId(this.userId) })
    if(user) {
        console.log(user)
        let filterData = []
        if(this.filterBy === "genres") {
            filterData = user.liked_genres ? user.liked_genres : []
        }
        if(this.filterBy === "cast") {
            filterData = user.liked_cast ? user.liked_cast : []
        }
        if(this.filterBy === "countries") {
            filterData = user.liked_countries ? user.liked_countries : []
        }
        if(this.filterBy === "directors") {
            filterData = user.liked_directors ? user.liked_directors : []
        }
        if(filterData.length > 0) {
            this.movies = await getMovies(client, filterData);
            if(this.movies.length < this.limit) {
                for(let i = 0; i < filterData.length; i++) {
                    let res = await getMovies(client, filterData[i]);
                    for(let j = 0; j < res.length; j++) {
                        if(this.movies.length == this.limit) break 
                        this.movies.push(res[j])
                    }
                    if(this.movies.length >= this.limit) break
                }
            }
            console.log("Filtered movies based on", this.filterBy, " are ==> ", this.movies)
            console.log("fetched movies count ==> ", this.movies.length)
        } else if(this.filterBy === "releasedYear") {
            let movies = []
            let liked_releasedYear = user.liked_releasedYear ? user.liked_releasedYear : []
            for(let i = 0; i < liked_releasedYear.length; i++) {
                let mves = await getMovies(client, parseInt(liked_releasedYear[i]));
                for(let j = 0; j < mves.length; j++) {
                    movies.push(mves[j])
                }
            }
            this.movies = movies
            console.log("Filtered movies based on", this.filterBy, " are ==> ", this.movies)
            console.log("fetched movies count ==> ", this.movies.length)
        } else {
            this.movies = await getDefaultSuggestedMovies(client);
            console.log(" default suggested movies results ==>", this.movies )
            console.log(" fetched movies count ==> ", this.movies.length)
        }
        
    } else {
        console.log("no user found with ID", userID, ",Please check the userID and try again")
    }
}

/**
 * Fetches movies based on filtered Data
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param filterData this contains values of filters which need to be applied while getting movies
 */
async function getMovies(client, filterData) {
    let result
    if(this.filterBy === "genres") {
        result = await client.db("sample_mflix").collection("movies").find({ 
            genres: filterData,
        }).limit(this.limit).toArray();
    } else if(this.filterBy === "cast") {
        result = await client.db("sample_mflix").collection("movies").find({ 
            cast: filterData,
        }).limit(this.limit).toArray();
    } else if(this.filterBy === "releasedYear") {
        result = await client.db("sample_mflix").collection("movies").find({ 
            year: filterData,
        }).limit(this.limit).toArray();
    } else if(this.filterBy === "countries") {
        result = await client.db("sample_mflix").collection("movies").find({ 
            countries: filterData,
        }).limit(this.limit).toArray();
    }
    if(this.filterBy === "directors") {
        result = await client.db("sample_mflix").collection("movies").find({ 
            directors: filterData 
        }).limit(this.limit).toArray();
    }
    return result
}

/**
 * returns default suggested movies
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 */
async function getDefaultSuggestedMovies(client) {
    let result = await client.db("sample_mflix").collection("movies").find({}).limit(this.limit).toArray();
    return result
}
