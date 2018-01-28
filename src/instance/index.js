import fetch from 'node-fetch';

class Hue {
  constructor(ip, username) {
    this.ip = ip;
    this.username = username;
  }
  async getAllLights() {
    try {
      const httpRequest = await fetch(`http://${this.ip}/api/${this.username}/lights`);

      return httpRequest.json();
    } catch (error) {
      throw new Error(`Hue API Error: ${error.message}`);
    }
  }
  async getLight({ id }) {
    if (!id) {
      throw new Error('getLight(id): id parameter is missing.');
    }

    try {
      const httpRequest = await fetch(`http://${this.ip}/api/${this.username}/lights/${id}`);

      return httpRequest.json();
    } catch (error) {
      throw new Error(`Hue API Error: ${error.message}`);
    }
  }
  async renameLight({ id, name }) {
    if (!id) {
      throw new Error('renameLight(id, name): id parameter is missing.');
    }

    if (!name) {
      throw new Error('renameLight(id, name): name parameter is missing');
    }
    
    try {
      const httpRequest = await fetch(`http://${this.ip}/api/${this.username}/lights/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      return httpRequest.json();
    } catch (error) {
      throw new Error(`Hue API Error: ${error.message}`);
    }
  }
  async setLightState({ id, body }) {
    if (!id) {
      throw new Error('setLightState(id, body): id parameter is missing.');
    }

    if (!body) {
      throw new Error('setLightState(id, body): body parameter is missing');
    }
    try {
      const httpRequest = await fetch(`http://${this.ip}/api/${this.username}/lights/${id}/state`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...body }),
      });

      return httpRequest.json();
    } catch (error) {
      throw new Error(`Hue API Error: ${error.message}`);
    }
  }
  async setLightStateAll(body) {
    if (!body) {
      throw new Error('setLightStateAll(body): body parameter is missing');
    }

    const lights = await this.getAllLights();
    const ids = Object.keys(lights);

    await this.turnOnAllLights();

    return await Promise.all(ids.map(id => (
      this.setLightState({ id, body })
    )));
  }
  async turnOnAllLights() {
    const lights = await this.getAllLights();
    const ids = Object.keys(lights);

    return await Promise.all(ids.map(id => (
      this.setLightState({ id, body: { on: true } })
    )));
  }
  async turnOffAllLights() {
    const lights = await this.getAllLights();
    const ids = Object.keys(lights);

    return await Promise.all(ids.map(id => (
      this.setLightState({ id, body: { on: false } })
    )));
  }
}

export default Hue;
