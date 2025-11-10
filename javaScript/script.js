
let contacts = [];
const apiURL = "https://jsonplaceholder.typicode.com/users"; // API


// Fetch Contacts 

async function fetchContacts() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error("Failed to fetch contacts");
    const data = await response.json();

   // fetch five contacts with api
    contacts = data.slice(0, 5).map(user => ({ 
      id: user.id,
      name: user.name,
      phone: user.phone
    }));

    renderContacts(contacts);
  } catch (error) {
    console.error(" Error:", error);
    alert("Failed to fetch contacts!");
  }
}

// Contact save to Table
function renderContacts(list) {
  const table = document.getElementById("contactTable");
  table.innerHTML = "";

  list.forEach(contact => {
    const row = `
      <tr>
        
        <td class="tableAlign">${contact.name}</td>
        <td class="tableAlign">${contact.phone}</td>
        <td><button class="btn btnEdit btn-sm" onclick="editContact(${contact.id})">Edit</button></td>
        <td><button class="btn btnDelete btn-sm" onclick="deleteContact(${contact.id})">Delete</button></td>
      </tr>
    `;
    table.innerHTML += row;
  });
}


// Add Contact Section

document.getElementById("contactForm").addEventListener("submit", async (e) => { 
  e.preventDefault();//

  const id = document.getElementById("contactId").value;
  const name = document.getElementById("Name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !phone) return alert("Please fill all fields!"); //

  if (id) {
    
    const index = contacts.findIndex(c => c.id == id);
    if (index > -1) {
      contacts.splice(index, 1, { id: Number(id), name, phone });
      alert("Contact updated successfully!");
    }
  } else {
    // Add new contact
    const newContact = { id: contacts.length + 1, name, phone };
    contacts.push(newContact);
    alert("Contact added successfully!");
  }

  renderContacts(contacts);
  e.target.reset();
  document.getElementById("cancelEdit").style.display = "none";
});


// Edit Contact

function editContact(id) {
  const contact = contacts.find(c => c.id === id);
  document.getElementById("contactId").value = contact.id;
  document.getElementById("Name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("cancelEdit").style.display = "inline-block";
}


// Cancel Edit

document.getElementById("cancelEdit").addEventListener("click", () => {
  document.getElementById("contactForm").reset();
  document.getElementById("cancelEdit").style.display = "none";
});


// Delete Contact

function deleteContact(id) {
  if (confirm("Are you sure you want to delete this contact?")) {
    contacts = contacts.filter(c => c.id !== id);
    renderContacts(contacts);
    alert("Contact deleted!");
  }
}


// Search Contact (filter + string methods)

document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();

  const results = contacts.filter(c =>
    c.name.toLowerCase().includes(query) || c.phone.includes(query)
  );

  renderContacts(results);
});


document.getElementById("searchInput").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  const results = contacts.filter(c =>
    c.name.toLowerCase().includes(query) || c.phone.includes(query)
  );
  renderContacts(results);
});


// Show Stats 

function showStats() {
  const total = contacts.reduce(acc => acc + 1, 0);
  const names = contacts.map(c => c.name).join(", ");
  console.log(`Total contacts: ${total}`);
  console.log(`Names: ${names}`);
}

// Initial Fetch
fetchContacts().then(showStats);