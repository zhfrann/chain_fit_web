document.addEventListener("DOMContentLoaded", () => {
  const addMemberBtn = document.getElementById("addMemberBtn");
  const searchMember = document.getElementById("searchMember");
  const memberTable = document.getElementById("memberTable");

  // Tambah anggota baru
  addMemberBtn.addEventListener("click", () => {
    const name = prompt("Masukkan nama anggota:");
    const email = prompt("Masukkan email anggota:");
    if (name && email) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>
          <button class="edit">Edit</button>
          <button class="delete">Hapus</button>
        </td>
      `;
      memberTable.appendChild(row);
    }
  });

  // Edit / Hapus anggota
  memberTable.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (e.target.classList.contains("delete")) {
      row.remove();
    } else if (e.target.classList.contains("edit")) {
      const nameCell = row.children[0];
      const emailCell = row.children[1];
      const newName = prompt("Edit nama anggota:", nameCell.textContent);
      const newEmail = prompt("Edit email anggota:", emailCell.textContent);
      if (newName && newEmail) {
        nameCell.textContent = newName;
        emailCell.textContent = newEmail;
      }
    }
  });

  // Fitur pencarian
  searchMember.addEventListener("input", () => {
    const filter = searchMember.value.toLowerCase();
    const rows = memberTable.getElementsByTagName("tr");
    Array.from(rows).forEach((row) => {
      const name = row.children[0].textContent.toLowerCase();
      const email = row.children[1].textContent.toLowerCase();
      row.style.display =
        name.includes(filter) || email.includes(filter) ? "" : "none";
    });
  });
});
