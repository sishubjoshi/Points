from flask import Flask, request, jsonify, render_template
from kruskal import Graph
from flask_cors import CORS


app = Flask(__name__)
CORS(app)



@app.route('/mst', methods = ['POST'])
def getres():
    data = request.get_json()
    print(data, data[0], data[0]['x'], len(data))
    g = Graph(len(data))
    for i in data:
        if i == 2:
            continue
        g.addEdge(i['x'], i['y'], i['d'])
    data = g.KruskalMST()
    return jsonify(data)



@app.route('/'):
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=False)