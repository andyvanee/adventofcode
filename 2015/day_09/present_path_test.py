import unittest
from present_path import PresentPath

class TestStringMethods(unittest.TestCase):
  def exampleRoute(self):
      return [
          'London to Dublin = 464',
          'London to Belfast = 518',
          'Dublin to Belfast = 141'
      ]

  def test_PresentPath_parse(self):
      results = list(PresentPath.parse(self.exampleRoute()))
      self.assertEqual('London', results[0][0])
      self.assertEqual('Dublin', results[0][1])
      self.assertEqual(464, results[0][2])

  def test_PresentPath(self):
      self.assertEqual(605, PresentPath(self.exampleRoute()).shortest)
      self.assertEqual(982, PresentPath(self.exampleRoute()).longest)

if __name__ == '__main__':
    unittest.main()
