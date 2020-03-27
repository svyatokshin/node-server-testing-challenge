const express = require('express');

const Users = require('./users-model.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    Users.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

server.get('/:id', (req, res) => {
    const id = req.params.id;

    Users.findById(id)
        .then(user => {
            if( user ) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "no user by that ID"})
            }
            
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

server.post('/', (req,res) => {
    Users.insert(req.body)
    .then(inserted => {
        res.status(201).json(inserted);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const user = await Users.findById(id);

    if(user) {
        Users.remove(user.id)
        .then(deleted => {
            res.status(204).json(deleted)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    } else {
        res.status(404).json({message: "Cant find that user"});
    }
})

module.exports = server;