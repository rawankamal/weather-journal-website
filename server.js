let projectData = {};

const express = require('express');

const app = express();

const port = 8008;

// body parser // json file coming from the client 
app.use(express.json());
app.use(express.urlencoded({extended: false})); // turn the data from a form into a object we can use in the server
// false because i don' t need complicated data more than json (simple info)

app.use(express.static("website")); // which file you should run your application

const cors = require('cors'); // getting your data from the origin source // cros => cross origin allowance  

app.use(cors());

app.post("/add", async function(req, res) {
    const body = await req.body;
    projectData = body;
    res.status(200).send(projectData);
});

app.get("/all", async(req, res) => {
    res.send(projectData);
});

app.listen(port, function()
    { 
        console.log('listening on port' + port); 
    }
);

