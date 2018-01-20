import Hue from './instance';
import { validateArguments } from './utils';

export default {
  init(config) {
    validateArguments(config);
    const { ip, username } = config;

    return new Hue(ip, username);
  },
};
