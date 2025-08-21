const express = require('express')

const router = express.Router();


router.post('/', async (req, res) => {
    const body = req.body;
    
    // Fixed validation - only check required fields and use correct field names
    if (!body || !body.first_name || !body.email) {
        return res.status(400).json({error: "first_name and email are required"});
    }
    
    try {
        const result = await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            job_title: body.job_title, // Fixed: use job_title to match schema
            gender: body.gender,
        });

        console.log(result);
        return res.status(201).json({status: 'success', data: result});
    } catch (error) {
        console.error(error);
        
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({error: "Email already exists"});
        }
        
        return res.status(500).json({error: "Internal Server Error"});
    }
});

// GET route for finding all users in html =>
router.get('/', async (req, res) => {
    const allUsers = await User.find({});
    const html =
        `<ul>${allUsers.map((user) => `<li>${user.first_name} - ${user.email} - ${user.job_title} - ${user.gender}</li>`).join("")}</ul>`;
    res.send(html);
});

// GET api route for finding all users =>
router.get('/', async (req, res) => {
    const allUsers = await User.find({});
    return res.json(allUsers);
});

router.use('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        let user;
        switch (req.method) {
            case 'GET':
                user = await User.findById(userId);
                if (!user) {
                    return res.status(404).json({error: 'User not found'});
                }
                return res.json(user);
            case 'PATCH':
                // Fixed: use req.body instead of req.query for PATCH updates
                user = await User.findByIdAndUpdate(userId, req.body, {new: true});
                if (!user) {
                    return res.status(404).json({error: 'User not found'});
                }
                return res.json(user);
            case 'DELETE':
                user = await User.findByIdAndDelete(userId);
                if (!user) {
                    return res.status(404).json({error: 'User not found'});
                }
                return res.json({message: 'User deleted successfully'});
            default:
                return res.status(405).json({error: 'Method Not Allowed'});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;