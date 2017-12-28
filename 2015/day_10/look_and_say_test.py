import unittest
from look_and_say import look_and_say

class TestLookAndSay(unittest.TestCase):
  def test_sample1(self):
      self.assertEqual('11', look_and_say('1'))

  def test_sample2(self):
      self.assertEqual('21', look_and_say('11'))

  def test_sample3(self):
      self.assertEqual('1211', look_and_say('21'))

  def test_sample4(self):
      self.assertEqual('111221', look_and_say('1211'))

  def test_sample5(self):
      self.assertEqual('312211', look_and_say('111221'))

if __name__ == '__main__':
    unittest.main()
