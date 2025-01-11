const { PrismaClient } = require("@prisma/client"); // Import Prisma Client

const prisma = new PrismaClient();

async function registerUser(username, password) {
  try {
    const session = await prisma.users.create({
      data: {
        username: username,
        password: password,
      },
    });
    return session;
  } catch (error) {
    throw error;
  }
}

async function findUser(username) {
  try {
    const session = await prisma.users.findMany({
      where: {
        username: {
          equals: username,
        },
      },
    });
    return session;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  findUser,
};
