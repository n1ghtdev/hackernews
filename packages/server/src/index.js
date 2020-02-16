import { app } from './app';

const port = process.env.PORT || 3030;

app.listen(port, (err) => {
  if (err) {
    console.error(`Error: ${err.message}`);
  } else {
    console.log(`Running on port ${port}`);
  }
});
