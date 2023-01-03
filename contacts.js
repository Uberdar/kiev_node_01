const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
console.log("contactsPath: ", contactsPath);

// TODO: задокументировать каждую функцию
async function listContacts() {
  const lc = await fs.readFile(contactsPath);
  const jsonedLc = JSON.parse(lc);
  console.log("jsonedLc: ", jsonedLc);
}

async function getContactById(contactId) {
  const lc = await fs.readFile(contactsPath);
  const jsonedLc = JSON.parse(lc);
  const getById = jsonedLc.filter((el) => el.id === contactId);
  console.log("getById: ", getById);
}

async function removeContact(contactId) {
  const lc = await fs.readFile(contactsPath);
  const jsonedLc = JSON.parse(lc);
  const findIndex = jsonedLc.findIndex((el) => el.id === contactId);
  console.log("findIndex: ", findIndex);
  if (findIndex === -1) {
    console.log("ERROR:Data not found!");
    return null;
  }
  const modifiedList = jsonedLc.splice(findIndex, 1);
  console.log("jsonedLc: ", jsonedLc);
}

async function addContact(name, email, phone) {
  const lc = await fs.readFile(contactsPath);
  console.log("lc: ", lc);
  const jsonedLc = JSON.parse(lc);
  console.log("jsonedLc: ", jsonedLc);
  const newItemInArray = { name, email, phone, id: uuidv4() };
  console.log("newItemInArray: ", newItemInArray);
  jsonedLc.push(newItemInArray);
  await fs.writeFile(contactsPath, JSON.stringify(jsonedLc, null, 2));
  return newItemInArray;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// async function fileOperations({ path, action, data }) {
//   try {
//     switch (action) {
//       case "getAll":
//         const testRead = await fs.readFile(path);
//         const jsonedFile = JSON.parse(testRead);
//         console.log("jsonedFile: ", jsonedFile);
//         break;

//       default:
//         console.log("Use of DEFAULT!");
//         break;
//     }
//   } catch (error) {
//     console.log("USE OF ERROR", error.message);
//   }
// }

// module.exports = fileOperations;

// fileOperations({ path: contactsPath, action: "getAll" });
