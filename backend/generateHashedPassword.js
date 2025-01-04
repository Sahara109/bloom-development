const bcrypt = require('bcryptjs');

async function hashPassword() {
    const salt = await bcrypt.genSalt(10); // Create salt for hashing
    const hashedPassword = await bcrypt.hash('password123', salt); // Replace 'password123' with the password you want to hash
    console.log(hashedPassword); // This will output the hashed password
}

hashPassword(); // Call the function to hash the password
