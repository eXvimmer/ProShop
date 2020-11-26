import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@proshop.com",
    password: bcrypt.hashSync("password", 12),
    isAdmin: true,
  },
  {
    name: "Mustafa Hayati",
    email: "mustafa@gmail.com",
    password: bcrypt.hashSync("password", 12),
  },
  {
    name: "Taylor Swift",
    email: "taylor@gmail.com",
    password: bcrypt.hashSync("password", 12),
  },
];

export default users;
