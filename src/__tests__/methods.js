import Hue from './../index';
import dotenv from 'dotenv';

dotenv.load();

describe('Should test methods on Hue instance', () => {
  it('Should fail to get all lights', async () => {
    const hue = {
      getAllLights: jest.fn(() => { 
        throw new Error('Hue API Error: Invalid protocol.') 
      }),
    };

    try {
      await hue.getAllLights();
    } catch (error) {
      expect(error.message).toBe('Hue API Error: Invalid protocol.');
    }
  });

  it('Should get all lights', async () => {
    const hue = {
      getAllLights: jest.fn(() => Promise.resolve({
        '1': { name: 'Hue color lamp 1' },
        '2': { name: 'Hue color lamp 2' },
        '3': { name: 'Hue color lamp 3' },
      })),
    };

    const result = await hue.getAllLights();

    expect(result['1'].name).toBe('Hue color lamp 1');
    expect(result['2'].name).toBe('Hue color lamp 2');
    expect(result['3'].name).toBe('Hue color lamp 3');
  });

  it('Should fail to get light due to missing id paramter', async () => {
    const hue = {
      getLight: jest.fn(({ id }) => { 
        if (!id) {
          throw new TypeError('getLight(id): id parameter is missing.') 
        }
      }),
    };

    try {
      await hue.getLight({});
    } catch (error) {
      expect(error.message).toBe('getLight(id): id parameter is missing.');
    }
  })

  it('Should get individual light', async () => {
    const hue = {
      getLight: jest.fn(({ id }) => Promise.resolve({
        name: 'Hue color lamp 1',
      })),
    }
    
    const light = await hue.getLight({ id: 1 });

    expect(light.name).toBe('Hue color lamp 1');
  });

  it('Should fail to rename light due to missing id parameter', async () => {
    const hue = {
      renameLight: jest.fn(({ id, name }) => { 
        if (!id) {
          throw new Error('renameLight(id, name): id parameter is missing.') 
        }
      }),
    };

    try {
      await hue.renameLight({ name: 'Bedside Left' });
    } catch (error) {
      expect(error.message).toBe('renameLight(id, name): id parameter is missing.');
    }
  });

  it('Should fail to rename light due to missing name parameter', async () => {
    const hue = {
      renameLight: jest.fn(({ id, name }) => { 
        if (!name) {
          throw new Error('renameLight(id, name): name parameter is missing.') 
        }
      }),
    };

    try {
      await hue.renameLight({ id: '1' });
    } catch (error) {
      expect(error.message).toBe('renameLight(id, name): name parameter is missing.');
    }
  });

  it('Should rename light', async () => {
    const hue = {
      renameLight: jest.fn(({ id }) => Promise.resolve([{
        success: {
          '/lights/1/name': 'Bedside Left',
        }
      }])),
    }

    const result = await hue.renameLight('1', 'Bedroom Light');

    expect(result[0]).toEqual(expect.objectContaining({
      success: expect.objectContaining({ '/lights/1/name': expect.any(String) }),
    }))
  });

  it('Should fail to set light state due to missing id parameter', async () => {
    const hue = {
      setLightState: jest.fn(({ id, body }) => { 
        if (!name) {
          throw new Error('renameLight(id, name): name parameter is missing.') 
        }
      }),
    };

    try {
      await hue.setLightState({ body: { on: true } });
    } catch (error) {
      expect(error.message).toBe('setLightState(id, body): id parameter is missing.');
    }
  });

  it('Should fail to set light state due to missing body', async () => {
    const hue = {
      setLightState: jest.fn(({ id, body }) => { 
        if (!body) {
          throw new Error('setLightState(id, body): body paramater is missing.') 
        }
      }),
    };

    try {
      await hue.setLightState({ id: '1' });
    } catch (error) {
      expect(error.message).toBe('setLightState(id, body): body paramater is missing.');
    }
  });

  it('Should set light state to "on"', async () => {
    const hue = {
      setLightState: jest.fn(({ id, body }) => Promise.resolve([{
        success: {
          '/lights/1/state/on': true,
        }
      }])),
    };

    const result = await hue.setLightState({ id: '1', body: { on: true } });

    expect(result[0]).toEqual(expect.objectContaining({
      success: expect.objectContaining({ '/lights/1/state/on': expect.any(Boolean) }),
    }))
  });

  it('Should turn on all lights', async () => {
    const hue = {
      turnOnAllLights: jest.fn(() => Promise.resolve([{
        success: {
          '/lights/1/state/on': true,
        }
      }])),
    };

    const result = await hue.turnOnAllLights();
    
    expect(result[0]).toEqual(expect.objectContaining({
      success: expect.objectContaining({ '/lights/1/state/on': expect.any(Boolean) }),
    }))
  });

  it('Should turn off all lights', async () => {
    const hue = {
      turnOffAllLights: jest.fn(() => Promise.resolve([{
        success: {
          '/lights/1/state/on': true,
        }
      }])),
    };

    const result = await hue.turnOffAllLights();

    expect(result[0]).toEqual(expect.objectContaining({
      success: expect.objectContaining({ '/lights/1/state/on': expect.any(Boolean) }),
    }))
  });

  it('Should fail to set state of all lights to blue due to missing body parameter', async () => {
    const hue = {
      setLightStateAll: jest.fn((body) => { 
        if (!body) {
          throw new Error('setLightStateAll(body): body parameter is missing.') 
        }
      }),
    };

    try {
      await hue.setLightStateAll({ xy: [0.166, 0.3176] });
    } catch (error) {
      expect(error.message).toBe('setLightStateAll(body): body paramater is missing.');
    }
  });

  it('Should turn set state of all lights to blue', async () => {
    const hue = {
      setLightStateAll: jest.fn((body) => Promise.resolve([{
        success: {
          '/lights/1/state/xy': [0.166,0.3176],
        }
      }])),
    };

    const result = await hue.setLightStateAll({ xy: [0.166, 0.3176] });

    expect(result[0]).toEqual(expect.objectContaining({
      success: expect.objectContaining({ '/lights/1/state/xy': [0.166, 0.3176] }),
    }))
  });
});