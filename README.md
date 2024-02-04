# Blog

Une fois le projet cloné, faire
`npm install`

Une fois cela fait, ajouter les migrations knex
`knex migrate:latest`

Une fois cela fait, créer un env.local a la racine du projet et ajouter
`DB__CONNECTION=postgres://VOTRE_USERNAME:VOTRE_PASSWORD@localhost:5432/VOTRE_BDD`
`LOGGER__PATHS__DEBUG= "./logs/debug.log"`
`LOGGER__PATHS__INFO= "./logs/info.log"`
`LOGGER__PATHS__ERROR= "./logs/error.log"`
`SECURITY__JWT__SECRET= ...`

Une fois cela fait, lancer le projet : `npm run dev`

# Création du compte admin

Une fois sur le projet, créer un compte que vous appelerez comme vous voulez

Une fois cela fait, rendez vous sur la base de données PGSQL et changer le role de l'utilisateur que vous venez de créer en `admin`

Une fois connecté en admin, faîtes ce que vous voulez !
