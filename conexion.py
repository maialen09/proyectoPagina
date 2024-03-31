import mysql.connector

# Configuración de la conexión
config = {
    'host': 'localhost',       # Puedes cambiar esto por la dirección IP de tu servidor MariaDB
    'user': 'root',         # Tu nombre de usuario de MariaDB
    'password': 'calavera',  # Tu contraseña de MariaDB
    'database': 'aplicacion'  # El nombre de tu base de datos
}

# Conexión a la base de datos
try:
    conn = mysql.connector.connect(**config)
    print("Conexión exitosa")

    # Puedes realizar consultas SQL aquí
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM usuarios")
    result = cursor.fetchall()
    
    for row in result:
        print(row)

    cursor.close()

except mysql.connector.Error as err:
    print("Error de conexión:", err)

finally:
    # Cerrar la conexión
    if 'conn' in locals() and conn.is_connected():
        conn.close()
        print("Conexión cerrada")
