const { User } = require("../models");
const fs = require("fs");

exports.modifyUser = (req, res, next) => {
  User.update(
    {
      avatar: `${req.protocol}://${req.get("host")}/avatars/${
        req.file.filename
      }`,
    },
    { where: { id: req.params.id } }
  )
    .then(() => {
      return User.findByPk(req.params.id, {
        attributes: ["id", "firstname", "lastname", "isAdmin", "avatar"],
      });
    })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json({ error }));
};

exports.removeProfile = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      const filename = user.avatar.split("/avatars/")[1];
      fs.unlink(`avatars/${filename}`, () => {
        User.destroy({ where: { id: req.params.id } })
          .then(res.status(200).json({ message: "profil supprimé" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
