import Author from "../../models/Author.js";

const controller = {
  read_one: async (req, res) => {
    try {
      let author = await Author.findOne({_id: req.params.id}).select(
        "name city country createdAt photo"
      );
      if (author) {
        return res.status(200).json({
          success: true,
          data: author,
        });
      } else {
        return res.status(404).json({
          success: false,
          data: author,
          message: "This author dont exist already!",
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
export default controller;
