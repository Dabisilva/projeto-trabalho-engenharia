from flask import Flask, request, jsonify, abort
from util import bd
from flask_cors import CORS
import bcrypt

app = Flask(__name__)

CORS(app)

mysql = bd.SQL('root', 'root', 'moveit')

@app.route('/create', methods = ['POST'])
def create():
    if request.method == 'POST':

        content = request.get_json()
        nome = content['nome']
        email = content['email']
        senha = content['senha']
        encrypted = senha.encode("utf-8")
        hashed = bcrypt.hashpw(encrypted, bcrypt.gensalt())

        comando = "SELECT * FROM user WHERE email = %s"
        cs = mysql.consultar(comando, [email])
        dados = cs.fetchone()

        if dados == None:
            comando1 = "INSERT INTO user(nome, email, senha, xp, challenges, level) VALUES (%s, %s, %s, 0, 0, 1)"
            mysql.executar(comando1, [nome, email, hashed])

            comando = "SELECT * FROM user WHERE email = %s"
            cs = mysql.consultar(comando, [email])
            dados = cs.fetchone()
            user = {"id": dados[0], "nome": dados[1], "email": dados[2], "xp": dados[4], "challenges": dados[5], "level": dados[6]}
            return jsonify(user)

        elif dados:
            return jsonify(message="email já cadastrado no sistema"), 401

@app.route('/login', methods = ['POST'])
def login():
    if request.method == 'POST':
        content = request.get_json()

        type = content['type']
        nome = content['nome']
        email = content['email']

        if type == 'normal':

            senha = content['senha']
            encrypted = senha.encode("utf-8")
            comando = "SELECT * FROM user WHERE email = %s;"
            cs = mysql.consultar(comando, [email])
            dados = cs.fetchone()
            if dados:
                passwordHash = dados[3]
                if bcrypt.checkpw(encrypted, passwordHash.encode("utf-8")):
                    if dados:
                        user = {"id": dados[0], "nome": dados[1], "email": dados[2], "xp": dados[4],
                                "challenges": dados[5], "level": dados[6]}
                        return jsonify(user)
                    else:
                        return jsonify(message="erro ao tentar logar"), 401
                else:
                    return jsonify(message="Senha invalida"), 401
            else:
                return jsonify(message="Email não cadastrado"), 401
        else:
            comando = "SELECT * FROM user WHERE email = %s;"
            cs = mysql.consultar(comando, [email])
            dados = cs.fetchone()

            if dados == None:
                comando = "INSERT INTO user(nome, email, xp, challenges, level) VALUES (%s, %s, 0, 0, 1)"
                mysql.executar(comando, [nome, email])

                comando = "SELECT * FROM user WHERE email = %s"
                cs = mysql.consultar(comando, [email])
                dados = cs.fetchone()
                user = {"id": dados[0], "nome": dados[1], "email": dados[2], "xp": dados[4], "challenges": dados[5], "level": dados[6]}
                return jsonify(user)

            elif dados != None:
                user = {"id": dados[0], "nome": dados[1], "email": dados[2], "xp": dados[4], "challenges": dados[5], "level": dados[6]}
                return jsonify(user)

            else:
                return jsonify(message="erro ao tentar logar"), 401

@app.route('/updateLevelStats', methods = ['POST'])
def updateLevelStats():

    content = request.get_json()
    id = content['id']
    xp = content['xp']
    challenges = content['challenges']
    level = content['level']

    comando = "UPDATE user SET xp = %s, challenges = %s, level = %s WHERE id = %s"
    update = mysql.executar(comando,[xp, challenges, level, id])

    if update:
        comando = "SELECT * FROM user WHERE id = %s;"
        cs = mysql.consultar(comando, [id])
        dados = cs.fetchone()
        user = {"id": dados[0], "nome": dados[1], "email": dados[2], "xp": dados[4],
                "challenges": dados[5], "level": dados[6]}
        return jsonify(user)

    else:
        return jsonify(message = "erro ao dar update"), 401

@app.route('/updateUser', methods = ['POST'])
def updateUser():

    content = request.get_json()
    id = content['id']
    nome = content['nome']
    email = content['email']
    newEmail = content['newEmail']

    if email == newEmail:

        comando = "UPDATE user SET nome = %s, email = %s WHERE id = %s"
        update = mysql.executar(comando, [nome, email, id])

        if update:
            comando = "SELECT * FROM user WHERE id = %s"
            cs = mysql.consultar(comando, [id])
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

            comando = "UPDATE user SET nome = %s, email = %s WHERE id = %s"
            update = mysql.executar(comando, [nome, newEmail, id])

            if update:
                comando = "SELECT * FROM user WHERE id = %s"
                cs = mysql.consultar(comando, [id])
                dados = cs.fetchone()
                user = {"id": dados[0], "nome": dados[1], "email": dados[2], "xp": dados[4], "challenges": dados[5], "level": dados[6]}
                return jsonify(user)

            else:
                return jsonify(message="erro ao dar update"), 401

        if data:
            return jsonify(message="Erro ao dar update: email já cadastrado no sistema"), 401

@app.route('/updatePassword', methods = ['PUT'])
def updatePassword():
    content = request.get_json()
    novaSenha = content['novaSenha']
    id = content['id']

    encrypted = novaSenha.encode("utf-8")
    comando = "SELECT senha FROM user WHERE id = %s;"
    cs = mysql.consultar(comando, [id])
    dados = cs.fetchone()
    passwordHash = dados[0]
    if bcrypt.checkpw(encrypted, passwordHash.encode("utf-8")):
        return jsonify(message='Favor não inserir senha salva no sistema'),401
    else:
        hashed = bcrypt.hashpw(encrypted, bcrypt.gensalt())
        comando = "UPDATE user SET senha= %s WHERE id = %s"
        update = mysql.executar(comando, [hashed,id])
        if update:
            return jsonify(message='Senha alterada com sucesso!'),200
        else:
            return jsonify(message='Erro na alteração de senha'),401


@app.route('/leaderBoard', methods = ['GET'])
def leaderBoard():
    if request.method == 'GET':
        comando = "SELECT * FROM user ORDER BY xp DESC"
        cs = mysql.consultar(comando,[])
        user = []
        for [id, nome, email, senha, xp, challenges, level] in cs:
            user.append({"id": id, "nome": nome, "email": email, "xp": xp, "challenges": challenges, "level": level})
        cs.close()

        return jsonify(user)

app.run()