1. Introducere
Documentatia aceasta are rolul de a prezenta tehnologiile utilizate pentru crearea proiectului. 
Unul dintre principalele obiective ale acestui proiect era folosirea a cel putin 2 servicii in 
cloud prin intermediul unui API REST. 
Astfel, am ales urmatoarele 2 servicii cloud:
1. MongoDB Atlas, acesta fiind folosit drept baza de date a proiectului.
2. Vercel, acesta fiind folosit drept platforma de gazduire online a proiectului.
• Link publicare proiect: [Bookstore Cloud Computing Project]([url](https://proiect-b4u554uzo-alexanthers-projects.vercel.app/))

2. Descrierea problemei
Aceasta aplicatie a fost creata cu gandul de a facilita actiunile unei librarii, putand gestiona 
stocul online. In aplicatie pot fi adaugate carti cu urmatoarele campuri: titlu, autor, gen si 
pret. De asemenea, informatiile cartilor pot fi actualizate de catre utilizator sau chiar si sterse 
din baza de date (de exemplu, pentru cazul in care o carte a fost cumparata de un client)

4. Descriere API
API-uri utilizate in acest proiect au fost urmatoarele:
1. GET: este utilizat pentru a returna o lista de carti din baza de date
• Pentru acest API nu sunt necesari parametri
2. POST: este utilizat pentru adaugarea unei noi carti in baza de date
• Acest API utilizeaza toti parametrii unei carti:
1. Title (string, required, minim 3 caractere) => titlul cartii ce urmeaza a 
fi adaugate in baza de date
2. Author (string, required, minim 3 caractere) => numele autorului
3. Genre (string, required, minim 3 caractere) => genul cartii (actiune, 
comedie, etc.)
4. Price (number, required, minim valoarea 1) => pretul de vanzare a 
cartii
3. DELETE: este utilizat pentru stergerea unei carti la alegere din baza de date
• Acest API are nevoie doar de parametrul „id” prin care se va face legatura cu 
cartea din baza de date si va fi stearsa
4. PUT: este utilizat pentru actualizarea informatiilor unei carti din baza de date
• Precum API-ul DELETE, PUT are nevoie de „id” pentru a identifica in baza 
de date cartea ce va fi actualizata. Apoi, similar API-ului POST, vor fi folosite 
titlul, autorul, genul si pretul, insa cu datele actualizate.

4. Flux de date
Exemplu POST API:
![image](https://github.com/AlexantheR/CloudComputingProject/assets/74862164/2e7c0875-abe5-42ef-b681-23c9002f3836)

Exemplu GET API:
![image](https://github.com/AlexantheR/CloudComputingProject/assets/74862164/388391d4-a875-43b5-aafe-48d84b689ba7)

Exemplu DELETE API:
![image](https://github.com/AlexantheR/CloudComputingProject/assets/74862164/c63e288a-2eb2-4dc5-bf80-cfc476e88dce)

5.Capturi ecran aplicație 
![image](https://github.com/AlexantheR/CloudComputingProject/assets/74862164/fabef56f-98fc-4c64-b5b7-a37802dee85d)

Figura 1 – Homepage
![image](https://github.com/AlexantheR/CloudComputingProject/assets/74862164/c137a813-c767-4a94-9bc9-3412a6708787)

Figura 2 – Homepage + Book Update
![image](https://github.com/AlexantheR/CloudComputingProject/assets/74862164/564ba16a-828f-432c-92aa-80ed26bbdbb9)

Figura 3 – Homepage + Delete + Confirmation
![image](https://github.com/AlexantheR/CloudComputingProject/assets/74862164/6fdd829c-0780-47df-a92d-395bc2231471)

Figura 4 – MongoDB Atlas
![image](https://github.com/AlexantheR/CloudComputingProject/assets/74862164/87fce2c6-adc6-412b-976a-cab236159c9e)

Figura 5 – Vercel Project

6.Referințe
1. [MongoDB Documentation]([url](https://www.mongodb.com/docs/))
2. [Vercel Documentation]([url](https://vercel.com/docs))
3. [Stackoverflow]([url](https://stackoverflow.com/questions/47656515/updateone-on-mongodb-not-working-in-node-js))
