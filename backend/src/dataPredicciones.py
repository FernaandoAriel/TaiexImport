from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para permitir peticiones desde React

@app.route('/sales-data', methods=['GET'])
def get_sales_data():
    data = {
        "labels": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        "datasets": [
            {
                "label": "Ventas 2023",
                "data": [65, 78, 90, 85, 180, 190, 160, 210, 140, 190, 150, 130],
                "borderColor": "#E53E3E",
                "backgroundColor": "rgba(229, 62, 62, 0.1)"
            },
            {
                "label": "Ventas 2022",
                "data": [45, 60, 75, 70, 160, 170, 140, 180, 120, 160, 130, 110],
                "borderColor": "#4299E1",
                "backgroundColor": "rgba(66, 153, 225, 0.1)"
            }
        ]
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=5000)