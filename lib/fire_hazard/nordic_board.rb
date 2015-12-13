module FireHazard
    class NordicBoard < Board
        def turn_on(ab, xy)
            from(ab, xy) { |e| e += 1 }
        end

        def turn_off(ab, xy)
            from(ab, xy) do |e|
                e -= 1
                e = 0 if e < 0
                e
            end
        end

        def toggle(ab, xy)
            from(ab, xy) { |e| e += 2 }
        end
    end
end
