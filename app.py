from flask import Flask, request, jsonify
import subprocess
import os

app = Flask(__name__)

# Route für die Startseite (HTML-Datei anzeigen)
@app.route('/')
def index():
    return app.send_static_file('index.html')

# Route für das Starten des Skripts
@app.route('/start-script', methods=['POST'])
def start_script():
    # Extrahiere den Profilnamen aus der Anfrage
    data = request.get_json()
    profilename = data.get('profilename')

    # Überprüfen, ob der Profilname übergeben wurde
    if not profilename:
        return jsonify({"error": "Profilname fehlt"}), 400

    # Pfad zum Skript
    script_path = os.path.join(os.getcwd(), 'SeleniumScraperBot', 'main.py')

    # Kommando zum Starten des Python-Skripts
    try:
        result = subprocess.run(['python', script_path, profilename], capture_output=True, text=True)

        # Prüfe, ob das Skript erfolgreich ausgeführt wurde
        if result.returncode == 0:
            return jsonify({"message": f"Instagram-Profil {profilename} wird jetzt geöffnet."})
        else:
            return jsonify({"error": f"Fehler beim Ausführen des Skripts: {result.stderr}"}), 500
    
    except Exception as e:
        return jsonify({"error": f"Fehler beim Starten des Python-Skripts: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
