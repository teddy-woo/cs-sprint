const Ajv = require('ajv')
const ajv = new Ajv()

module.exports = () => {
  const userSchema = {
    $id: "http://dob.codestates.com/schemas/userDefs.json",
    type: 'object',
    properties: {
      name: { type: 'string' }
    },
    required: ['name']
  }

  const articleSchema = {
    $id: "http://dob.codestates.com/schemas/articleDefs.json",
    type: 'object',
    properties: {
      author: { $ref: 'userDefs.json' },
      title: { type: 'string' },
      body: { type: 'string' },
      coverImage: { type: 'string' },
      lastUpdated: { type: 'string' }
    },
    required: ['title', 'body']
  }

  const validate = ajv.addSchema(userSchema).compile(articleSchema);
  return validate;
}
