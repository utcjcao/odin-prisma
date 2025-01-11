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

async function addFile(name, parent_id, data) {
  await prisma.files.create({
    data: {
      name: name,
      type: "file",
      parent_id: parent_id,
      data: data,
    },
  });
}

async function addFolder(name, parent_id) {
  await prisma.files.create({
    data: {
      name: name,
      type: "folder",
      parent_id: parent_id,
    },
  });
}

async function deleteData(id) {
  console.log("delete", id);
  // delete the parent
  await prisma.files.delete({
    where: {
      id: id,
    },
  });
  // delete children
  await prisma.files.delete({
    where: {
      parent_id: id,
    },
  });
}

async function getChildren(parent_id) {
  const items = await prisma.files.findMany({
    where: {
      parent_id: parent_id,
    },
  });
  return items;
}

async function getParent(id) {
  const file = await prisma.files.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return file;
}

async function initFiles() {
  const main = await prisma.files.findMany({
    where: {
      id: 1,
    },
  });
  if (main.length === 0) {
    await prisma.files.create({
      data: {
        name: "main",
        type: "folder",
        parent_id: 0,
      },
    });
  }
}

module.exports = {
  registerUser,
  findUser,
  addFile,
  addFolder,
  deleteData,
  getChildren,
  getParent,
  initFiles,
};
