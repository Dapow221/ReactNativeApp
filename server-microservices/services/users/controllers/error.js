function Error(error, req, res, next) {
  if (error.name === "not found") {
    res.status(400).json({ message: "input must be a 24 character hex string, 12 byte Uint8Array, or an integer" });
  } else {
    res.status(500).json({ message: "internal server error" });
  }
}

module.exports = Error;
