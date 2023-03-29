import Author from "../../models/Author.js";
import User from "../../models/User.js";

const controller = {
  create: async (req, res) => {
    console.log(req.user);
    try {
      let user = await User.findOne({ _id: req.user._id });
      req.body.user_id = req.user._id;
      req.body.active = true;
      let author = await Author.create(req.body);
      user.is_author = true;
      return res.json({
        succes: true,
        data: author,
        message: "Author created successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        succes: false,
        message: error.message,
      });
    }
  },
};

export default controller;
