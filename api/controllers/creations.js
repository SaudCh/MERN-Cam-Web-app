import Creation from "../models/Creation.js";

//CREATE

export const newCreation = async (req, res) => {
  console.log(req.body);
  try {
    const creation = await Creation(req.body).save();
    res.status(201).send({ data: creation, message: "Created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//UPDATE
export const updateCreation = async (req, res) => {
  try {
    const create = await Creation.findByIdAndUpdate(req.params.id);
    if (create.username === req.body.username) {
      try {
        const updatedCreation = await Creation.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedCreation);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
export const deleteCreation = async (req, res) => {
  try {
    const create = await Creation.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET
export const getCreation = async (req, res) => {
  try {
    const create = await Creation.findById(req.params.id);
    res.status(200).json(create);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getCreationByAuthor = async (req, res) => {
  try {
    const create = await Creation.find({ author: req.params.id });
    res.status(200).json({ data: create });
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL
export const getCreations = async (req, res) => {
  try {
    const create = await Creation.find();
    res.status(200).send({ data: create });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
