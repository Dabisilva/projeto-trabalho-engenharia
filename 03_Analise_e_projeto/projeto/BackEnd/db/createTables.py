from util import bd

mysql = bd.SQL("root", "root", "moveit")

comando = "DROP TABLE IF EXISTS user;"

if mysql.executar(comando, ()):
   print ("Tabela de user excluída com sucesso!")

comando = "DROP TABLE IF EXISTS typing;"

if mysql.executar(comando, ()):
   print ("Tabela de user excluída com sucesso!")

comando = "DROP TABLE IF EXISTS challenges;"

if mysql.executar(comando, ()):
   print ("Tabela de user excluída com sucesso!")

comando = '''
    CREATE TABLE user(
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL,
      senha TEXT,
      xp INT NOT NULL,
      challenges INT NOT NULL,
      level INT NOT NULL);
'''

if mysql.executar(comando, ()):
   print ("Tabela de user criada com sucesso!")

comando = '''
    CREATE TABLE typing(
      id INT AUTO_INCREMENT PRIMARY KEY,
      description TEXT NOT NULL,
      amount INT NOT NULL);
'''

if mysql.executar(comando, ()):
   print ("Tabela de typing criada com sucesso!")


comando = '''
    CREATE TABLE challenges(
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        amount INT NOT NULL);
'''

if mysql.executar(comando, ()):
   print ("Tabela challenges criada com sucesso!")
