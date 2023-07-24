CREATE DATABASE recetas_db;
USE recetas_db;

CREATE TABLE recetas (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(200),
    ingredientes VARCHAR(2000),
    instrucciones LONGTEXT
    );

INSERT INTO recetas (nombre, ingredientes, instrucciones) 
	VALUES ('Tortilla francesa', 
	'2 Huevos frescos, 15gr de mantequilla, Pimienta negra molida, Sal',
    'Hacer una mezcla homogénea y ligada con los huevos, la pimienta y la sal. Es muy útil usar varillas. Calentar una sartén antiadherente a temperatura media-alta y poner la mantequilla. Cuando se derrita, bajar la temperatura y echar los huevos. Cuajar agitando la sartén de arriba hacia abajo y con movimientos circulares, removiendo al mismo tiempo la mezcla de huevo, y raspando los bordes para llevarlos hacia el centro. Pasado un minuto o un poco más, comenzar a enrollar la base de la tortilla sobre sí misma. Y ya estaría.'
    );

