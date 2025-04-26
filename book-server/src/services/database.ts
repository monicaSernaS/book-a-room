import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',    
  user: 'tu_usuario',   
  password: 'tu_contraseña',
  database: 'book-roomDB',  
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
