import bcrypt from 'bcrypt';

const users = ['nima', 'mario', 'luca'];

for (const user of users) {
  const hash = await bcrypt.hash('1234', 10);

  console.log(user, hash);
}