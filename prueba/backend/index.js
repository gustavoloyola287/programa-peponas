import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

// Corrección para usar __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Configuración de Multer para la subida de imágenes
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

let db; // Variable para almacenar la conexión a la base de datos

// Función asíncrona para inicializar la base de datos y el servidor
const initializeApp = async () => {
  try {
    // Conectar al servidor MySQL (sin base de datos específica)
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });
    console.log("✅ Conexión al servidor MySQL exitosa");

    // Crear la base de datos si no existe
    const databaseName = process.env.DB_NAME;
    await db.execute(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
    console.log(`✅ Base de datos '${databaseName}' lista`);

    // Volver a conectar, esta vez con la base de datos seleccionada
    await db.end(); // Cerrar la conexión inicial
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: databaseName,
      port: process.env.DB_PORT
    });
    console.log(`✅ Conexión a la base de datos '${databaseName}' exitosa`);

    // Crear la tabla de productos si no existe
    const crearProductos = `
      CREATE TABLE IF NOT EXISTS productos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        precio DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL,
        imagen_url VARCHAR(255),
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await db.execute(crearProductos);
    console.log("✅ Tabla 'productos' lista");

    // Insertar un producto de prueba si la tabla está vacía
    const [rows] = await db.execute("SELECT COUNT(*) AS count FROM productos");
    if (rows[0].count === 0) {
      const sql = "INSERT INTO productos (nombre, precio, stock, imagen_url) VALUES (?, ?, ?, ?)";
      const values = ['Producto de prueba', 99.99, 50, null];
      await db.execute(sql, values);
      console.log("✅ Producto de prueba insertado automáticamente.");
    }
    
    // Iniciar el servidor de Express
    app.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000");
    });
  } catch (error) {
    console.error("❌ Error grave en la inicialización:", error);
    process.exit(1); // Salir si hay un error
  }
};

// Llamada a la función de inicialización para empezar
initializeApp();


// Endpoint de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Endpoints para el ABM de Productos
app.get("/api/productos", async (req, res) => {
  try {
    const [results] = await db.execute("SELECT * FROM productos");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/productos", upload.single('imagen'), async (req, res) => {
  const { nombre, precio, stock } = req.body;
  const imagen_url = req.file ? `/uploads/${req.file.filename}` : null;
  const sql = "INSERT INTO productos (nombre, precio, stock, imagen_url) VALUES (?, ?, ?, ?)";
  try {
    const [result] = await db.execute(sql, [nombre, precio, stock, imagen_url]);
    res.status(201).json({ id: result.insertId, ...req.body, imagen_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/productos/:id", upload.single('imagen'), async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;
  
  let updateData = { nombre, precio, stock };
  if (req.file) {
    updateData.imagen_url = `/uploads/${req.file.filename}`;
  }
  const sql = "UPDATE productos SET ? WHERE id = ?";
  try {
    await db.query(sql, [updateData, id]);
    res.json({ message: "Producto actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.execute("SELECT imagen_url FROM productos WHERE id = ?", [id]);
    if (results.length > 0 && results[0].imagen_url) {
      const filePath = path.join(__dirname, results[0].imagen_url);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error al borrar el archivo:", err);
      });
    }
    await db.execute("DELETE FROM productos WHERE id = ?", [id]);
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});