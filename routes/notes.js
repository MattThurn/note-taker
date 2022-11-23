const notesRouter = require('express').Router();
const uuid =require('../helpers/uuid');
const fs = require('fs');

notesRouter.get('/', (req, res) => {
    // Send a message to the client
    res.status(200).json(`${req.method} request received to get reviews`);
  
    // Log our request to the terminal
    console.log(`${req.method} request received to get reviews`);
  });


notesRouter.post('/', (req, res) => {
    // Log that a POST request was received
    const response = res.json;
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      // Obtain existing reviews
      fs.readFile('./db/notes.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const reviews = JSON.parse(data);
  
          // Add a new review
          reviews.push(newNote);
  
          // Write updated reviews back to the file
          fs.writeFile(
            './db/notes.json',
            JSON.stringify(reviews, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Success')
          );
        }
      });
  
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error: posting review');
    }
  });
  


module.exports = notesRouter;