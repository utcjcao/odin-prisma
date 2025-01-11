const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { indexRouter } = require("./routers/indexRouter");
const { signupRouter } = require("./routers/signupRouter");
const { loginRouter } = require("./routers/loginRouter");
const path = require("path");
const session = require("express-session");
const { passport } = require("./passport");
const flash = require("connect-flash");
const { logoutRouter } = require("./routers/logoutRouter");
const { filesRouter } = require("./routers/filesRouter");
const { initFiles } = require("./db/queries");

const app = new express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/signup", signupRouter);
app.use("/logout", logoutRouter);
app.use("/login", loginRouter);
app.use("/files", filesRouter);
app.use("/", indexRouter);

async function initialize() {
  try {
    await initFiles();
  } catch (error) {
    console.error("Error initializing table:", error);
  }
}
initialize();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
