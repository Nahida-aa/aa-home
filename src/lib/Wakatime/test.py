import base64

api_key = ""
api_key_bytes = api_key.encode('utf-8')
encoded_api_key = base64.b64encode(api_key_bytes)
encoded_api_key_str = encoded_api_key.decode('utf-8')

print(f"Base64 Encoded API Key: {encoded_api_key_str}")
