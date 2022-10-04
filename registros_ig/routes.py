from registros_ig import app

@app.route("/index")
def index():
    return "Servidor levantado"