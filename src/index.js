import Hue from './instance';
import { validateArguments } from './utils';

export const init = config => {
  validateArguments(config);
  const { ip, name } = config;

  return new Hue(ip, name);
}
