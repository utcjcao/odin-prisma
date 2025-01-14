const {
  getParent,
  getChildren,
  deleteData,
  addFolder,
  addFile,
  getUserRootFolderId,
} = require("../db/queries");

class filesController {
  constructor() {}
  postFolder = async (req, res) => {
    // create a new folder from download
    const parentId = parseInt(req.params.id);
    const name = req.body.name;
    const ownerId = req.user.id;
    await addFolder(name, parentId, ownerId);
    res.redirect(`/files/${req.params.id}`);
    // rerender the original page after download
  };
  postFile = async (req, res) => {
    // create a new file from download (logic is already in multer middleware in router)
    // rerender the original page after download
    const parentId = parseInt(req.params.id);
    const name = req.file.originalname;
    const ownerId = req.user.id;
    const filePath = req.fileUrl;
    // need to add upload file logic to cloud
    await addFile(name, parentId, ownerId, filePath);
    res.redirect(`/files/${req.params.id}`);
  };
  getFilePage = async (req, res) => {
    const id = parseInt(req.params.id);
    const parent = await getParent(id);
    if (parent == null) {
      res.redirect("/files/user");
    }
    // TODO: need to check if parent is a valid folder, and if not display an error

    if (parent.type === "folder") {
      // if its a folder, we feed in the children files and the main parent data
      const children = await getChildren(id);
      return res.render("folder", {
        parentFile: parent,
        files: children,
        user: req.user,
      });
    } else {
      // we redirect to the download link for a file
      res.redirect(parent.dataURL);
    }
  };
  // remember that delete can't happen within a file, it has to be outside
  deleteFile = async (req, res) => {
    const parentId = parseInt(req.params.id);
    const childId = parseInt(req.params.cId);
    try {
      await deleteData(childId);
      // redirect to parent page after deletion
      res.redirect(`/files/${parentId}`);
    } catch (error) {
      res.render("");
    }
  };
  getUserFiles = async (req, res) => {
    if (req.user == null) {
      res.render("index");
    }
    const id = await getUserRootFolderId(req.user);
    const parent = await getParent(id);

    const children = await getChildren(id);
    return res.render("folder", {
      parentFile: parent,
      files: children,
      user: req.user,
    });
  };
}

module.exports = new filesController();
