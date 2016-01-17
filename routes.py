import os
import base64
import requests
from PyDictionary import PyDictionary
from flask import Flask, render_template, request, json
from config import APP_STATIC

import indicoio
indicoio.config.api_key = '67aede1a31a94362b3bc19b369b928d3'

dictionary = PyDictionary()

app = Flask(__name__)

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/main")
def main():
	return render_template("main.html")

@app.route("/choose")
def choose():
	return render_template("topic-chooser.html")

@app.route("/topics")
def topics():
	with open(os.path.join(APP_STATIC, "topics.txt")) as f:
		content = f.readlines()
	return render_template("topic-list.html", topics=content)

@app.route("/process/image")
def processImage():
	url = request.args.get("url")
	r = requests.get(url, stream = True)
	encoded_string = base64.b64encode(r.content)
	indicoResult = indicoio.image_recognition(encoded_string, top_n=2, hq=True)
	app.logger.debug(indicoResult)
	
	return json.jsonify(uri=encoded_string, keywords=indicoResult)

@app.route("/process/text", methods=['POST'])
def processText():
	text = request.form['text']
	r = indicoio.analyze_text(text, apis=['text_tags', 'sentiment_hq', 'keywords']);
	app.logger.debug(r)
	
	return json.jsonify(**r);

@app.route("/process/word", methods=['GET'])
def processWord():
	word = request.args.get("word")
	dict = {}
	dict['meaning'] = dictionary.meaning(word)
	dict['synonym'] = dictionary.synonym(word)
	
	app.logger.debug(dict)
	return json.jsonify(**dict)
	
@app.route("/builder")
def builder():
	return render_template("story-builder.html")

if __name__ == "__main__":
	app.run(debug=True)
