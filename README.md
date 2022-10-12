# ESGI 5 IW - Messagerie
Ce projet est réalisé dans le cadre de nos études à l'ESGI. Il s'agit d'une messagerie en temps réel avec un chat bot intégré.

## Installation
Création du fichier .env
```bash
ajouter un fichier .env dans : /back-end 
Les informations du .env se trouvent dans le docker compose 
PORT
DATABASE_URl
SECRET
```
Ce projet tourne avec docker.

```bash
#Lancer le projet
docker compose up -d 

#Migration de la base de données 
docker compose exec back-end npm run migrate --workspace=back-end 
```
L'installation des dépendances se fait via le docker compose.

## Ready to start !
Rendez-vous sur : http://localhost:3000

