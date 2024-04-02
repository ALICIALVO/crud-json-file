import { Router } from "express";


const router = Router();

// Get all users: READ, url: /api/users
router.get('/',(req,res)=>{
    res.status(200).send('got all users');
});
// Get a single user: READ, url: /api/users/:id
router.get('/',(req,res)=>{
    res.status(200).send('got all users');
});

// Create new user: POST, url: /api/users
router.post('/', (req,res)=>{
    res.status(200).send('new user created');
});


// Update user: (replace date with new data): PUT , url: /api/users/:id
router.put('/:id',(req,res)=>{
    res.status(200).send('update (replace date with new data) user ');
});

// Update user: (applies partial modifications to data): PATCH, url: /api/users/:id 
router.patch('/:id',(req,res)=>{
    res.status(200).send('update (applies partial modifications to data) user');
})

// Delete user: DELETE, url: /api/users/:id 
router.delete('/:id',(req,res)=>{
    res.status(200).send('user deleted');
})

export default router;