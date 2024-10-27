from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Replace with your real weather API key and endpoint
API_KEY = "your api key"
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

@app.route('/api/weather/<city>', methods=['GET'])
def get_weather(city):
    params = {'q': city, 'appid': API_KEY, 'units': 'metric'}
    response = requests.get(BASE_URL, params=params)
    
    if response.status_code == 200:
        data = response.json()
        today_weather = {
            'temperature': data['main']['temp'],
            'description': data['weather'][0]['description'],
            'city': data['name']
        }
        tomorrow_weather = today_weather
        return jsonify({
            'today': today_weather,
            'tomorrow': tomorrow_weather
        })
    else:
        return jsonify({'error': 'City not found or API error'}), 404

if __name__ == '__main__':
    app.run(port=5000)
