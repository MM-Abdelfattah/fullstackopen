const mongoose = require("mongoose");

const args = process.argv;

if (args.length < 3) {
  console.log("Usage: node mongo.js <password> [name] [number]");
  process.exit(1);
}

const password = args[2];
const name = args[3];
const number = args[4];

if (args.length === 4) {
  console.log(
    "Please provide both name and number, or just the password to list all.",
  );
  process.exit(1);
}

const url = `mongodb+srv://Mohamed:${password}@cluster0.bagboyl.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (args.length === 3) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((p) => {
      console.log(`${p.name} ${p.number}`);
    });
    mongoose.connection.close();
  });
}

if (args.length === 5) {
  const person = new Person({ name, number });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
