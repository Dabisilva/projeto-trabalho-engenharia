from flask import Flask, request, jsonify, abort
from util import bd
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/create', methods = ['POST'])
def create():
    if request.method == 'POST':

        content = request.get_json()
        nome = content['nome']
        email = content['email']
        senha = content['senha']

        mysql = bd.SQL("root","root", "moveit")
        comando = "SELECT * FROM user WHERE email = %s"
        cs = mysql.consultar(comando, [email])
        dados = cs.fetchone()

        if dados == None:
            comando1 = "INSERT INTO user(nome, email, senha, xp, challenges, level) VALUES (%s, %s, %s, 0, 0, 1)"
            mysql.executar(comando1, [nome, email, senha])

            user = {"nome": dados[1], "email": dados[2], "xp": dados[4], "challenges": dados[5], "level": dados[6]}
            return jsonify(user)

        elif dados:
            return jsonify(message="email já cadastrado no sistema"), 401

@app.route('/login', methods = ['POST'])
def login():
    if request.method == 'POST':
        content = request.get_json()

        type = content['type']
        nome = content['nome']
        mysql = bd.SQL('root','root', 'moveit')

        if type == 'normal':

            senha = content['senha']

            comando = "SELECT * FROM user WHERE nome = %s AND senha = %s;"
            cs = mysql.consultar(comando, [nome, senha])
            dados = cs.fetchone()

            if dados:
                user = {"nome": dados[1], "email": dados[2], "xp": dados[4], "challenges": dados[5], "level": dados[6]}
                return jsonify(user)
            else:
                return jsonify(message="erro ao tentar logar"), 401
        else:
            email = content['email']
            comando = "SELECT * FROM user WHERE email = %s;"
            cs = mysql.consultar(comando, [email])
            dados = cs.fetchone()

            if dados == None:
                comando = "INSERT INTO user(nome, email, xp, challenges, level) VALUES (%s, %s, 0, 0, 1)"
                mysql.executar(comando, [nome, email])

                comando = "SELECT * FROM user WHERE email = %s"
                cs = mysql.consultar(comando, [email])
                dados = cs.fetchone()
                user = {"nome": dados[1], "email": dados[2], "xp": dados[4], "challenges": dados[5], "level": dados[6]}
                return jsonify(user)

            elif dados != None:
                user = {"nome": dados[1], "email": dados[2], "xp": dados[4], "challenges": dados[5], "level": dados[6]}
                return jsonify(user)

            else:
                return jsonify(message="erro ao tentar logar"), 401

@app.route('/updateLevelStats', methods = ['PUT'])
def updateLevelStats():

    content = request.get_json()
    email = content['email']
    xp = content['xp']
    challenges = content['challenges']
    level = content['level']

    mysql = bd.SQL("root", "root", "moveit")
    comando = "UPDATE user SET xp = %s, challenges = %s, level = %s WHERE email = %s"
    update = mysql.executar(comando,[xp, challenges, level, email])

    if update:
        comando = "SELECT * FROM user WHERE email = %s"
        cs = mysql.consultar(comando, [email])
        dados = cs.fetchone()
        user = {"nome": dados[1], "email": dados[2], "xp": dados[4], "challenges": dados[5], "level": dados[6]}
        return jsonify(user)

    else:
        return jsonify(message = "erro ao dar update"), 401

@app.route('/updateUser', methods = ['PUT'])
def updateUser():

    content = request.get_json()
    nome = content['nome']
    email = content['email']
    newEmail = content['newEmail']
    senha = content['senha']

    mysql = bd.SQL("root", "root", "moveit")

    if email == newEmail:

        comando = "UPDATE user SET nome = %s, email = %s, senha = %s WHERE email = %s"
        update = mysql.executar(comando, [nome, email, senha, email])

        if update:
            comando = "SELECT * FROM user WHERE email = %s"
            cs = mysql.consultar(comando, [email])
            dados = cs.fetchone()
            user = {"nome": dados[1], "email": dados[2], "xp": dados[4], "challenges": dados[5], "level": dados[6]}
            return jsonify(user)

        else:
            return jsonify(message="erro ao dar update"), 401

    elif email != newEmail:

        checkNewEmail = "SELECT * FROM user WHERE email = %s"
        check = mysql.consultar(checkNewEmail, [newEmail])
        data = check.fetchone()
        if data == None:

            comando = "UPDATE user SET nome = %s, email = %s, senha = %s WHERE email = %s"
            update = mysql.executar(comando, [nome, newEmail, senha, email])

            if update:
                comando = "SELECT * FROM user WHERE email = %s"
                cs = mysql.consultar(comando, [newEmail])
                dados = cs.fetchone()
                user = {"nome": dados[1], "email": dados[2], "xp": dados[4], "challenges": dados[5], "level": dados[6]}
                return jsonify(user)

            else:
                return jsonify(message="erro ao dar update"), 401

        if data:
            return jsonify(message="Erro ao dar update: email já cadastrado no sistema"), 401


app.run()