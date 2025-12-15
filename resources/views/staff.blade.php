<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Staff - Dashboard Gym</title>
  <link rel="stylesheet" href="{{ asset('css/staff.css') }}" />
</head>
<body>
  <!-- ===== Sidebar ===== -->
  <aside class="sidebar">
    <div>
      <div class="logo">Logo</div>

      <div class="gym-select">
        <label for="gymList">Gym</label>
        <div class="gym-dropdown">
          <select id="gymList">
            <option>Urban Gym</option>
          </select>
          <button id="addGymBtn">+</button>
        </div>
      </div>

      <nav class="nav">
        <a href="../dashboard_arzu/index.html" class="nav-link">Dashboard</a>
        <a href="../informations_and_facilities_rifki/index.html" class="nav-link">Informasi & Fasilitas</a>
        <a href="#" class="nav-link">Manajemen Keuangan</a>
        <a href="/staff" class="nav-link active">Staff</a>
        <a href="../member_gym_bintang/index.html" class="nav-link">Anggota Gym</a>
      </nav>
    </div>
  </aside>

  <!-- ===== Main Content ===== -->
  <main class="main">
    <header class="header">
      <h2>Staff</h2>
      <div class="profile">
         <button class="bell-btn">
      <i class="bell-icon">🔔</i>
    </button>
        <img src="https://i.scdn.co/image/ab67616d00001e02d45ec66aa3cf3864205fd068" alt="Profile" />
        <span>John Doe</span>
      </div>
    </header>

    <section class="content">
  <div class="card">
    <h3>Staff</h3>

    <div class="search-container">
      <input type="text" id="searchMember" placeholder="Search..." />
      <button id="addMemberBtn">Tambah</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Email</th>
          <th class="aksi">Aksi</th>
        </tr>
      </thead>
      <tbody id="memberTable">
        <tr>
          <td>Budi</td>
          <td>budi@gmail.com</td>
          <td>
            <button class="edit">Edit</button>
            <button class="delete">Hapus</button>
          </td>
        </tr>
        <tr>
          <td>Dodit</td>
          <td>dodit@gmail.com</td>
          <td>
            <button class="edit">Edit</button>
            <button class="delete">Hapus</button>
          </td>
        </tr>
        <tr>
          <td>Siti</td>
          <td>sity@gmail.com</td>
          <td>
            <button class="edit">Edit</button>
            <button class="delete">Hapus</button>
          </td>
        </tr>
        <tr>
          <td>Akmal</td>
          <td>akmal@gmail.com</td>
          <td>
            <button class="edit">Edit</button>
            <button class="delete">Hapus</button>
          </td>
        </tr>
        <tr>
          <td>Joko</td>
          <td>joko@gmail.com</td>
          <td>
            <button class="edit">Edit</button>
            <button class="delete">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

  </main>

  <script src="{{ asset('js/staff.js') }}"></script>
</body>
</html>
