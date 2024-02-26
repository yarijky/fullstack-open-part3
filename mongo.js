// const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];
// const name = process.argv[3];
// const number = process.argv[4];

// const url = `mongodb+srv://fullstack:${password}@cluster0.7vodo0d.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;
// mongoose.set("strictQuery", false);

// mongoose.connect(url);

// const phonebookSchema = new mongoose.Schema({
//   name: String,
//   number: Number,
// });

// const Phonebook = mongoose.model("Phonebook", phonebookSchema);

// const phonebook = new Phonebook({
//   name: name,
//   number: number,
// });

// if (name && number){
//   phonebook.save().then((result) => {
//     console.log(`added ${name} number ${number} to phonebook`);
//     mongoose.connection.close();
//   })
// }else{
//   Phonebook.find({}).then(result => {
//     result.forEach(phonebook => {
//       console.log(`${phonebook.name} ${phonebook.number}`)
//     })
//     mongoose.connection.close()
//   })
// }
