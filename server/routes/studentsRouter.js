const studentRouter = require('express').Router();
const { Student } = require('../db/models');

studentRouter.route('/group/:id').get(async (req, res) => {
  const { id } = req.params;
  if (Number.isNaN(id)) {
    res.status(401).json({ message: 'wrong group id' });
  }
  try {
    const students = await Student.findAll({
      where: {
        groupId: id,
      },
    });

    res.json(students);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

studentRouter.route('/').post(async (req, res) => {
  const { name, groupId } = req.body;
  if (!name || !groupId) {
    res.status(401).json({ message: 'wrong student data' });
    return;
  }

  try {
    const newStudent = await Student.create({
      name,
      groupId,
    });

    res.status(200).json(newStudent);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

studentRouter
  .route('/:id')
  .put(async (req, res) => {
    const { id, name, groupId } = req.body;
    if (!name || !groupId) {
      res.status(401).json({ message: 'wrong student data' });
      return;
    }
    await Student.update(req.body, { where: { id } });
    const updatedStudent = await Student.findOne({ where: { id } });
    res.json(updatedStudent);
  })

  .delete(async (req, res) => {
    const { id } = req.params;
    if (Number.isNaN(id)) {
      res.status(401).json({ message: 'wrong group id' });
      return;
    }

    try {
      await Student.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: 'deleted' });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

module.exports = studentRouter;
