const notesRouter = require('express').Router();
const uuid =require('../helpers/uuid');
const fs = require('fs');
const dbData = require('../db/db.json');

notesRouter.get('/', (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    const newData = JSON.parse(data);
    console.log(newData)
    res.status(200).json(newData);
  })
});

notesRouter.post('/', (req, res) => {
    // Log that a POST request was received
    //const response = res.json;
    // Destructuring assignment for the items in req.body
	const { title, text } = req.body;

	if (title && text) {
		const newNote = {
			title,
			text,
			note_id: uuid(),
		};

		fs.readFile("./db/db.json", "utf8", (err, data) => {
			if (err) {
				console.error(err);
			} else {
				const reviews = JSON.parse(data);

				reviews.push(newNote);

				fs.writeFile(
					"./db/db.json",
					JSON.stringify(reviews, null, 4),
					(writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Success')
				);
			}
		});

		res.status(201).json("SUCCESS");
	} else {
		res.status(500).json("Error: posting review");
	}
});

module.exports = notesRouter;
