const isObject = config => {
  if (Object.prototype.toString(config) !== '[object Object]') {
    throw new TypeError('init(options): Configuration options must be an object.');
  }
};

const isValidIp = ip => {
  if (!ip) {
    throw new Error('init(options): IP property must be passed to configuration object.');
  }
  if (typeof ip !== 'string') {
    throw new TypeError('init(options): IP property must be of type string.');
  }
};

const isValidUsername = username => {
  if (!username) {
    throw new Error('init(options): Username property must be passed to configuration object.');
  }
  if (typeof username !== 'string') {
    throw new TypeError('init(options): Username property must be of type string.');
  }
};

export const validateArguments = config => {
  isObject(config);
  isValidIp(config.ip);
  isValidUsername(config.username);

  return config;
};
