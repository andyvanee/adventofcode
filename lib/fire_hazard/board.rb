require 'fire_hazard/instruction'

module FireHazard
    class Board
        def initialize(size=1000)
            @board = (1..size).map { |e| (1..size).map { |e| false } }
        end

        def at(xy)
            x,y = str_to_coords(xy)
            @board[x][y]
        end

        def turn_on(ab, xy)
            from(ab, xy) { |e| true }
        end

        def all_on
            turn_on('0,0', '999,999')
        end

        def turn_off(ab, xy)
            from(ab, xy) { |e| false }
        end

        def toggle(ab, xy)
            from(ab, xy) { |e| !e }
        end

        def process(cmd)
            FireHazard.instruction(self, cmd)
        end

        def from(ab, xy)
            a,b = str_to_coords(ab)
            x,y = str_to_coords(xy)
            (a..x).map do |i|
                (b..y).map do |j|
                    res = yield @board[i][j]
                    @board[i][j] = res && true
                end
            end
            self
        end

        def count
            @board.flatten.inject(0) { |sum, n| n ? sum + 1 : sum }
        end

        private

        def str_to_coords(xy)
             xy.split(',').map { |e| e.to_i }
        end
    end
end
