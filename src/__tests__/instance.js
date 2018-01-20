import Hue from './../index';
import HueDirectInstance from './../instance';

describe('Hue Instance', () => {
  it('Should fail to create Hue instance due to invalid config object format', () => {
    expect(() => {
      Hue.init(false);
    }).toThrowError('init(options): IP property must be passed to configuration object.');
  });

  it('Should fail to create Hue instance due to missing ip property', () => {
    expect(() => {
      Hue.init({ username: 'Walter White' });
    }).toThrowError('init(options): IP property must be passed to configuration object.');
  });

  it('Should fail to create Hue instance due to missing username property', () => {
    expect(() => {
      Hue.init({ ip: '127.0.0.1' });
    }).toThrowError('init(options): Username property must be passed to configuration object.');
  });

  it('Should fail to create Hue instance due to ip not of type string', () => {
    expect(() => {
      Hue.init({ ip: 127, username: 'Gustavo Fring' });
    }).toThrowError('init(options): IP property must be of type string.');
  });

  it('Should fail to create Hue instance due to username not of type string', () => {
    expect(() => {
      Hue.init({ ip: '127.0.0.1', username: 127 });
    }).toThrowError('init(options): Username property must be of type string.');
  });

  it('Should create instance of Hue class', () => {
    const hue = Hue.init({ ip: '127.0.0.1', username: 'Walter White' });
    expect(hue).toBeInstanceOf(HueDirectInstance);
    expect(hue).toEqual({ ip: '127.0.0.1', username: 'Walter White' });
  });
});
