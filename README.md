# Prueba tecnica de nextia
## _Irvin Raul Lopez Contreras_

> url en local: http://localhost:3000 <- Puerto default (configurable en variable de ambiente)

## Endpoints:
#### Autenticación
- /token (endpoint para hacer login y obtener un JWT)
- /logout
- /signup
- /recover

#### Invitaciones
- POST /invitations
- GET /invitations. (parametro query: *page* para paginación)
- GET /invitations/:id
- DELETE /invitations /:id
- PUT /invitations/:id

## Setup en local

- Clonar repositorio
- npm install > para instalar dependencias
- npm run start > arrancar aplicación en localhost

Para el envio de correo hay que agregar las siguientes variables de entorno:
```sh
EMAIL_USER=XXXXXXXX
EMAIL_PASS=XXXXXXXX
```