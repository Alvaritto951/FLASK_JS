from flask import jsonify, render_template #Función de Flask -- Transforma el argumento que tengas y lo convierte en JSON.

from registros_ig import app
from registros_ig.models import select_all

@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/api/v1.0/all")
def all_movements():
    registros = select_all()
    return jsonify(registros)

@app.route("/api/v1.0/new", methods=["POST"])
def new():
    return "Esto hará un alta"

@app.route("/api/v1.0/delete/<int:id>", methods=["DELETE"])
def delete(id):
    return f"Esto borrará {id}"

@app.route("/api/v1.0/update", methods=["PuT"])
def update(id):
    return f"Esto modificará {id}"
