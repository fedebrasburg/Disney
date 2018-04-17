# Disney

## Crear base de datos

La aplicacion va a intentar acceder a una base de datos con el usuario: `postgres` and una base llamada: `disney`.
Para crear la base de datos:
```
create database Disney;
```
Para crear la tabla necesaria:
```

CREATE TABLE times (
  id SERIAL PRIMARY KEY  UNIQUE NOT NULL,
  name TEXT,
  waitTime INTEGER,
  status TEXT,
  active BOOLEAN,
  lastUpdate timestamp,
  gameId TEXT,
  tookedTime timestamp
);
```
