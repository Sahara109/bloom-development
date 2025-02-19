// hashPassword.js

const bcrypt = require('bcryptjs');

async function hashPassword(plainTextPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    console.log('Hashed Password:', hashedPassword);
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

// Change 'password123' to the password you want to hash
hashPassword('password123');
