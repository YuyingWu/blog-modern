const express = require('express')
const next = require('next')
// const moduleAlias = require('module-alias')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// For the development version, we'll use React.
// Because, it support react hot loading and so on.
/*if (!dev) {
  moduleAlias.addAlias('react', 'preact-compat')
  moduleAlias.addAlias('react-dom', 'preact-compat')
}*/

app.prepare()
.then(() => {
  const server = express()

  server.get('/archives/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { slug: req.params.id } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})