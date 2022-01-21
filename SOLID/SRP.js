const fs = require("fs");
class Journal {
  constructor() {
    this.entries = {};
  }

  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join("\n");
  }
}

class PersistenceManager {
  preprocess(j) {
    // some fancy code
  }
  saveToFile(journal, filename) {
    fs.openSync(filename, "w");
    fs.writeFile(filename, journal.toString(), { flag: "wx" }, function (err) {
      if (err) throw err;
      console.log("It's saved!");
    });
  }

  load(journal, filename) {
    // some fancy code
  }

  loadFromUrl(journal, url) {
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
p.saveToFile(j, filename);
