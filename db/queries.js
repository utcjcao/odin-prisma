const { PrismaClient } = require("@prisma/client"); // Import Prisma Client
const { deleteFromCloud } = require("../cloudinary");

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

async function addFile(name, parent_id, owner_id, dataURL) {
  await prisma.files.create({
    data: {
      name: name,
      type: "file",
      parent_id: parent_id,
      owner_id: owner_id,
      dataURL: dataURL,
    },
  });
}

async function addFolder(name, parent_id, owner_id) {
  await prisma.files.create({
    data: {
      name: name,
      type: "folder",
      parent_id: parent_id,
      owner_id: owner_id,
    },
  });
}

async function deleteData(id) {
  const files = await prisma.files.findMany({
    where: {
      OR: [{ id: id }, { parent_id: id }],
    },
  });
  console.log("id", id);
  console.log("files", files);
  for (let file of files) {
    await deleteFromCloud(file.name);
    console.log(file.name);
  }
  await prisma.files.deleteMany({
    where: {
      OR: [{ id: id }, { parent_id: id }],
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
      id: -1,
    },
  });
  // create a central folder who does not have a parent, and also does not have an owner (so no one can access)
  if (main.length === 0) {
    await prisma.files.create({
      data: {
        id: -1,
        name: "main",
        type: "folder",
        parent_id: 0,
        owner_id: -1,
      },
    });
  }
}

async function createUserFiles(user) {
  const main = await prisma.files.findMany({
    where: {
      owner_id: user.id,
    },
  });
  if (main.length === 0) {
    await prisma.files.create({
      data: {
        name: `${user.username}'s files`,
        type: "folder",
        parent_id: 0,
        owner_id: user.id,
        isRootFolder: true,
      },
    });
  }
}

async function getUserRootFolderId(user) {
  const main = await prisma.files.findFirst({
    where: {
      owner_id: user.id,
      isRootFolder: true,
    },
  });
  return parseInt(main.id);
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
  createUserFiles,
  getUserRootFolderId,
};
