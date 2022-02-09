#!/usr/bin/env bash

# https://sbcharts.investing.com/charts_xml/e90f2c61d6919adece25b2de16a71817_1year.json
# https://sbcharts.investing.com/charts_xml/e90f2c61d6919adece25b2de16a71817_5years.json

fetch()  {
    FILE=$1
    RANGE=$2
    ASSET=$3
    curl https://sbcharts.investing.com/charts_xml/${ASSET}_${RANGE}.json > data/${FILE}_${RANGE}.json
}

fetch_box() {
    curl https://raw.githubusercontent.com/xiaolai/regular-investing-in-box/master/data/box_price_history.txt > data/box_price_history.txt
}

fetch_box

fetch bitcoin 1year e90f2c61d6919adece25b2de16a71817
fetch bitcoin 5years e90f2c61d6919adece25b2de16a71817
