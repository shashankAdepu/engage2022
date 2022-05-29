please find the below commands you have to run 

1. You can get movies based on a user with below command
    node getMoviesForUserBasedOnAppliedFilters.js <userID> <filterBy> <limit>
    -- userID is a _id of a particular user and it will be string
    -- You can use any user who had liked "genres", "Documentary", "Short", "Western", "releasedYear"
    -- filterBy can be anyone value from below values [ "genres", "cast", "countries", "directors", "releasedYear"]
    -- limit can be any integer value. This specifies number of results we have to fetch from database

2. You can get users with below command
    node getUsers.js <getUserBy> <data> <limit>
    -- getUserBy can be "id" or "name", So it will return user based on id or users based on name
    -- data can be id of any user or name of any user
    -- limit can be any integer value. This specifies number of results we have to fetch from database

3. You can create new user with below command
    node createUser.js <username> <email>
    -- username can be any string 
    -- email can be any string

4. You can update existing user details
    -- user can like a video using following command
        node updateUser.js <userId> <action> <movieId>
        -- userID is a _id of a particular user and it will be string
        -- Action can be "like", it indicates user is liking the movie which we are given as param in movieId
        -- We are adding movie genres, cast, countries, directors to user liked_genres, liked_cast, liked_countries, liked_directors, liked_releasedYear
        -- movieId is a _id of a particular movie and it will be string

Note:- If you want to provide any spaces for arguments in command please use those words in single or double quotes("",'')
