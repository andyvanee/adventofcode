from itertools import groupby

def look_and_say(x):
    res = ''
    for value, group in groupby(x):
        res += '%d%s' % (len(list(group)), value)
    return res
