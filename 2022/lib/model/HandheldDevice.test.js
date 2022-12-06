import {HandheldDevice} from './HandheldDevice.js'

describe('HandheldDevice', () => {
    test('startOfPacket', () => {
        const device = new HandheldDevice()
        device.comm.bufferFromString('mjqjpqmgbljsphdztnvjfqwrcgsmlb')
        expect(device.comm.startOfPacketMarker).toBe(7)
        device.comm.bufferFromString('bvwbjplbgvbhsrlpgdmjqwftvncz')
        expect(device.comm.startOfPacketMarker).toBe(5)
        device.comm.bufferFromString('nppdvjthqldpwncqszvftbrmjlhg')
        expect(device.comm.startOfPacketMarker).toBe(6)
        device.comm.bufferFromString('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')
        expect(device.comm.startOfPacketMarker).toBe(10)
        device.comm.bufferFromString('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')
        expect(device.comm.startOfPacketMarker).toBe(11)
    })
})
