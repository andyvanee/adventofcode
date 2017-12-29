import Data.Char

pairsL x = zip x $ offsetL x

offsetL x = (tail x) ++ (head x) : []

numList l = [digitToInt x | x <- l]

sumPair x
    | fst x == snd x = fst x
    | otherwise = 0

main = do
    input <- getLine
    print (sum [sumPair x | x <- pairsL (numList input)])
