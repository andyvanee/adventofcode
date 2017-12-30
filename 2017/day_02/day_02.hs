import Data.Char

cols x = [read x::Int | x <- words x]

rows x = [cols x | x <- lines x]

rowdiff :: [Int] -> Int
rowdiff row = (maximum row) - (minimum row)

main = do
    contents <- getContents
    print $ sum [rowdiff x | x <- (rows contents)]
