import { app } from './app';
import config from './config';

const port = config.port || 3030;

app.listen(port, err => {
  if (err) {
    console.error(`Error: ${err.message}`);
  } else {
    console.log(`Running on port ${port}`);
  }
});
