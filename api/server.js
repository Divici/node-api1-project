// BUILD YOUR SERVER HERE
const express = require('express');
const userModel = require('./users/model')

const server = express();
server.use(express.json());

server.get('/api/users', (req, res)=>{
    userModel.find()
        .then(users=>{
            res.json(users)
        })
        .catch(()=>{
            res.status(500).json({ message: "The users information could not be retrieved" });
        })
});

server.get('/api/users/:id', (req, res)=>{
    let { id } = req.params;
    userModel.findById(id)
        .then((user) => {
            if(user == null) {
                res.status(404).json({ message: `The user with the specified ID does not exist` });
            } else {
                res.json(user);
            }
        }).catch(() => {
            res.status(500).json({ message: "The user information could not be retrieved" });
        });
});

server.post('/api/users', (req, res)=>{
    let userBody = req.body;
    if(!userBody.name || !userBody.bio) {
        res.status(400).json({ message: `Please provide name and bio for the user` });
    } 
    else {
        userModel.insert(userBody)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(() => {
                res.status(500).json({ message: `There was an error while saving the user to the database` });
            });
    }
});

server.delete('/api/users/:id', (req, res)=>{
    let { id } = req.params;
    userModel.remove(id)
        .then((user) => {
            if(user === null){
                res.status(404).json({ message: `The user with the specified ID does not exist` }); 
                return; 
            }
            res.status(200).json(user);
        }).catch(() => {
            res.status(500).json({message: "The user could not be removed"});
        });
});

server.put('/api/users/:id', async (req, res)=>{
    let { id } = req.params;
    res.json('testing')
});

server.use('*', (req, res) =>{
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
