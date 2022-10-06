from http.client import CREATED
import sqlite3
from http import HTTPStatus
from flask import jsonify, render_template, request #Función de Flask -- Transforma el argumento que tengas y lo convierte en JSON.

from registros_ig import app
from registros_ig.models import insert, select_all

@app.route("/index")
def index():
    return render_template("index.html") #Llamada al servidor


@app.route("/api/v1.0/all")
def all_movements():
    try:
        registros = select_all()
        return jsonify( 
           {
            "data": registros,
            "status": "OK"
           }
        )
    except sqlite3.Error as e:
        return jsonify(
            {
                "status": "Error",
                "data": str(e)
            }
        ), 400

@app.route("/api/v1.0/new", methods=["POST"])
def new():
    registro = request.json
    #TODO Validar registro
    try:
        insert([registro["date"], registro["concept"], registro["quantity"]])
        return jsonify({
            "status": "OK"
        }), HTTPStatus.CREATED #201
    except sqlite3.Error as e:
        return jsonify(
            {
                "status": "Error",
                "data": str(e)
            }
        ), HTTPStatus.BAD_REQUEST #400

    

@app.route("/api/v1.0/delete/<int:id>", methods=["DELETE"])
def delete(id):
    return f"Esto borrará {id}"

@app.route("/api/v1.0/update", methods=["PuT"])
def update(id):
    return f"Esto modificará {id}"
