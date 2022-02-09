from datetime import datetime, timedelta
import calendar
import random
import json

import csv

def load_hists(key='BTC Price'):
    with open('data/prices.json', 'r') as f:
        data = json.load(f)
        return data[key]

def random_price(base_price, factor = 1):
    return base_price + factor * (random.random() - 0.5) * 2

def gen_price(hists, date, money, base_price, factor = 1):
    date = date.strftime('%Y-%m-%d')
    price = hists.get(date, random_price(base_price, factor))
    if price == 0:
        return None

    amount = money / price
    return {
        'price': price,
        'amount': amount,
        'money': money,
        'date': date
    }

def calc_earn_rate(prices):
    money = 0
    amount = 0
    for price in prices:
        money += price['money']
        amount += price['amount']
        worth = price['price'] * amount
        rate = (worth - money) / money * 100
        price['total_money'] = money
        price['total_amount'] = amount
        price['worth'] = worth
        price['rate'] = rate


def get_delta(date, period, requiredDay=0):
    if period == '1day':
        return timedelta(days=1)

    if period == '1week':
        return timedelta(weeks=1)

    month = date.month
    year = date.year

    days = calendar.monthrange(year, month)[1]

    month += 1

    if month > 12:
        year += 1
        month = 1

    next_days = calendar.monthrange(year, month)[1]

    if requiredDay > next_days:
        days = days - (requiredDay - next_days)

    if date.day < requiredDay:
        days = (requiredDay - date.day) + days

    return timedelta(days=days)

def calc_earn(asset, startedAt, finishedAt, period, money, base_price=0, factor=0):
    date = datetime.strptime(startedAt, '%Y-%m-%d')
    end_date = datetime.strptime(finishedAt, '%Y-%m-%d')

    requiredDay = int(startedAt.split('-')[-1])

    prices = []
    hists = load_hists(asset)

    while date < end_date:
        price = gen_price(hists, date, money, base_price, factor)
        if price:
            prices.append(price)
            base_price = price['price']

        date += get_delta(date, period, requiredDay)

    calc_earn_rate(prices)
    return prices


def save(prices):
    with open('prices.csv', 'w', newline='') as csvfile:
        fieldnames = ['date', 'price', 'money', 'amount', 'total_money', 'total_amount', 'worth', 'rate']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for price in prices:
            writer.writerow(price)

def main():
    prices = calc_earn('BTC Price', '2019-07-27', '2022-02-09', '1month', 10)
    save(prices)


if __name__ == '__main__':
    main()
