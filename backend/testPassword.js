const bcrypt = require('bcrypt');

async function testLogin() {
  const password = 'password123'; // The password you want to test
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  console.log('Hashed password:', hashedPassword); // Log the hashed password

  const match = await bcrypt.compare(password, hashedPassword); // Compare the entered password with the hashed password
  console.log('Do they match?', match); // Log whether the passwords match
}

testLogin();
