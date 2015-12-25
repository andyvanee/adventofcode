from itertools import permutations
from collections import defaultdict

class ShortestPath:
    def __init__(self, lines):
        self.locations = set()
        self.routes = defaultdict(dict)
        self.distance = float("inf")
        self.route = []
        for loc in ShortestPath.parse(lines):
            [a, b, distance] = loc
            self.locations.update([a, b])
            self.routes[a][b] = self.routes[b][a] = int(distance)
        self.shortest()

    def shortest(self):
        for route in permutations(self.locations):
            distance = 0
            for i in range(0, len(route)-1):
                distance += self.routes[route[i]][route[i+1]]
            if distance <= self.distance:
                self.distance = distance
                self.route = route

    @staticmethod
    def parse(lines):
        for line in lines:
            [directions, distance] = line.strip().split(' = ')
            [a, b] = directions.split(' to ')
            yield [a, b, int(distance)]
