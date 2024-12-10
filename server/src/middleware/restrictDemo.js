export const restrictDemo = (req, res, next) => {
  if (req.user && req.user.role === "demo") {
    return res
      .status(403)
      .json({ message: "Demo users cannot perform this action" });
  }
  next();
};
