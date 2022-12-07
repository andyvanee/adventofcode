import {CLICommand, HandheldDevice} from './HandheldDevice.js'
import {example as storageExample} from '../../day_07/data/index.js'

describe('HandheldDevice', () => {
    test('startOfPacketMarker', () => {
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
    test('startOfMessageMarker', () => {
        const device = new HandheldDevice()
        device.comm.bufferFromString('mjqjpqmgbljsphdztnvjfqwrcgsmlb')
        expect(device.comm.startOfMessageMarker).toBe(19)
        device.comm.bufferFromString('bvwbjplbgvbhsrlpgdmjqwftvncz')
        expect(device.comm.startOfMessageMarker).toBe(23)
        device.comm.bufferFromString('nppdvjthqldpwncqszvftbrmjlhg')
        expect(device.comm.startOfMessageMarker).toBe(23)
        device.comm.bufferFromString('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')
        expect(device.comm.startOfMessageMarker).toBe(29)
        device.comm.bufferFromString('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')
        expect(device.comm.startOfMessageMarker).toBe(26)
    })
    test('CLICommand ls', () => {
        const command = CLICommand.fromString('$ ls\ndir a\n14848514 b.txt\n8504156 c.dat\ndir d')
        expect(command.cmd).toBe('ls')
        expect(command.output.length).toBe(4)
    })
    test('CLICommand cd', () => {
        const command = CLICommand.fromString('$ cd /')
        expect(command.constructor.name).toBe('CDCommand')
        expect(command.cmd).toBe('cd')
        expect(command.args[0]).toBe('/')
    })
    test('storage', () => {
        const device = new HandheldDevice()
        const {storage} = device
        storage.driveFromCLI(storageExample)
        expect(storage.deletionCandidateSize).toBe(95437)
        expect(Object.keys(storage.entries).length).toBe(13)
        expect(storage.directories.length).toBe(3)
        expect(storage.files.length).toBe(10)
    })

    test('storage', () => {
        const device = new HandheldDevice()
        const {storage} = device
        storage.driveFromCLI(storageExample)
        expect(storage.directoriesByContentSize[0].size).toBe(24933642)
    })
})
