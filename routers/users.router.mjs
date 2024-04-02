import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import { Router } from "express";

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = Router();

const DB_PATH = path.resolve(__dirname,'../data/users.json');
const HTTP_LOG_PATH = path.resolve(__dirname,'../logs/http.log');

async function getUsersFromFile(req,res,next){
try {
    let users = await fs.readFile(DB_PATH, 'utf-8');
    users = JSON.parse(users);
    req.users = users;
    next();
} catch (err) {
    next(err);
}
}

async function logHTTP(req,res,next){
    await fs.appendFile(
        HTTP_LOG_PATH,
         `${req.method} ${req.originalUrl} ${Date.now()}\n`
         )
    next();
}

router.use(logHTTP);
router.use(getUsersFromFile);


// ROUTING FUNCTIONS:

// *next in routing function is for error handling

// Get all users: READ, url: /api/users
router.get('/', async (req,res)=>{
    res.status(200).json(req.users);
});

// Get a single user: READ, url: /api/users/:id
router.get('/:id', async (req,res,next)=>{
    const user = req.users.find(u=>u.id === req.params.id);
    res.status(200).json(user);
});


// Create new user: POST, url: /api/users
router.post('/', async (req,res)=>{
    try {
        // dstructure user data from request body:
        const { username, email, firstName, lastName } = req.body;

        // generate unique ID to new user:
        const userId = crypto.randomUUID();
        // create a new user object:
        const newUser = { id: userId, username, email, firstName, lastName };

        // add new user object to the array:
        req.users.push(newUser);
        // write updated array back to the file:
        await fs.writeFile(DB_PATH, JSON.stringify(req.users, null, 2));

        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
});


//     res.status(200).send('new user created');
// });


// Update user: (replace date with new data): PUT , url: /api/users/:id
router.put('/:id', async (req,res)=>{
    res.status(200).send('update (replace date with new data) user ');
});


// Update user: (applies partial modifications to data): PATCH, url: /api/users/:id 
router.patch('/:id', async (req,res)=>{
    res.status(200).send('update (applies partial modifications to data) user');
})


// Delete user: DELETE, url: /api/users/:id 
router.delete('/:id', async (req,res)=>{
    res.status(200).send('user deleted');
})


export default router;