import React from 'react';
import { addPost } from './api';

function App() {
  const [res, set] = React.useState();
  React.useEffect(() => {
    const user = localStorage.getItem('user');
    user && set(JSON.parse(user));
    (async function() {
      try {
        const data = await addPost({
          title: 'authorized from client',
          source: '/',
        });
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return <h1>{res && res.user.name}</h1>;
}

export default App;
