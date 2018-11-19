from flask import Flask, request, jsonify
from kruskal import Graph

app = Flask(__name__)

@app.route('/get', methods = ['POST'])
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



if __name__ == "__main__":
    app.run(debug=True)