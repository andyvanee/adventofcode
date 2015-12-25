from itertools import permutations
from collections import defaultdict

class PresentPath:
    def __init__(self, lines):
        self.locations = set()
        self.routes = defaultdict(dict)
        self.shortest = float("inf")
        self.shortest_route = []
        self.longest = 0
        self.longest_route = []
        for loc in PresentPath.parse(lines):
            [a, b, distance] = loc
            self.locations.update([a, b])
            self.routes[a][b] = self.routes[b][a] = int(distance)
        self.filter()

    def filter(self):
        for route in permutations(self.locations):
            distance = 0
            for i in range(0, len(route)-1):
                distance += self.routes[route[i]][route[i+1]]
            if distance <= self.shortest:
                self.shortest = distance
                self.shortest_route = route
            if distance >= self.longest:
                self.longest = distance
                self.longest_route = route

    @staticmethod
    def parse(lines):
        for line in lines:
            [directions, distance] = line.strip().split(' = ')
            [a, b] = directions.split(' to ')
            yield [a, b, int(distance)]
