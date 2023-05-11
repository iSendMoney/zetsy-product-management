const validateStore = (req, res, next) => {
  const { name, subdomain, socials, owner } = req.body;

  // Name validation
  if (!name || typeof name !== "string" || name.length < 3) {
    return res.status(400).send("Name is invalid");
  }

  // Subdomain validation
  if (!subdomain || typeof subdomain !== "string" || subdomain.length < 3) {
    return res.status(400).send("Subdomain is invalid");
  }

  // Socials validation
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
  const isValidSocials =
    urlRegex.test(socials.facebook) &&
    urlRegex.test(socials.instagram) &&
    (socials.twitter ? urlRegex.test(socials.twitter) : true) &&
    (socials.linkedin ? urlRegex.test(socials.linkedin) : true);
  if (!isValidSocials) {
    return res.status(400).send("Social URLs are invalid");
  }

  // Owner validation
  if (!mongoose.Types.ObjectId.isValid(owner)) {
    return res.status(400).send("Owner ID is invalid");
  }

  next();
};

module.exports = validateStore;
