import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

const app = express();
const PORT = 3000;

// set up body parser to convert json body to js object and attach to req
app.use(bodyParser.json());

// logging middleware
app.use((req, res, next) => {
  console.log(`request was made with url: ${req.path}
  and method: ${req.method}`);
  next();
});

// set up express to attach sessions
const sess = {
  secret: 'ramen',
  cookie: { secure: false },
  resave: false,
  saveUnitialized: false
};

app.use(session(sess));

app.get('/', (req, res) => {
  res.send('site is online');
});

app.listen(PORT);
console.log(`application started at http://localhost:${PORT}`);