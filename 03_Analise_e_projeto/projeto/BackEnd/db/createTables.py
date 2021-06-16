from BackEnd.util import bd

mysql = bd.SQL("root", "root", "moveit")

comando = "DROP TABLE IF EXISTS user;"

if mysql.executar(comando, ()):
   print ("Tabela de user excluída com sucesso!")


comando = '''
    CREATE TABLE user(
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(50),
      email VARCHAR(50),
      senha VARCHAR(50),
      xp INT,
      challenges INT,
      level INT);
'''

if mysql.executar(comando, ()):
   print ("Tabela de user criada com sucesso!")
