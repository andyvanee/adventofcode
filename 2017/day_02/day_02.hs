import Checksum

main = do
    contents <- getContents
    print $ sum [rowdiff x | x <- (readTable contents)]
