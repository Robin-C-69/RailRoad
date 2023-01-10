# RailRoad
## <ins>Présentation :</ins>
Cette API permet de gérer des utilisateurs, des trains et des gares.
Les données sont stockées dans une base de données MongoDB.


## <ins>Utilisation :</ins>
1. Installer les modules nécessaires
```bash
npm install
```

2. A la source du projet, rennomer le fichier ```.env_example``` en ```.env``` et compléter avec les bonnes valeurs

3. En se plaçant à la racine du répertoire, démarrer le serveur :
```bash
npm start
```
&emsp;&emsp;pour lancer les tests :
```bash
npm test
```

4. Envoyer des requêtes http sur le port d'écoute de l'API. La collection avec les requêtes préparées est dans le fichier [railroadCollection.json](./package-lock.json) et peut être importée sur Postman.

## <ins>Plus d'infos :</ins>
Plus d'infos sont disponibles dans le fichier [INFOS.md](./INFOS.md) et dans le [swagger](./openapi.yaml)
