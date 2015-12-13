module FireHazard
    INSTRUCTION = /(turn on|turn off|toggle)\W*(\d*,\d*)\W*through\W*(\d*,\d*)/

    def FireHazard.instruction(board, cmd)
        res = INSTRUCTION.match(cmd)
        if res
            _, m, from, to = res.to_a
            board.send(m.gsub(' ', '_'), from, to)
            true
        else
            false
        end
    end
end
