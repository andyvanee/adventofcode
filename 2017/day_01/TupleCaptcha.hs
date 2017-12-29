module TupleCaptcha
( tupleCaptcha
, tupleCaptchaSum
) where

import Data.Char

-- Implement the addition rule for the Inverse Captcha
tupleCaptcha x
    | fst x == snd x = fst x
    | otherwise = 0

-- Sum all the numbers in the input according to the captcha rules
tupleCaptchaSum x = sum [tupleCaptcha x | x <- numberPairs (stringToDigits x)]

-- Given a list, return a list of tuples offset by one
-- [0,1,2] => [(0,2), (1,0), (2,1)]
numberPairs x = zip x $ offsetList x

-- Return a list shifted left by one character
offsetList x = (tail x) ++ (head x) : []

-- Convert a string into a list of digits
stringToDigits l = [digitToInt x | x <- l]
