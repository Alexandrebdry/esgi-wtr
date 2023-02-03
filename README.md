# ESGI 5 IW - Messagerie
Ce projet est réalisé dans le cadre de nos études à l'ESGI. Il s'agit d'une messagerie en temps réel avec un chat bot intégré.
Ce projet tourne avec docker.

## Installation
ajouter un fichier .env dans : /back-end
```dotenv
# port in which back-end is exposted 
PORT=4000

# front url to send mail with correct links
FRONT_URL=http://localhost:3000

#le secret et la database url sont disponible dans le fichier
#docker-compose.yaml
DATABASE_URL=DATABASE_URL
JWT_SECRET=JWT_SECRET

# email credentials 
EMAIL_ADRESSE=myges.maisquimarche@gmail.com
EMAIL_MDP=cbezjahmnhuxaemz
```
```bash
#Lancer le projet
# L'installation des dépendances se fait via le docker compose. 
docker compose up -d 
npm install

#Lancer une migration de la base de données 
docker compose exec back-end npm run migrate --workspace=back-end 
```
## Ready to start !
Rendez-vous sur : http://localhost:3000

## commande de développement 
```bash
#Lancer une migration de la base de données 
docker compose exec back-end npm run migrate --workspace=back-end 
```

## Espace Conseillé

Pour accéder à l'espace conseillé, il faut créer un utilisateur ayant le rôle "advisor". L'accès à l'espace conseillé s'affichera alors
dans le menu.
![Alt text](./advisor.png?raw=true "Title")

## Contributors 
- [Alexandre BAUDRY](https://github.com/Alexandrebdry)
- [Waruny RAJENDRAN](https://github.com/WarunyRajendran)
- [Kelig BRINDEAU](https://github.com/keligbrindeau)





