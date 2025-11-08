# ComputerSecurirty
Repositorio donde se guardará el mini proyecto parcial de la materia de Computer Security

-----------------------------------------------------------------------------------

Proyecto asignado : ***Prevención de Fuerza Bruta con Rate Limiting***

**Equipo número 9 "Firewallers"**

6CV3

Alumnos:

ESCÁRCEGA HERNÁNDEZ STEVEN ARTURO

GARCÍA MAYORGA RODRIGO

PAZ NIEVES JOSÉ ANTONIO

-----------------------------------------------------------------------------------
## 📌 Descripción

Este proyecto implementa un sistema web básico con autenticación de usuarios, protección ante ataques de fuerza bruta mediante **Rate Limiting**, hashing de contraseñas, sesiones seguras y dos roles de acceso: **admin** y **user**.

El sistema está diseñado para bloquear temporalmente intentos repetidos de inicio de sesión desde la misma IP, mitigando ataques automatizados sin afectar a usuarios legítimos.

> **Nota:**  
El reporte completo del proyecto (documentación técnica + pruebas) se encuentra dentro del repositorio.




-----------------------------------------------------------------------------------
Planteamiento del Problema:

La empresa Burritos Blancos Solutions S.A. de C.V. ha detectado un patrón constante de intentos fallidos de inicio de sesión en sus sistemas internos.
Estos intentos repetitivos, provenientes de direcciones IP específicas, sugieren la presencia de ataques de fuerza bruta automatizados, cuyo objetivo
es descubrir contraseñas por medio de combinaciones sucesivas. Para reducir el riesgo de accesos no autorizados, el área de Ciberseguridad solicita 
desarrollar un módulo experimentalque limite la cantidad de intentos de inicio de sesión permitidos por IP dentro de un intervalo de tiempo determinado.
Este control debe implementarse de forma transparente para los usuarios legítimos, bloqueando únicamente los comportamientos sospechosos. 


El objetivo de este miniproyecto es detener ataques automatizados mediante la técnica de Rate Limiting, evitando que bots o scripts prueben múltiples contraseñas en poco tiempo, sin afectar la experiencia de usuarios válidos.

-----------------------------------------------------------------------------------
**Definición del Proyecto**
-----------------------------------------------------------------------------------

Nombre: **MiniSistema de Inicio de Sesión con Mitigación de Fuerza Bruta**

Objetivo: **Implementar un sistema web básico con dos roles ( admin y user ) que:**

-Permita el registro e inicio de sesión de usuarios.

-Limite el número de intentos de inicio de sesión por IP.

-Bloquee temporalmente el acceso si se excede el límite configurado.

**Módulos del sistema**

<img width="695" height="310" alt="image" src="https://github.com/user-attachments/assets/7271b86a-431c-496a-b1c0-0b60f4c8325e" />


**Estructura ideal del proyecto**

<img width="313" height="434" alt="image" src="https://github.com/user-attachments/assets/dc46e3fa-f536-4b6b-8666-2b01893d568e" />


## Desarrollo del proyecto


## Tecnologías utilizadas

| Módulo | Herramienta |
|--------|-------------|
| Servidor web | Node.js + Express |
| Autenticación | bcrypt |
| Prevención de fuerza bruta | express-rate-limit |
| ORM | Prisma |
| Base de datos | PostgreSQL |
| Seguridad HTTP | helmet |
| Sesiones | express-session |
| Vistas | EJS |

## Estructura principal del proyecto

```
/rate-limit-project
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── views/
│   └── app.js
├── test/
│   └── brute_force.js
├── .env
├── docker-compose.yml
├── package.json
└── README.md
```

## Requisitos previos

- Node.js 18+
- Docker + Docker Compose
- Git
- (Opcional) WSL2 — Recomendado en Windows

---

## Instalación

### 1) Clonar el repositorio
```bash
git clone https://github.com/archykuroko/ComputerSecurity
cd rate-limit-project
```

### 2) Instalar dependencias
```bash
npm install
```

### 3) Configurar variables de entorno  
Crear archivo **.env**:

```
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/ratelimit_db?schema=public"
SESSION_SECRET="clave_segura_para_sesiones"
PORT=3000
```

---

## Levantar base de datos

> Se incluye `docker-compose.yml`, por lo que basta con ejecutar:

```bash
docker-compose up -d
```

Verificar contenedor:

```bash
docker ps
```

---

## Migrar base de datos

```bash
npx prisma migrate dev --name init
```

(Esto crea la tabla `User`)

---

## Ejecutar servidor

```bash
npm run dev
```

App disponible en:  
http://localhost:3000

---

## Roles

| Rol | Descripción |
|-----|-------------|
| user | Acceso básico |
| admin | Acceso a vistas administrativas |

> Para promover un usuario a admin:  
```bash
npx prisma studio
```
Editar `role = "admin"` en tabla `User`.

---

## Funcionalidades principales

✅ Registro de usuarios  
✅ Inicio de sesión  
✅ Hashing de contraseñas  
✅ Manejo de sesiones (cookies seguras)  
✅ Rate Limiting en `/login`  
✅ Roles (admin/user)  
✅ Vista admin con listado de usuarios  

---


## ⚠️ Rate Limiting

Configuración en `src/middleware/rateLimiter.js`:

```js
windowMs: 5 * 60 * 1000, // 5 min
max: 5
```

Tras rebasar el límite →  
**HTTP 429 — Too Many Requests**

---

## Pruebas

### Script de fuerza bruta
```bash
node test/brute_force.js
```
---
## 📁 Reporte

El archivo del reporte completo se encuentra en el repositorio:
https://github.com/archykuroko/ComputerSecurity/blob/main/Reporte%20de%20proyecto.pdf

Incluye:
- Documentación técnica
- Desarrollo
- Pruebas
- Resultados
- Conclusiones

---

## Integrantes  

- Escárcega Hernández Steven Arturo  
- García Mayorga Rodrigo  
- Paz Nieves José Antonio  

---

