# Projet API
## Project overview
1. An API using Node.js and Express.js
2. Allow user to access infos about train, stations and other data
3. User can buy ticket
4. ? employee can verifiy the validity of a ticket

## Features
## <ins>Users :</ins>
* Schema :
```js
const userSchema = new mongoose.Schema({
    _id: Number,
    pseudo: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
},
{_id: false})
```

* Methods :
>Create (createUser)
>
>Read (getUser/getUserById)
>
>Update (updateUser)
>
>Delete (deleteUser)

* Roles :
> No role : Can only create user
>
> user : Can only view his infos, update/delete them and check/get a ticket
>
> employee : (user and) Can only read infos on other users
>
> admin: (employee and) Can update user BUT can't delete infos from user

* Authentication :
    - jwt token
    - No check on read (get) train endpoints (but not for getUser,...)
    - All write (post, put, delete) need to be authenticate

## <ins>Trains :</ins>
* Schema :
```js
const trainSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    start_station: String,
    end_station: String,
    departure_time: Date
},
{_id: false})
```

* Methods :
> Create (createTrain)
>
> Read (getTrain/getTrainById)
>
> Update (updateTrain)
>
> Delete (deleteTrain)

* **Infos :**
    - Only admin can create, update, delete trains
    - Just show 10 firsts trains

## <ins>Trainstations :</ins>
* Schema :
```js
const trainstationSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    open_hour: Time,
    close_hour: Time,
    image: {
        data: Buffer,
        contentType: String
    }
},
{_id: false})
```

* Methods :
> Read (getTrainstation/getTrainstationById + allow to sort by name)
>
> Create (addTrainstation)
>
> Update (updateTrainstation)
>
> Delete (deleteTrainstation)

* **Infos :**
    - Only admin can create, update, delete trainstations
    - When delete a trainstation, delete all trains where departure and end is here
    - Image need to be resized to 200*200px if upload is too big

## <ins>Other things :</ins>
1. Add endpoint to book a ticket and validate it
> Buy ticket (buyTicket)
>
> Validate ticket (validateTicket)

2. Give feedback to user
    - res.send("OK")
    - Status code

3. Tests

# Architecture
```
/src
    /controllers
        |- userController.js
        |- trainController.js
        ...
    /middlewares
        |- checkUser.js
        ...
    /models
        |- User.js
        ...
    /routes
        |- user.js
        ...
    |- index.js
/tests
.env
package.json
README.md
```












# Ideas:
* Schema User :
Add a list of tickets that the user buy
```js
const userSchema = new mongoose.Schema({
    _id: Number,
    pseudo: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    tickets{
        type: Array
        default: []
    }
},
{_id: false})
```

* User password
    - Use regex to set a pattern

* Add new train :
    - Block adding train if train station for start or end doesn't exist
    - Block adding if trainstation is on closed hours

* Schema Trainstation :
Delete open/close hours, in reality train can stop in a station even if its not open
```js
const trainstationSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    image: {
        data: Buffer,
        contentType: String
    }
},
{_id: false})
```

* Test and resize image
```js
if (image.size > MAX_SIZE){
    let newImage = image.resize()=>{
        image.height = 200
        image.lenght = 200
    }
    if (newImage.size > MAX_SIZE){
        // error
    }
}
upload(Image)
```