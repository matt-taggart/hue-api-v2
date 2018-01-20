describe('Hue Instance', () => {
  const Hue = require('./../index');

  it('Should fail to create Hue instance due to invalid config object format', () => {
    const hue = Hue.init(false);
    
  });
});
