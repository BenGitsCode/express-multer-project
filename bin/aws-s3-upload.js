'use strict'

const awsUpload = require('./../lib/aws-upload')

// require mongoose
const mongoose = require('./../app/middleware/mongoose')

// require upload model
const Upload = require('./../app/models/upload')

// create an object to store the values passed in by
// the user/command line and env
const file = {
  path: process.argv[2],
  name: process.argv[3]
}

awsUpload(file)
  .then((s3Response) => {
    return Upload.create({
      url: s3Response.Location,
      title: s3Response.Key
    })
  })
  .then(console.log)
  .catch(console.error)
  // closing the database because if we run the script in node
  // then our terminal gets stuck with an open mongoose connection
  .then(() => mongoose.connection.close())
