module Main where
import System.IO
import qualified Data.Text as T
import Text.Regex.TDFA

strip  = T.unpack . T.strip . T.pack

matches :: String -> String -> [String]
matches x y = tail( fmap strip (x =~ y!!0))

matchExpression :: String -> [String]
matchExpression x = matches x "(.*)->(.*)"

splitExp :: String -> [String]
splitExp x = matches x "([^ ]*) *([^ ]*) *([^ ]*)"

data BwExpression = And | Or | Rshift | Lshift | Not | Val | Identity deriving Show

mexp (x:"AND":y)    = (And,    [x]++y)
mexp (x:"OR":y)     = (Or,     [x]++y)
mexp (x:"RSHIFT":y) = (Rshift, [x]++y)
mexp (x:"LSHIFT":y) = (Lshift, [x]++y)
mexp ("NOT":x:_)    = (Not,    [x])
mexp (x:"":"":_)    = (Val,    [x])
mexp x              = (Identity, [])

parseExpression :: String -> ((BwExpression, [String]), String)
parseExpression x = (y, z) where
    m = matchExpression x
    y = mexp $ splitExp (m!!0)
    z = m!!1

f line = putStrLn (show (parseExpression line))

main = do
    hSetBuffering stdout LineBuffering -- or use NoBuffering
    input <- getContents
    mapM_ f (lines input)
