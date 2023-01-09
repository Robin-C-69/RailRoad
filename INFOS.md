# Projet API
## Project overview
- An API using Node.js and Express.js
- Allow users to access infos about train, stations, themselves and buy tickets
- Allow admin user to create, update, delete train and stations

## Endpoints
## <ins>Users :</ins>
* Schema :
```js
const userSchema = new mongoose.Schema({
    pseudo: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
})
```

* Methods :
> Create (createUser)
>
> Read (getAllUsers/getUserById)
>
> Update (updateUser)
>
> Delete (deleteUser)

* Roles :
> No role : Can only create user
>
> user : Can only view his infos, update/delete them and check/get a ticket
>
> employee : (user and) Can only read infos on other users
>
> admin: (employee and) Can update user BUT can't delete infos from user

* Details :
    - jwt token
    - Can only modify (update, delete) infos about themselves, with authentication

## <ins>Trains :</ins>
* Schema :
```js
const trainSchema = new mongoose.Schema({
    name: String,
    start_station: String,
    end_station: String,
    departure_time: Date
})
```

* Methods :
> Create (createTrain)
>
> Read (getAllTrains/getTrainById)
>
> Update (updateTrain)
>
> Delete (deleteTrain)

* Details :
    - Only admin can create, update and delete trains
    - The result of getAllTrains can be limited and sort

## <ins>Trainstations :</ins>
* Schema :
```js
const trainstationSchema = new mongoose.Schema({
    name: String,
    open_hour: Time,
    close_hour: Time,
    image: {
        data: Buffer,
        contentType: String
    }
})
```

* Methods :
> Create (createStation)
>
> Read (getAllStations/getStationById)
>
> Update (updateStation)
>
> Delete (deleteStation)

* Details :
    - Only admin can create, update, delete trainstations
    - When delete a trainstation, delete all trains where departure and end is here
    - Image need to be resized to 200*200px if upload is too big

# Architecture
```
node_modules
/src
    /controllers
        |- userController.js
        |- trainController.js
        |- stationController.js
    /middlewares
        |- checkUser.js
    /models
        |- User.js
        |- Station.js
        |- Train.js
    /routes
        |- user.js
        |- station.js
        |- train.js
    index.js
/tests
/uploads
.env
package.json
openapi.yaml
README.md
```


<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## <ins>Other things :</ins>
1. Add endpoint to book a ticket and validate it
> Buy ticket (buyTicket)
>
> Validate ticket (validateTicket)

3. Tests
