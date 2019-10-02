const express = require('express');
const subdomain = require('express-subdomain');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const db = require('./db');

const router = express.Router()

router.get('/' async (req, res, next) => {
  try {
    res.send('subdomain get')
  } catch (error) {
    next(error)
  }
})

app.use(subdomain('foo', router))

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', async (req, res, next) => {
  try {
    res.send('foo');
  } catch (error) {
    next(error);
  }
});

app.get('/api/users', async (req, res, next) => {
  try {
    const users = await db.models.user.findAll();
    res.json(users);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, e => {
    if (e) throw e;
    console.log(`listening on port ${PORT}`);
  });
}
