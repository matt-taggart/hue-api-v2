describe('Hue Instance', () => {
  const Hue = require('./../index');

  it('Should fail to create Hue instance due to invalid config object format', () => {
    expect(() => {
      Hue.init(false)
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
});
