import {describe, expect, test, afterEach} from '@jest/globals';
import {start, FakeServer} from '../fakeserver/server';
import {Client} from './client';

describe('client', () => {
  let server: FakeServer;

  afterEach(async () => {
    await server.stop();
  });

  test('get device by id', async () => {
    server = start();
    const client = new Client(server.token, server.host);
    const devices = await client.getDeviceStatus('1');
    expect(devices.data.about).toEqual({
      'firmware_version': '5.38.2031',
      'ip_address': '',
      'lan_address': '',
      'mac_address': '',
      'model': 'DP999NA',
      'serial_number': '2345823512345',
    });
  });

  test('list devices', async () => {
    server = start();
    expect(Client).toBeDefined();
    const client = new Client(server.token, server.host);
    const devices = await client.listDevices();
    expect(devices.data).toEqual([{
      attachments: [],
      name: 'Device 1',
      id: '1',
    }]);
  });


  test('set temperature', async () => {
    server = start();
    const client = new Client(server.token, server.host);
    const devices = await client.setTemperatureFahrenheit('1', 74);
    expect(devices.data).toEqual({
      brightness_level: 100,
      display_temperature_unit: 'f',
      set_temperature_c: 22,
      set_temperature_f: 74,
      thermal_control_status: 'standby',
      time_zone: 'America/Los_Angeles',
    });
  });
});