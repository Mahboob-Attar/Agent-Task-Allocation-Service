exports.getProfile = async (req, res) => {
  res.status(200).json({
    message: "Admin profile fetched successfully",
    admin: req.admin,
  });
};
