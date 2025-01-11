const {
  getParent,
  getChildren,
  deleteData,
  addFolder,
} = require("../db/queries");

class filesController {
  constructor() {}
  postFolder = async (req, res) => {
    // create a new folder from download
    const parentId = parseInt(req.params.id);
    const name = req.body.name;
    await addFolder(name, parentId);
    res.redirect(`/files/${req.params.id}`);
    // rerender the original page after download

    console.log("done");
  };
  postFile = async (req, res) => {
    // create a new file from download (logic is already in multer middleware in router)
    // rerender the original page after download
    res.redirect(`/files/${req.params.id}`);
  };
  getFilePage = async (req, res) => {
    const id = parseInt(req.params.id);
    console.log("id:", id);
    const parent = await getParent(id);
    console.log(parent);

    if (parent.type === "folder") {
      console.log("folder");

      // if its a folder, we feed in the children files and the main parent data
      const children = await getChildren(id);
      return res.render("folder", { parentFile: parent, files: children });
    } else {
      // we redirect to the download link for a file
      console.log("testing");
      res.redirect(parent.dataURL);
    }
  };
  // remember that delete can't happen within a file, it has to be outside
  deleteFile = async (req, res) => {
    const parentId = parseInt(req.params.id);
    const childId = parseInt(req.params.cId);
    try {
      console.log(childId);
      await deleteData(childId);
      console.log("deleted");
      // redirect to parent page after deletion
      res.redirect(`/files/${parentId}`);
    } catch (error) {
      console.log("delete error");
      res.render("");
    }
  };
}

module.exports = new filesController();
