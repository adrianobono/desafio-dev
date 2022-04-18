import express, { Application} from 'express';
import indexRoutes from './routes/index';
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(indexRoutes);

app.listen(4000);
console.log('Server on port', 4000);