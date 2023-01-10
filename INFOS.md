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
    _id: Number,
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    }
},
{_id: false})
```

* Methods /user :
> POST : /sign-up ; /login
>
> GET : / ; /{id} ; /myprofile/{id}
>
> PUT : /{id} ; /update-profile/{id}
>
> DELETE : /{id} ; /delete-profile/{id}

* Roles :
> No role : Can only create new user
>
> User : Can only view his infos, update/delete them and check/get a ticket
>
> Admin: Can update user, trains and stations, but can't delete infos from other users (in addition to User rights)

* Details :
    - jwt token is used for authentication

## <ins>Trains :</ins>
* Schema :
```js
const trainSchema = new mongoose.Schema({
    name: String,
    start_station: String,
    end_station: String,
    departure_time: String
})
```

* Methods /train :
> POST : /
>
> GET : / ; /{id}
>
> PUT : /{id}
>
> DELETE : /{id}

* Details :
    - Only admin can create, update and delete trains
    - The result of getAllTrains can be limited and sort with body parameters : limit, sort_name, sort_start, sort_end, sort_time

## <ins>Trainstations :</ins>
* Schema :
```js
const trainstationSchema = new mongoose.Schema({
    name: String,
    open_hour: String,
    close_hour: String,
    image: {
        data: Buffer,
        contentType: String
    }
})
```

* Methods /station :
> POST : /
>
> GET : / ; /{id}
>
> PUT : /{id}
>
> DELETE : /{id}

* Details :
    - Only admin can create, update, delete trainstations
    - When a trainstation is deleted, all trains where departure and end is here are also deleted
    - Image is resized to 200px*200px if the size is too big for upload

# Architecture
```
node_modules
/src
    /controllers
        |- stationController.js
        |- trainController.js
        |- userController.js
    /middlewares
        |- middleware.js
    /models
        |- counter
        |- Station.js
        |- Train.js
        |- User.js
        |- UserasUser.js
    /routes
        |- station.js
        |- train.js
        |- user.js
    index.js
/tests
    |- user.test.js
/uploads
.env
INFOS.md
openapi.yaml
package-lock.json
package.json
README.md
```
