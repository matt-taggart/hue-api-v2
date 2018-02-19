# Hue API

A tiny library around the Philips Hue API written in Node.  This application allows users to connect to the Hue lighting system in their homes and wirelessly control the color/state of their lights.

## Getting Started

The following instructions will allow you to get the API up and running on your local machine.

### Prerequisites

In order to properly run this library, you will need to ensure the following:

1. Hue kit is fully connected, installed and connected to your network.

2. Discover your Hue IP address. This can be conveniently accessed using Philips broker server discover process by visiting www.meethue.com/api/nupnp. 

3. Press the button on your Hue bridge and enter the following command,

    `curl -X POST -H 'Content-Type: application/json' -d '{"devicetype":"{username}"' http://{hue_ip_address}/api`

The {username} placeholder indicates the custom username you would like to register the app with and {hue_ip_address} is the bridge IP that you have retrieved from the Phillips broker server.

Once you have obtained your IP address and set up a new user, you will need to initalize the Hue instance by passing in the following arguments:

* ip => IP address of the Hue bridge.
* username => The custom username that was configured at the time the Hue is set up. 

USERNAME

### Installing

Clone the repo:

`git clone https://github.com/matt-taggart/hue-api-v2.git`

Install node modules:

`yarn install`

Compile application:

`yarn run build`


## Running Tests

This project uses Jest for unit tests.  To run the entire test suite, you can use the command `yarn test`. If you prefer to run the test suite in watch mode, then you can run the command `yarn run watch`.

## Example Usage

```
const Hue = require('hue');

const hue = Hue.init({
  ip: process.env.IP,
  username: process.env.USERNAME,
}); //Set up Hue instance

await Hue.turnOnAllLights();  // Lights are now turned on!

await Hue.setLightStateAll({ xy: [0.1901, 0.5335] }); // Set color of all lights to green based on xy ratio.

await Hue.setLightState({ id: 1, xy: [0.1683, 0.2822] }) // ONLY change light 1 to blue.  

```

## API

`Hue.config([options: Object])`

Initializes a new Hue instance when the following arguments are passed in as an object:

* ip - Hue bridge IP address
* username - Username configured for Hue bridge

`.getAllLights()`

Retrieves  meta data for all light connected to the Hue bridge (name,  model, light state, etc.)

`.getLight([id])`

Retrieves all meta data for an individual light based on the id passed in.

* id - ID of the light that you would like to get information on.

`renameLight([options])`

Renames the selected light to a new name requested on the network.

* id - ID of the light that you would like to target.
* name - What to rename light to on the network.

`setLightStateAll([options])`

Changes the state of all lights on the network based on the arguments passed to the method.

* Register for Philips Hue API to see all options.

`setLightState([id, options])`

Changes the state of an individual light on the network based on the arguments passed to the method.

* Register for Philips Hue API to see all options.

`turnOnAllLights()`

Turns on all lights connected to the Hue bridge.

`turnOffAllLights()`

Turns off all lights connected to the Hue bridge.

