module Checksum
( rowdiff
, readTable
) where

readTable :: String -> [[Int]]
readTable x = [readColumns x | x <- lines x]

readColumns :: String -> [Int]
readColumns x = [read x::Int | x <- words x]

rowdiff :: [Int] -> Int
rowdiff row = (maximum row) - (minimum row)
