import fetch from 'node-fetch';

try {
  const res = await fetch('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');
  console.log('Status:', res.status);
} catch (err) {
  console.error('Error:', err);
}
