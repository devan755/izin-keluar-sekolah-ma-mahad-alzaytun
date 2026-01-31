// Data simulasi - MENYIMPAN SEMUA DATA SEBELUMNYA
        let permissions = [
            {id: 1, name: "Ahmad Fauzi", class: "X IPA 1", date: "2023-10-26", hour: "1-2", type: "Pulang", reason: "Keperluan keluarga penting", status: "pending", teacher: ""},
            {id: 2, name: "Siti Aisyah", class: "XI IPA 2", date: "2023-10-25", hour: "3-4", type: "Keperluan Kesehatan", reason: "Periksa ke dokter gigi", status: "approved", teacher: "Bu Sari, S.Pd"},
            {id: 3, name: "Budi Santoso", class: "X IPS 1", date: "2023-10-24", hour: "5-6", type: "Pulang", reason: "Ada acara keluarga di luar kota", status: "rejected", teacher: "Pak Joko, M.Pd"},
            {id: 4, name: "Rina Febrianti", class: "XII IPA 1", date: "2023-10-26", hour: "7-8", type: "Keperluan Keluarga", reason: "Menjemput adik di bandara", status: "pending", teacher: ""},
            {id: 5, name: "Dedi Setiawan", class: "XI IPA 1", date: "2023-10-25", hour: "9-10", type: "Keperluan Lainnya", reason: "Mengikuti lomba karya ilmiah", status: "approved", teacher: "Bu Dewi, S.Pd"},
            {id: 6, name: "Maya Indah", class: "X IPA 2", date: "2023-10-27", hour: "3-4", type: "Pulang", reason: "Sakit kepala", status: "pending", teacher: ""},
            {id: 7, name: "Rizky Pratama", class: "XII IPA 2", date: "2023-10-27", hour: "5-6", type: "Keperluan Keluarga", reason: "Menghadiri pernikahan saudara", status: "approved", teacher: "Bu Maya, S.Pd"},
            {id: 8, name: "Sari Dewi", class: "XI IPA 2", date: "2023-10-26", hour: "7-8", type: "Keperluan Kesehatan", reason: "Kontrol dokter", status: "approved", teacher: "Bu Sari, S.Pd"},
            {id: 9, name: "Hendra Kurnia", class: "X IPS 1", date: "2023-10-25", hour: "1-2", type: "Keperluan Lainnya", reason: "Mengikuti seminar", status: "rejected", teacher: "Pak Joko, M.Pd"},
            {id: 10, name: "Lina Marlina", class: "XII IPA 1", date: "2023-10-27", hour: "9-10", type: "Pulang", reason: "Ada keperluan mendadak", status: "pending", teacher: ""}
        ];
        
        let classes = [
            {id: 1, name: "X IPA 1", teacher: "Bu Sari, S.Pd", room: "A-101", students: 32},
            {id: 2, name: "X IPA 2", teacher: "Pak Joko, M.Pd", room: "A-102", students: 30},
            {id: 3, name: "X IPS 1", teacher: "Bu Dewi, S.Pd", room: "B-101", students: 28},
            {id: 4, name: "XI IPA 1", teacher: "Pak Ahmad, M.Pd", room: "A-201", students: 33},
            {id: 5, name: "XI IPA 2", teacher: "Bu Rini, S.Pd", room: "A-202", students: 31},
            {id: 6, name: "XII IPA 1", teacher: "Pak Budi, M.Pd", room: "A-301", students: 29},
            {id: 7, name: "XII IPA 2", teacher: "Bu Maya, S.Pd", room: "A-302", students: 30}
        ];
        
        // State aplikasi
        let currentUser = null;
        let currentPage = "studentForm";
        let currentTeacherPage = "teacherDashboardPage";
        let currentPermissionId = null;
        let currentAction = null;
        let currentStudentName = "";
        let currentFilter = "all"; // Filter untuk riwayat siswa
        let editingClassId = null; // ID kelas yang sedang diedit
        let deletingClassId = null; // ID kelas yang akan dihapus
        
        // Login Functionality
 document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nama dari kotak Username
    const namaSiswa = document.getElementById('username').value;
    
    // Kirim ke Firebase
    if (window.simpanIzinKeAwan) {
        window.simpanIzinKeAwan(namaSiswa, "Masuk ke Sistem");
    }

    // Kode login asli kamu lanjut di bawah sini...
            
            const username = document.getElementById('username').value.toLowerCase();
            const password = document.getElementById('password').value;
            const isTeacher = document.getElementById('roleTeacher').classList.contains('active');
            
            if (isTeacher) {
                // Login guru
                if (username === "mahad alzaytun" && password === "123123") {
                    loginSuccess('teacher');
                } else {
                    showLoginError();
                }
            } else {
                // Login siswa
                if (username === "mahad alzaytun" && password === "123456") {
                    loginSuccess('student');
                } else {
                    showLoginError();
                }
            }
        });
        
        // Role selector
        document.getElementById('roleStudent').addEventListener('click', function() {
            document.getElementById('roleStudent').classList.add('active');
            document.getElementById('roleTeacher').classList.remove('active');
            document.getElementById('password').value = "";
        });
        
        document.getElementById('roleTeacher').addEventListener('click', function() {
            document.getElementById('roleTeacher').classList.add('active');
            document.getElementById('roleStudent').classList.remove('active');
            document.getElementById('password').value = "";
        });
        
        function loginSuccess(role) {
            currentUser = role;
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('loginError').style.display = 'none';
            
            if (role === 'student') {
                document.getElementById('studentDashboard').style.display = 'block';
                // Set default student name
                currentStudentName = "Ahmad Fauzi";
                document.getElementById('studentGreeting').textContent = currentStudentName;
                document.getElementById('studentName').value = currentStudentName;
                loadStudentPermissions();
            } else {
                document.getElementById('teacherDashboard').style.display = 'block';
                updateTeacherDashboard();
                loadTeacherPermissions();
                loadClassTable();
                loadReport();
            }
        }
        
        function showLoginError() {
            document.getElementById('loginError').style.display = 'block';
            setTimeout(() => {
                document.getElementById('loginError').style.display = 'none';
            }, 3000);
        }
        
        // Logout functionality
        document.getElementById('logoutStudent').addEventListener('click', function() {
            document.getElementById('studentDashboard').style.display = 'none';
            document.getElementById('loginPage').style.display = 'flex';
            resetForm();
            document.getElementById('successMessage').style.display = 'none';
        });
        
        document.getElementById('logoutTeacher').addEventListener('click', function() {
            document.getElementById('teacherDashboard').style.display = 'none';
            document.getElementById('loginPage').style.display = 'flex';
        });
        
        // Navigation for student
        document.querySelectorAll('.dashboard-nav a[data-page]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active nav
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
                
                // Show selected page
                const pageId = this.getAttribute('data-page');
                
                if (currentUser === 'student') {
                    document.querySelectorAll('.page-content').forEach(page => {
                        page.style.display = 'none';
                    });
                    document.getElementById(pageId).style.display = 'block';
                    currentPage = pageId;
                    
                    if (pageId === 'studentHistory') {
                        loadStudentPermissions();
                    }
                } else {
                    // Teacher navigation
                    document.querySelectorAll('.page-content').forEach(page => {
                        page.style.display = 'none';
                    });
                    document.getElementById(pageId).style.display = 'block';
                    currentTeacherPage = pageId;
                    
                    if (pageId === 'teacherPermission') {
                        loadTeacherPermissions();
                    } else if (pageId === 'teacherManageClass') {
                        loadClassTable();
                        // Sembunyikan form edit saat berpindah halaman
                        document.getElementById('editClassForm').style.display = 'none';
                    } else if (pageId === 'teacherReport') {
                        loadReport();
                    } else if (pageId === 'teacherDashboardPage') {
                        updateTeacherDashboard();
                    }
                }
            });
        });
        
        // Student form submission
        document.getElementById('permissionForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const studentName = document.getElementById('studentName').value;
            currentStudentName = studentName;
            
            // Buat ID baru berdasarkan ID tertinggi + 1
            const maxId = Math.max(...permissions.map(p => p.id));
            const newId = maxId + 1;
            
            const newPermission = {
                id: newId,
                name: studentName,
                class: document.getElementById('studentClass').value,
                date: document.getElementById('permissionDate').value,
                hour: document.getElementById('lessonHour').value,
                type: document.getElementById('permissionType').value,
                reason: document.getElementById('permissionReason').value,
                status: 'pending',
                teacher: ''
            };
            
            // Tambah ke array permissions (tanpa menghapus data lama)
            permissions.unshift(newPermission);
            
            // Show success message
            document.getElementById('successMessage').style.display = 'flex';
            
            // Update greeting
            document.getElementById('studentGreeting').textContent = studentName;
            
            // Reset form but keep name
            resetForm();
            document.getElementById('studentName').value = studentName;
            
            // Automatically switch to history page after 1 second
            setTimeout(() => {
                document.querySelector('.nav-item[data-page="studentHistory"]').click();
            }, 1500);
        });
        
        // Button to go to form from empty state
        document.getElementById('goToFormBtn').addEventListener('click', function() {
            document.querySelector('.nav-item[data-page="studentForm"]').click();
        });
        
        // Filter buttons for student history
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                
                // Set current filter
                currentFilter = this.getAttribute('data-filter');
                
                // Load filtered permissions
                loadStudentPermissions();
            });
        });
        
        // Date filter for student history
        document.getElementById('historyDateFilter').addEventListener('change', function() {
            loadStudentPermissions();
        });
        
        function resetForm() {
            // Keep the student name, reset other fields
            const studentName = document.getElementById('studentName').value;
            document.getElementById('studentClass').value = "";
            document.getElementById('permissionDate').value = "";
            document.getElementById('lessonHour').value = "";
            document.getElementById('permissionType').value = "";
            document.getElementById('permissionReason').value = "";
            
            // Set default date to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('permissionDate').value = today;
        }
        
        // Set default date to today
        window.addEventListener('load', function() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('permissionDate').value = today;
            document.getElementById('reportDate').value = today;
            document.getElementById('historyDateFilter').value = "";
        });
        
        function loadStudentPermissions() {
            const tableBody = document.getElementById('studentPermissionTableBody');
            const emptyState = document.getElementById('emptyHistory');
            tableBody.innerHTML = '';
            
            // Get date filter
            const dateFilter = document.getElementById('historyDateFilter').value;
            
            // Filter permissions berdasarkan filter yang dipilih
            let filteredPermissions = permissions;
            
            // Apply date filter if set
            if (dateFilter) {
                filteredPermissions = filteredPermissions.filter(p => p.date === dateFilter);
            }
            
            // Apply additional filters
            if (currentFilter === 'my') {
                // Hanya izin milik siswa yang sedang login
                filteredPermissions = filteredPermissions.filter(p => p.name === currentStudentName);
            } else if (currentFilter === 'pending') {
                // Hanya izin dengan status pending
                filteredPermissions = filteredPermissions.filter(p => p.status === 'pending');
            } else if (currentFilter === 'approved') {
                // Hanya izin dengan status approved
                filteredPermissions = filteredPermissions.filter(p => p.status === 'approved');
            } else if (currentFilter === 'rejected') {
                // Hanya izin dengan status rejected
                filteredPermissions = filteredPermissions.filter(p => p.status === 'rejected');
            }
            // Jika currentFilter === 'all', tampilkan semua
            
            if (filteredPermissions.length === 0) {
                emptyState.style.display = 'block';
                tableBody.innerHTML = '';
            } else {
                emptyState.style.display = 'none';
                
                filteredPermissions.forEach((perm, index) => {
                    const row = document.createElement('tr');
                    // Highlight row jika ini adalah izin milik siswa yang sedang login
                    const isMyPermission = perm.name === currentStudentName;
                    
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>
                            <strong>${perm.name}</strong>
                            ${isMyPermission ? '<span style="margin-left: 5px; font-size: 11px; color: var(--primary);">(Anda)</span>' : ''}
                        </td>
                        <td>${perm.class}</td>
                        <td>${perm.date}</td>
                        <td>${perm.hour}</td>
                        <td>${perm.type}</td>
                        <td>${perm.reason.substring(0, 30)}${perm.reason.length > 30 ? '...' : ''}</td>
                        <td><span class="status-badge status-${perm.status}">${perm.status === 'pending' ? 'Diproses' : perm.status === 'approved' ? 'Disetujui' : 'Ditolak'}</span></td>
                        <td>${perm.teacher || '-'}</td>
                    `;
                    
                    // Add highlight for user's own permissions
                    if (isMyPermission) {
                        row.style.backgroundColor = 'rgba(26, 95, 122, 0.05)';
                    }
                    
                    tableBody.appendChild(row);
                });
            }
        }
        
        // Teacher Functions
        function updateTeacherDashboard() {
            const pending = permissions.filter(p => p.status === 'pending').length;
            const approved = permissions.filter(p => p.status === 'approved').length;
            const rejected = permissions.filter(p => p.status === 'rejected').length;
            
            document.getElementById('pendingCount').textContent = pending;
            document.getElementById('approvedCount').textContent = approved;
            document.getElementById('rejectedCount').textContent = rejected;
            
            // Load recent requests
            const recentRequests = document.getElementById('recentRequests');
            recentRequests.innerHTML = '';
            
            // Show 5 most recent
            const recent = permissions.slice(0, 5);
            
            if (recent.length === 0) {
                recentRequests.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 30px; color: var(--gray);">Tidak ada permohonan terbaru</td></tr>`;
            } else {
                recent.forEach(perm => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><strong>${perm.name}</strong></td>
                        <td>${perm.class}</td>
                        <td>${perm.date}</td>
                        <td>${perm.type}</td>
                        <td><span class="status-badge status-${perm.status}">${perm.status === 'pending' ? 'Diproses' : perm.status === 'approved' ? 'Disetujui' : 'Ditolak'}</span></td>
                    `;
                    recentRequests.appendChild(row);
                });
            }
        }
        
        function loadTeacherPermissions() {
            const tableBody = document.getElementById('teacherPermissionTableBody');
            const emptyState = document.getElementById('emptyPermission');
            tableBody.innerHTML = '';
            
            if (permissions.length === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
                
                permissions.forEach((perm, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td><strong>${perm.name}</strong></td>
                        <td>${perm.class}</td>
                        <td>${perm.date}</td>
                        <td>${perm.hour}</td>
                        <td>${perm.type}</td>
                        <td>${perm.reason.substring(0, 30)}${perm.reason.length > 30 ? '...' : ''}</td>
                        <td><span class="status-badge status-${perm.status}">${perm.status === 'pending' ? 'Diproses' : perm.status === 'approved' ? 'Disetujui' : 'Ditolak'}</span></td>
                        <td class="action-buttons">
                            ${perm.status === 'pending' ? `
                                <button class="action-btn btn-success" data-id="${perm.id}" data-action="process"><i class="fas fa-cog"></i> Proses</button>
                                <button class="action-btn btn-primary" data-id="${perm.id}" data-action="approve"><i class="fas fa-check"></i> Setujui</button>
                                <button class="action-btn btn-danger" data-id="${perm.id}" data-action="reject"><i class="fas fa-times"></i> Tolak</button>
                            ` : perm.status === 'approved' ? `
                                <button class="action-btn btn-success" data-id="${perm.id}" data-action="print"><i class="fas fa-print"></i> Cetak</button>
                            ` : `
                                <button class="action-btn" style="background-color: #ccc;" disabled><i class="fas fa-ban"></i> Ditolak</button>
                            `}
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
                
                // Add event listeners to action buttons
                document.querySelectorAll('.action-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = parseInt(this.getAttribute('data-id'));
                        const action = this.getAttribute('data-action');
                        handleTeacherAction(id, action);
                    });
                });
            }
        }
        
        function handleTeacherAction(id, action) {
            currentPermissionId = id;
            currentAction = action;
            
            if (action === 'process' || action === 'approve' || action === 'reject') {
                // Open modal for teacher name
                document.getElementById('teacherModal').style.display = 'flex';
            } else if (action === 'print') {
                // Open print modal
                const permission = permissions.find(p => p.id === id);
                if (permission) {
                    document.getElementById('printName').textContent = permission.name;
                    document.getElementById('printClass').textContent = permission.class;
                    document.getElementById('printDate').textContent = permission.date;
                    document.getElementById('printHour').textContent = permission.hour;
                    document.getElementById('printType').textContent = permission.type;
                    document.getElementById('printReason').textContent = permission.reason;
                    document.getElementById('printTeacher').textContent = permission.teacher;
                    
                    document.getElementById('printModal').style.display = 'flex';
                }
            }
        }
        
        // Teacher modal handlers
        document.getElementById('closeTeacherModal').addEventListener('click', function() {
            document.getElementById('teacherModal').style.display = 'none';
        });
        
        document.getElementById('cancelTeacherBtn').addEventListener('click', function() {
            document.getElementById('teacherModal').style.display = 'none';
        });
        
        document.getElementById('confirmTeacherBtn').addEventListener('click', function() {
            const teacherName = document.getElementById('teacherName').value;
            if (!teacherName) {
                alert('Harap masukkan nama guru!');
                return;
            }
            
            // Update permission status
            const permissionIndex = permissions.findIndex(p => p.id === currentPermissionId);
            if (permissionIndex !== -1) {
                permissions[permissionIndex].teacher = teacherName;
                
                if (currentAction === 'process') {
                    permissions[permissionIndex].status = 'pending';
                } else if (currentAction === 'approve') {
                    permissions[permissionIndex].status = 'approved';
                } else if (currentAction === 'reject') {
                    permissions[permissionIndex].status = 'rejected';
                }
                
                document.getElementById('teacherModal').style.display = 'none';
                document.getElementById('teacherName').value = '';
                
                // Reload data
                loadTeacherPermissions();
                updateTeacherDashboard();
                loadReport();
                
                // If approved, open print modal
                if (currentAction === 'approve') {
                    setTimeout(() => {
                        handleTeacherAction(currentPermissionId, 'print');
                    }, 300);
                }
            }
        });
        
        // Print modal handlers
        document.getElementById('closePrintModal').addEventListener('click', function() {
            document.getElementById('printModal').style.display = 'none';
        });
        
        document.getElementById('printBtn').addEventListener('click', function() {
            const printContent = document.getElementById('printContent').innerHTML;
            const originalContent = document.body.innerHTML;
            
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            
            // Reinitialize the page
            if (currentUser === 'teacher') {
                document.getElementById('teacherDashboard').style.display = 'block';
                loadTeacherPermissions();
            }
            
            document.getElementById('printModal').style.display = 'none';
        });
        
        // Class management - DIPERBAIKI
        function loadClassTable() {
            const tableBody = document.getElementById('classTableBody');
            tableBody.innerHTML = '';
            
            classes.forEach((cls, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td><strong>${cls.name}</strong></td>
                    <td>${cls.teacher}</td>
                    <td>${cls.room}</td>
                    <td>${cls.students} siswa</td>
                    <td>
                        <button class="action-btn btn-warning edit-class-btn" data-class-id="${cls.id}"><i class="fas fa-edit"></i> Edit</button>
                        <button class="action-btn btn-danger delete-class-btn" data-class-id="${cls.id}"><i class="fas fa-trash"></i> Hapus</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
            
            // Add event listeners to edit buttons
            document.querySelectorAll('.edit-class-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const classId = parseInt(this.getAttribute('data-class-id'));
                    editClass(classId);
                });
            });
            
            // Add event listeners to delete buttons
            document.querySelectorAll('.delete-class-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const classId = parseInt(this.getAttribute('data-class-id'));
                    confirmDeleteClass(classId);
                });
            });
        }
        
        // Fungsi untuk mengedit kelas
        function editClass(classId) {
            const classToEdit = classes.find(c => c.id === classId);
            if (!classToEdit) return;
            
            editingClassId = classId;
            
            // Isi form edit dengan data kelas
            document.getElementById('editClassName').value = classToEdit.name;
            document.getElementById('editClassTeacher').value = classToEdit.teacher;
            document.getElementById('editClassRoom').value = classToEdit.room;
            document.getElementById('editClassStudents').value = classToEdit.students;
            
            // Tampilkan form edit
            document.getElementById('editClassForm').style.display = 'block';
            
            // Scroll ke form edit
            document.getElementById('editClassForm').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Fungsi untuk konfirmasi hapus kelas
        function confirmDeleteClass(classId) {
            const classToDelete = classes.find(c => c.id === classId);
            if (!classToDelete) return;
            
            deletingClassId = classId;
            
            // Isi nama kelas di modal konfirmasi
            document.getElementById('deleteClassName').textContent = classToDelete.name;
            
            // Tampilkan modal konfirmasi
            document.getElementById('deleteClassModal').style.display = 'flex';
        }
        
        // Event listener untuk tombol tambah kelas
        document.getElementById('addClassBtn').addEventListener('click', function() {
            const className = document.getElementById('className').value;
            const classTeacher = document.getElementById('classTeacher').value;
            const classRoom = document.getElementById('classRoom').value;
            
            if (!className || !classTeacher || !classRoom) {
                alert('Harap isi semua field!');
                return;
            }
            
            const newClass = {
                id: classes.length + 1,
                name: className,
                teacher: classTeacher,
                room: classRoom,
                students: Math.floor(Math.random() * 10) + 25 // Random jumlah siswa
            };
            
            classes.push(newClass);
            loadClassTable();
            
            // Reset form
            document.getElementById('className').value = '';
            document.getElementById('classTeacher').value = '';
            document.getElementById('classRoom').value = '';
            
            alert('Kelas berhasil ditambahkan!');
        });
        
        // Event listener untuk simpan edit kelas
        document.getElementById('saveEditClassBtn').addEventListener('click', function() {
            if (!editingClassId) return;
            
            const className = document.getElementById('editClassName').value;
            const classTeacher = document.getElementById('editClassTeacher').value;
            const classRoom = document.getElementById('editClassRoom').value;
            const classStudents = parseInt(document.getElementById('editClassStudents').value);
            
            if (!className || !classTeacher || !classRoom || isNaN(classStudents)) {
                alert('Harap isi semua field dengan benar!');
                return;
            }
            
            // Cari kelas yang diedit
            const classIndex = classes.findIndex(c => c.id === editingClassId);
            if (classIndex !== -1) {
                // Update data kelas
                classes[classIndex].name = className;
                classes[classIndex].teacher = classTeacher;
                classes[classIndex].room = classRoom;
                classes[classIndex].students = classStudents;
                
                // Reload tabel
                loadClassTable();
                
                // Sembunyikan form edit
                document.getElementById('editClassForm').style.display = 'none';
                
                // Reset editingClassId
                editingClassId = null;
                
                alert('Kelas berhasil diperbarui!');
            }
        });
        
        // Event listener untuk batal edit
        document.getElementById('cancelEditClassBtn').addEventListener('click', function() {
            document.getElementById('editClassForm').style.display = 'none';
            editingClassId = null;
        });
        
        // Event listener untuk konfirmasi hapus kelas
        document.getElementById('confirmDeleteClassBtn').addEventListener('click', function() {
            if (!deletingClassId) return;
            
            // Hapus kelas dari array
            const classIndex = classes.findIndex(c => c.id === deletingClassId);
            if (classIndex !== -1) {
                classes.splice(classIndex, 1);
                
                // Reload tabel
                loadClassTable();
                
                // Tutup modal
                document.getElementById('deleteClassModal').style.display = 'none';
                
                // Reset deletingClassId
                deletingClassId = null;
                
                alert('Kelas berhasil dihapus!');
            }
        });
        
        // Event listener untuk batal hapus kelas
        document.getElementById('cancelDeleteClassBtn').addEventListener('click', function() {
            document.getElementById('deleteClassModal').style.display = 'none';
            deletingClassId = null;
        });
        
        // Report functions
        function loadReport() {
            const tableBody = document.getElementById('reportTableBody');
            const emptyState = document.getElementById('emptyReport');
            tableBody.innerHTML = '';
            
            const filterDate = document.getElementById('reportDate').value;
            let filteredPermissions = permissions;
            
            if (filterDate) {
                filteredPermissions = permissions.filter(p => p.date === filterDate);
            }
            
            if (filteredPermissions.length === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
                
                filteredPermissions.forEach((perm, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td><strong>${perm.name}</strong></td>
                        <td>${perm.class}</td>
                        <td>${perm.date}</td>
                        <td>${perm.hour}</td>
                        <td>${perm.type}</td>
                        <td>${perm.reason}</td>
                        <td><span class="status-badge status-${perm.status}">${perm.status === 'pending' ? 'Diproses' : perm.status === 'approved' ? 'Disetujui' : 'Ditolak'}</span></td>
                        <td>${perm.teacher || '-'}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        }
        
        document.getElementById('filterReportBtn').addEventListener('click', loadReport);
        document.getElementById('resetReportBtn').addEventListener('click', function() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('reportDate').value = today;
            loadReport();
        });
        
        // Export to Excel (simulated)
        document.getElementById('exportExcelBtn').addEventListener('click', function() {
            // In a real implementation, this would generate an Excel file
            // For this demo, we'll just show an alert
            alert('Data laporan berhasil diekspor ke Excel! (Simulasi)\n\nFile "laporan_izin_"' + new Date().toISOString().split('T')[0] + '".xlsx" telah diunduh.');
            
            // In a real implementation, you would use a library like SheetJS
            // to generate an actual Excel file
        });
// --- KODE REALTIME DATABASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_Zv0gveG3WbUzPSm59tuTagMg5gMoEdc",
  authDomain: "izin-sekolah.firebaseapp.com",
  databaseURL: "https://izin-sekolah-default-rtdb.firebaseio.com", // Link dari gambar kamu
  projectId: "izin-sekolah",
  storageBucket: "izin-sekolah.firebasestorage.app",
  messagingSenderId: "542222511342",
  appId: "1:542222511342:web:cda0bafd53ea3f65b197ff"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Fungsi Kirim Data
window.simpanIzinKeAwan = (nama, alasan) => {
    const dataRef = ref(db, 'izin_siswa');
    const dataBaruRef = push(dataRef);
    set(dataBaruRef, {
        nama_siswa: nama,
        alasan_izin: alasan,
        waktu: new Date().toLocaleString()
    }).then(() => {
        alert("Suksess! Data sudah sinkron ke awan.");
    }).catch((error) => {
        console.error("Gagal kirim data:", error);
    });
};