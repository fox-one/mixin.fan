from collections import defaultdict
import json

def to_num(v):
    return float(v[1:].replace(',', ''))

hists = defaultdict(dict)

with open('data/box_price_history.txt', 'r') as f:
    line = f.readline().strip()
    header = line.split('\t')

    for line in f:
        line = line.strip().split('\t')

        data = dict(zip(header, line))
        date = data.pop('Date')

        for k, v in data.items():
            hists[k][date] = to_num(v)


print(json.dumps(hists, indent=2))
