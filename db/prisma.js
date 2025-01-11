const { PrismaClient } = require("@prisma/client"); // Import Prisma Client

// Initialize Prisma Client (no need for custom adapter)
const prisma = new PrismaClient();

module.exports = { prisma }; // Export the Prisma instance
