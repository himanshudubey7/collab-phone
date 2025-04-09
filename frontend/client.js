// client/client.js

const axios = require('axios');
const inquirer = require('inquirer');
const { io } = require('socket.io-client');

const socket = io('http://localhost:5000');

socket.on('contactAdded', (contact) => {
  console.log(`🟢 New contact added: ${contact.name} - ${contact.phone}`);
});

socket.on('contactDeleted', (id) => {
  console.log(`🔴 Contact deleted with ID: ${id}`);
});

async function promptUser() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select an action:',
        choices: ['View Contacts', 'Add Contact', 'Delete Contact', 'Exit'],
      },
    ]);

    if (action === 'View Contacts') {
      const res = await axios.get('http://localhost:5000/contacts');
      console.log('\n📇 Contact List:\n');
      res.data.forEach((c, i) => {
        console.log(`${i + 1}. ${c.name} - ${c.phone} (ID: ${c._id})`);
      });
      console.log('\n');

    } else if (action === 'Add Contact') {
      const { name, phone } = await inquirer.prompt([
        { name: 'name', message: 'Enter name:' },
        { name: 'phone', message: 'Enter phone number:' },
      ]);

      await axios.post('http://localhost:5000/contacts', { name, phone });

    } else if (action === 'Delete Contact') {
      const res = await axios.get('http://localhost:5000/contacts');
      const choices = res.data.map((c) => ({
        name: `${c.name} - ${c.phone}`,
        value: c._id,
      }));

      if (choices.length === 0) {
        console.log('❌ No contacts to delete.\n');
        continue;
      }

      const { contactId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'contactId',
          message: 'Select contact to delete:',
          choices,
        },
      ]);

      await axios.delete(`http://localhost:5000/contacts/${contactId}`);
    } else {
      console.log('👋 Exiting...');
      process.exit(0);
    }
  }
}

promptUser();
