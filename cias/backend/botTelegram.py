import requests
import json
from dotenv import load_dotenv
import os

# Cargar las variables de entorno
load_dotenv()

def send_telegram_message(message: str):
    # Obtener las credenciales desde las variables de entorno
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    api_key = os.getenv("TELEGRAM_API_KEY")
    
    if not chat_id or not api_key:
        raise ValueError("Faltan las credenciales de Telegram en las variables de entorno.")

    headers = {'Content-Type': 'application/json'}
    data_dict = {'chat_id': chat_id, 'text': message, 'parse_mode': 'HTML', 'disable_notification': True}
    data = json.dumps(data_dict)
    url = f'https://api.telegram.org/bot{api_key}/sendMessage'
    response = requests.post(url, data=data, headers=headers, verify=True)

    if response.status_code != 200:
        raise Exception(f"Error al enviar mensaje: {response.text}")

# Usar la función para enviar un mensaje
send_telegram_message("El rostro ha sido capturado")