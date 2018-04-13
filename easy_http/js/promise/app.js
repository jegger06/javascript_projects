const http = new EasyHTTP;

// Get USERS
// http.get('https://jsonplaceholder.typicode.com/users')
//   .then(users => console.log(users))
//   .catch(err => console.log(err))


// User Data
const data = {
  name: 'John Doe',
  username: 'jdoe',
  email: 'jdoe@gmail.com'
};

// Post User
// http.post('https://jsonplaceholder.typicode.com/users', data)
//   .then(user => console.log(user))
//   .catch(err => console.log(err));

// Put User
// http.put('https://jsonplaceholder.typicode.com/users/8', data)
//   .then(user => console.log(user))
//   .catch(err => console.log(err));

// Delete User
http.delete('https://jsonplaceholder.typicode.com/users/2')
  .then(user => console.log(user))
  .catch(err => console.log(err));

