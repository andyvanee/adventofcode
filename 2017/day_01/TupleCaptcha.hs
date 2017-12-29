module TupleCaptcha
( tupleCaptcha
, tupleCaptchaSum
, stringToDigits
, shiftedPairs
, splitPairs
) where

import Data.Char

-- Implement the addition rule for the Inverse Captcha
tupleCaptcha x
    | fst x == snd x = fst x
    | otherwise = 0

-- Sum all the numbers in the input according to the captcha rules
tupleCaptchaSum x fn = sum [tupleCaptcha x | x <- fn x]

-- Given a list, return a list of tuples offset by one
-- [0,1,2] => [(0,2), (1,0), (2,1)]
shiftedPairs x = zip x $ offsetList x

-- Return a list shifted left by one character
offsetList x = (tail x) ++ (head x) : []

-- Given a list, return a list of tuples offset by half the list length
-- [0,1,2,3] => [(0,2), (1,3), (2,0), (3,1)]
splitPairs x = zip x $ splitList x

-- Return a list shifted by half the list length
splitList x = (secondHalf x) ++ (firstHalf x)

firstHalf xs = take ((length xs) `div` 2 ) xs
secondHalf xs = drop ((length xs) `div` 2 ) xs

-- Convert a string into a list of digits
stringToDigits l = [digitToInt x | x <- l]
