# Team Mangoes -- Aleksandra Koroza, Derek Song, and Zane Wang
# SoftDev2 pd8

from flask import Flask, redirect, url_for, render_template, session, request, flash, get_flashed_messages
import json

app = Flask(__name__)

'''home route'''
@app.route('/', methods=['POST','GET'])
def index():
    return render_template("base.html")

'''finances route (TOTAL_REVENUE)'''
@app.route('/map', methods=['POST','GET'])
def map():
    return render_template("map.html")

'''enrollment route '''
@app.route('/map1', methods=['POST','GET'])
def map1():
    return render_template("map1.html")

'''achievement route '''
@app.route('/map2', methods=['POST','GET'])
def map2():
    return render_template("map2.html")

if __name__ == "__main__":
    app.debug = True
    app.run()
