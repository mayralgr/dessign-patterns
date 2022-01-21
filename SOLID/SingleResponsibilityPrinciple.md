# Single responsibility principle

```Javascript
class Journal {
    constructor(){
        this.entries = {};
    }

    addEntry(text){
        let c = ++Journal.count;
        let entry = `${c}: ${text}`;
        this.entries[c] = entry;
        return c;
    }

    removeEntry(index) {
        delete this.entries[index];
    }

    toString() {
        return Object.values(this.entries).join("\n")
    }
}

Journal.count = 0;

let j = new Journal();
j.addEntry("I cried today");
j.addEntry("I ate a bug");
console.log(j.toString());
```

#### Adding a save

```Javascript
import fs from 'fs';
class Journal {
    constructor(){
        this.entries = {};
    }

    addEntry(text){
        let c = ++Journal.count;
        let entry = `${c}: ${text}`;
        this.entries[c] = entry;
        return c;
    }

    removeEntry(index) {
        delete this.entries[index];
    }

    toString() {
        return Object.values(this.entries).join("\n")
    }

    save(filename) {
        fs.writeFileSync(filename, this.toString());
    }

    load(filename) {
        // some fancy code
    }

    loadFromUrl(url) {
        // some fancy code
    }
}

Journal.count = 0;

let j = new Journal();
j.addEntry("I cried today");
j.addEntry("I ate a bug");
console.log(j.toString());
```

This is wrong as the SRP gets broken.

All the ops related to persistance will be placed in another object.
like:

```Javascript
import fs from 'fs';
class Journal {
    constructor(){
        this.entries = {};
    }

    addEntry(text){
        let c = ++Journal.count;
        let entry = `${c}: ${text}`;
        this.entries[c] = entry;
        return c;
    }

    removeEntry(index) {
        delete this.entries[index];
    }

    toString() {
        return Object.values(this.entries).join("\n")
    }
}

class PersistenceManager {

    preprocess(j) {
        // some fancy code
    }
    saveToFile(journal, filename) {
        fs.writeFileSync(filename, journal.toString());
    }

    load(jorunal,filename) {
        // some fancy code
    }

    loadFromUrl(jorunal, url) {
        // some fancy code
    }
}

Journal.count = 0;

let j = new Journal();
j.addEntry("I cried today");
j.addEntry("I ate a bug");
console.log(j.toString());

let p = new PersistenceManager();

let filename = "./temp/journal.txt";
p.saveToFile(j,filename);
```

#### Separation of concerns
