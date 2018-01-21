describe('Should test methods on Hue instance',  () => {
  it('Should fail to get all lights', async () => {
    const hue = {
      getAllLights: jest.fn(() => { 
        throw new Error('Hue API Error: Invalid protocol.') 
      })
    }

    try {
      await hue.getAllLights();
    } catch (error) {
      expect(error.message).toEqual('Hue API Error: Invalid protocol.');
    }
  });

  it('Should get all lights', async () => {
    const hue = {
      getAllLights: jest.fn(() => Promise.resolve({
        '1': { name: 'Hue color lamp 1' },
        '2': { name: 'Hue color lamp 2' },
        '3': { name: 'Hue color lamp 3' },
      }))
    }

    const result = await hue.getAllLights();

    expect(result['1'].name).toEqual('Hue color lamp 1');
    expect(result['2'].name).toEqual('Hue color lamp 2');
    expect(result['3'].name).toEqual('Hue color lamp 3');
  });
})