from flask import Flask, request, jsonify
from flask_cors import CORS  # Importar flask_cors
from dotenv import load_dotenv
import os
import json
import requests

load_dotenv()

app = Flask(__name__)

# Configura CORS para permitir solicitudes desde cualquier origen (o desde tu frontend específico)
CORS(app, origins=["http://localhost:5173"])  # Asegúrate de que esta URL coincida con la de tu frontend

# Cargar las credenciales de Telegram desde las variables de entorno
chat_id = os.getenv("TELEGRAM_CHAT_ID")
api_key = os.getenv("TELEGRAM_API_KEY")

def send_telegram_message(message: str):
    headers = {'Content-Type': 'application/json'}
    data_dict = {'chat_id': chat_id, 'text': message, 'parse_mode': 'HTML', 'disable_notification': True}
    data = json.dumps(data_dict)
    url = f'https://api.telegram.org/bot{api_key}/sendMessage'
    response = requests.post(url, data=data, headers=headers)
    if response.status_code != 200:
        raise Exception(f"Error al enviar mensaje: {response.text}")

@app.route('/send-notification', methods=['POST'])
def send_notification():
    data = request.get_json()
    email = data.get('email')

    if email:
        message = f"El rostro ha sido capturado por {email}"
        send_telegram_message(message)
        return jsonify({"status": "success", "message": "Notificación enviada correctamente"}), 200
    else:
        return jsonify({"status": "error", "message": "Se requiere el correo del usuario"}), 400

if __name__ == '__main__':
    app.run(debug=True)
