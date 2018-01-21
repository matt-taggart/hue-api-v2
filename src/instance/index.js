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
}

export default Hue;
