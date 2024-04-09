const groupRouter = require('express').Router();
const { Group } = require('../db/models');

groupRouter.route('/')
  .get(async (req, res) => {
    try {
      const groups = await Group.findAll();
      res.json(groups);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

module.exports = groupRouter;
