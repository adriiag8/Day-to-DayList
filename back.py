from flask import Flask, render_template, request, redirect, url_for
import mysql.connector

app = Flask(__name__)

#configurar conexion a la base de datos MySQL
conn = mysql.connector.connect(
        host="iMac-de-Adrian.local",
        user="root",
        password="Chocolate8",
        database="log_web"
)

#Ruta para el formulario de registro
@app.route('/registro', methods=['GET','POST'])
def registro():
    if request.method == 'POST':
        #obtener los datos del formulario
        username = request.form['username']
        password = request.form['password']

        #crear un cursor para ejecutar consultas SQL
        cursor = conn.cursor()

        #Insertar los datos en la base de datos
        cursor.execute('INSERT INTO logins (username, password) VALUES (%s, %s)', (username, password))

        #Guardar los cambios
        conn.commit()

        return redirect(url_for('login'))
    
    return render_template('registro.html')

#Ruta para el formulario de inicio de sesion
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        #obtener los datos del formulario
        username = request.form['username']
        password = request.form['password']

        #crear un cursor para ejecutar consultas SQL
        cursor = conn.cursor()

        #Verificar las credenciales del usuario
        cursor.execute('SELECT * FROM logins WHERE username=%s AND password=%s', (username, password))
        usuario = cursor.fetchone()

        if usuario: 
            return 'Inicio de sesion exitoso'
        else:
            return 'Credenciales incorrectas'
        
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)
        


