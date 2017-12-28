module WrappingPaper
    # Every present is a box (a perfect right rectangular prism), which makes
    # calculating the required wrapping paper for each gift a little easier: find
    # the surface area of the box, which is 2*l*w + 2*w*h + 2*h*l.
    def self.prism_area(shape)
        l,w,h = shape
        2*l*w + 2*w*h + 2*h*l
    end

    # The elves also need a little extra paper for each present: the area of the
    # smallest side.
    def self.paper_extra(shape)
        l, w = smallest_sides(shape)
        l * w
    end

    # The actual area plus the extra
    def self.paper_area(shape)
        prism_area(shape) + paper_extra(shape)
    end

    # The sum of all given shapes
    def self.sum(shapes)
        total = 0
        shapes.each do |line|
            l, w, h = line.split('x').map { |e| e.to_i }
            total += paper_area([l,w,h])
        end
        total
    end

    def self.ribbon_sum(shapes)
        total = 0
        shapes.each do |line|
            shape = line.split('x').map { |e| e.to_i }
            total += ribbon_length(shape) + bow_length(shape)
        end
        total
    end

    def self.ribbon_length(shape)
        l,w = smallest_sides(shape)
        return l*2 + w*2
    end

    def self.bow_length(shape)
        l,w,h = shape
        return l*w*h
    end

    def self.smallest_sides(shape)
        shape.sort[0..1]
    end
    private_class_method :smallest_sides
end

