import unittest
from shortest_path import ShortestPath

class TestStringMethods(unittest.TestCase):
  def exampleRoute(self):
      return [
          'London to Dublin = 464',
          'London to Belfast = 518',
          'Dublin to Belfast = 141'
      ]

  def test_ShortestPath_parse(self):
      results = list(ShortestPath.parse(self.exampleRoute()))
      self.assertEqual('London', results[0][0])
      self.assertEqual('Dublin', results[0][1])
      self.assertEqual(464, results[0][2])

  def test_ShortestPath(self):
      self.assertEqual(605, ShortestPath(self.exampleRoute()).distance)

if __name__ == '__main__':
    unittest.main()
