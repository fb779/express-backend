const booleanNormalize = (value) => {
  return value === 'true';
};

module.exports = {
  server: {
    PORT: process.env.PORT || 3000,
  },
  db: {
    mongooseConfig: {
      URL: process.env.DB_URL,
      options: {
        NEWURL_PARSER: booleanNormalize(process.env.DB_CONF_NEWURL_PARSER),
        UNIFIED_TOPOLOGY: booleanNormalize(process.env.DB_CONF_UNIFIED_TOPOLOGY),
        // CREATE_INDEX: booleanNormalize(process.env.DB_CONF_CREATE_INDEX), //TODO: deprecade in mongoose v6
        // FINDAND_MODIFY: booleanNormalize(process.env.DB_CONF_FINDAND_MODIFY), //TODO: deprecade in mongoose v6
      },
    },
  },
};
