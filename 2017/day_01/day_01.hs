import TupleCaptcha

main = do
    input <- getLine
    print $ tupleCaptchaSum (stringToDigits input) shiftedPairs
