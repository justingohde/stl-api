// import modules
const express = require('express');
const cors = require('cors');

// import stl file functions
const { getStlData } = require('./stl-utils');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/stl', (req, res) => {
    try {
        // create buffer to add incoming stl file data from request stream
        let stlDataParts = [Buffer.alloc(0)]; 

        // add incoming stl file data to buffer
        req.on('data', (d) => stlDataParts.push(d));

        // send an error if something goes wrong with incoming stream
        req.on('error', () => res.json({ status: 'error', message: 'error reading request body' }));

        // read the file data and send response after receving the entire file
        req.on('end', () => {
            try {
                const stlFile = Buffer.concat(stlDataParts);
                const stlData = getStlData(stlFile);

                res.json({ status: 'success', stlData: stlData });
            } catch (fileError) {
                res.json({ status: 'error', message: 'error in provided file' });
            }
        });
    } catch (e) {
        res.json({ status: 'error', message: 'server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));