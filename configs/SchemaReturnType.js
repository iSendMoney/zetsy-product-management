const schemaReturnType = (type, required, min) => {
  if (min)
    return {
      type,
      required,
      min,
    };
  else
    return {
      type,
      required,
    };
};

module.exports = schemaReturnType;
