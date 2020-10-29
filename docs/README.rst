EP Boilerplate
Questa progetto è stato creato come template di applicazione che sfrutta Angular, Ionic e l'integrazione con la libreria di EP framework. Questo codice può essere utilizzato come base di partenza per lo sviluppo di un progetto o semplicemente essere preso come esempio.

Requisiti
Per poter utilizzare il framework bisogna avere installato Node, Angular CLI e Ionic CLI
Una volta scaricato ed installo Node, è possibile scaricarsi Angular CLI con il seguente comando:
npm install -g @angular/cli
Per Ionic:
npm install -g @ionic/cli

Installazione repository
Per poter clonare la repo sono necessarie delle credenziali  e <deploy_token>:
username: gitlab+deploy-token-242318

deploy_token: LGRMyyYtgzsXDSNKsLaC
Attualmentre sono disponibili i seguenti boilerplate (applicazioni di esempio):

Base: app con login, routing, sidebar con menu, app info, user info e current page info
Woloo: app con dashboard ...

(il beta-test-boilerplate è un app di test dei componenti in beta)
Ecco come clonarle e utilizzarle come base di partenza:
BASE
git clone https://<username>:<deploy_token>@gitlab.com/ep-framework/ep-ngx-boilerplate.git
Woloo
git clone https://<username>:<deploy_token>@gitlab.example.com/tanuki/awesome_project.git
Si raccomanda di mantere al sicuro le credenziali e di non condividerle con esterni.
Una volta clonato il progetto in locale, bisogna sganciarsi dalla repo di EP-Framwork e agganciarsi alla propria repository github. Per fare ciò, eseguire i seguenti comandi:
-Cancellazione url remoto e riferimenti a EP-Framework dal proprio repository
git remote rm origin 
-Aggiunta url del proprio repo
git remote add origin https://github.com/Josutoral/repo_utente.git
-Aggiunta branch master
git branch -M master
-Caricamento su github del progetto  sulla proprio repo
git push -u origin master
Ricordarsi di cambiare la visibilità della repo da pubblica a privata!!

Inizializzazione
Esegui npm i per installare tutte le dependencies definite nel package.json e generare la cartella node_modules con i moduli installati.
Avvia ionic serve per far partire il server di sviluppo e vai a http://localhost:8100/. L'app verrà auotomaticamente caricata ad ogni modifica effettuata ai file d'origine.

Creazione progetto Firebase
Step da seguire per creare un nuovo progetto Firebase:

Recarsi a https://firebase.google.com/ e loggarsi con un account Google.
Cliccare su "Crea un progetto".
Inserire nome del progetto e accetare i terminimi di Firebase. Automaticamente verrà creato un id univoco per il proprio progetto. Continuare.
Accettare Google Analytics e scegliere Default Account For Firebase. Cliccare su "Crea progetto".

Una volta creato il progetto, agganciamo Firebase alla nostra App. Per fare ciò, cliccare sull'icona </> (per web apps), inseriamo un nickname e clicchiamo su Registra App.
Per collegare il proprio progetto Firebase, andare a modificare il file src/environments/environment.ts e insere le proprie variabili di configurazione.
export const environment = {
    production: false,
    firebase: {
        apiKey: "XXXXXXXXXXXXXXXXXXX",
        authDomain: "XXXXXXXXXXXXXXXXXXX",
        databaseURL: "XXXXXXXXXXXXXXXXXXX",
        projectId: "XXXXXXXXXXXXXXXXXXX",
        storageBucket: "XXXXXXXXXXXXXXXXXXX",
        messagingSenderId: "XXXXXXXXXXXXXXXXXXX",
        appId: "XXXXXXXXXXXXXXXXXXX",
        measurementId: "XXXXXXXXXXXXXXXXXXX"
    }
};

Libreria Ep-framework
Si tratta di una raccolta di servizi, componenti e oggetti Angular che lo sviluppatore potrà utilizzare per velocizzare lo sviluppo dell'applicazione e concentrarsi al più presto sulle peculiarità della stessa, lasciando alla libreria il compito di occuparsi degli aspetti standard come la gestione e l'autenticazione degli utenti.

Come si usa?

Aggiungere al file di configurazione di npm (in windows normalmente %userprofile%.npmrc) le seguenti righe:

@ep-framework:registry=https://gitlab.com/api/v4/packages/npm/
//gitlab.com/api/v4/packages/npm/:_authToken=Ze7nitJr49GfUVNynEe5

A questo punto è possibile installare i pacchetti presenti nella libreria con

npm i @ep-framework/nomepacchetto

Come funziona il framework?
I servizi e i componenti saranno descritti in dettaglio nel seguito della documentazione, in generale però i componenti avranno questa forma:
<ep-component [options]="myOptions" [(data)]="myData" (event)="myEventHandler($event)"></ep-component>
ogni componente quindi accetterà delle opzioni, permetterà il two way data binding tra il data model del componente e quello del suo fruitore, ed esporrà degli eventi che fotograferanno il comportamento, le opzioni di default o impostate, ed il data model del componente al momento dell'evento.

Pacchetti disponibili:


@ep-framework/ngx-core che contiene: moduli e servizi per la gestione dell'utente e l'uso del database Firestore.


**@ep-framework/ngx-socket.io ** (link alla spiegazione?)
contiene il servizio EPSocketIOService che facilita la comunicazione con il socket server messo a disposizione dalla libreria node (@ep-framework/node-socket.io)


**@ep-framework/ngx-voice-ui **
chiedere a Federico



Come migliorarla?
Linee guida dello sviluppatore (per poter modificare questa libreria occorre):


Chiedere un deploy token per poter scrivere pacchetti nel registro gitlab e l'accesso al repository gitlab per accedere ai sorgenti


Aggiungere al file di configurazione di npm (in windows normalmente %userprofile%.npmrc) le seguenti righe:


@ep-framework:registry=https://gitlab.com/api/v4/packages/npm/
# this will allow package upload to ep-framwork, project ep-ngx-lib (id 20725688)
//gitlab.com/api/v4/projects/20725688/packages/npm/:_authToken=<deploy_token> 
clonare il repo, e lanciare il comando
ng generate library @ep-framework/my-lib
questo creerà una libreria  "my-lib" nel progetto ep-framework.
dopo aver inserito il codice desiderato all'interno della libreria ed aver modificato il package.json della libreria stessa, con un qualcosa di simile a questo:
{
  "name": "@ep-framework/ngx-nome_pacchetto",
  "version": "0.0.52",
  "peerDependencies": {
    ...
  },
  "dependencies": {
    ...
  },
  "publishConfig": {
    "@ep-framework:registry": "https://gitlab.com/api/v4/projects/20725688/packages/npm/"
  }
}
trattandosi di un pacchetto per angular è importante utilizzare la nomenclatura: ngx-nomepacchetto così che si possano distinguere dagli altri moduli presenti in @ep-framework
è possibile pubblicare il pacchetto tramite i seguenti comandi:
ng build @ep-framework/my-lib --prod
cd dist/ep-framework/my-lib
npm publish

troubleshooting
se la compilazione di @ep-framework/core dovesse fallire al primo tentativo, lanciare il comando ng build @ep-framework/core senza --build, e poi ripetere con --build.