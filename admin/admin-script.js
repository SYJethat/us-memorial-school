// Admin Portal JavaScript for U S Memorial Public School

// Sample data storage (in real application, this would be connected to a database)
let studentsData = [
    { id: 1, name: "Rahul Kumar", class: "5", rollNo: "05001", parentContact: "+91 9876543210", email: "rahul@example.com" },
    { id: 2, name: "Priya Sharma", class: "3", rollNo: "03015", parentContact: "+91 9876543211", email: "priya@example.com" },
    { id: 3, name: "Amit Singh", class: "7", rollNo: "07008", parentContact: "+91 9876543212", email: "amit@example.com" },
    { id: 4, name: "Sneha Gupta", class: "2", rollNo: "02022", parentContact: "+91 9876543213", email: "sneha@example.com" },
    { id: 5, name: "Vikash Yadav", class: "6", rollNo: "06012", parentContact: "+91 9876543214", email: "vikash@example.com" }
];

let facultyData = [
    { id: 1, name: "Dr. Rajesh Kumar", subject: "Mathematics", classes: "6-8", contact: "+91 9876543220", email: "rajesh@school.com" },
    { id: 2, name: "Mrs. Sunita Devi", subject: "English", classes: "1-5", contact: "+91 9876543221", email: "sunita@school.com" },
    { id: 3, name: "Mr. Anil Sharma", subject: "Science", classes: "6-8", contact: "+91 9876543222", email: "anil@school.com" },
    { id: 4, name: "Ms. Pooja Singh", subject: "Hindi", classes: "1-8", contact: "+91 9876543223", email: "pooja@school.com" }
];

let coursesData = [
    { id: 1, name: "Mathematics", description: "Basic to advanced mathematics concepts", classes: "1-8", faculty: "Dr. Rajesh Kumar" },
    { id: 2, name: "English", description: "Language skills and literature", classes: "1-8", faculty: "Mrs. Sunita Devi" },
    { id: 3, name: "Science", description: "Physics, Chemistry, Biology basics", classes: "6-8", faculty: "Mr. Anil Sharma" },
    { id: 4, name: "Hindi", description: "Hindi language and literature", classes: "1-8", faculty: "Ms. Pooja Singh" },
    { id: 5, name: "Social Studies", description: "History, Geography, Civics", classes: "3-8", faculty: "Mr. Anil Sharma" }
];

let classesData = [
    { id: 1, name: "Nursery", students: 25, teacher: "Mrs. Sunita Devi", room: "A-101" },
    { id: 2, name: "LKG", students: 28, teacher: "Ms. Pooja Singh", room: "A-102" },
    { id: 3, name: "UKG", students: 30, teacher: "Mrs. Sunita Devi", room: "A-103" },
    { id: 4, name: "Class 1", students: 32, teacher: "Mrs. Sunita Devi", room: "B-101" },
    { id: 5, name: "Class 2", students: 30, teacher: "Ms. Pooja Singh", room: "B-102" },
    { id: 6, name: "Class 3", students: 28, teacher: "Ms. Pooja Singh", room: "B-103" },
    { id: 7, name: "Class 4", students: 26, teacher: "Dr. Rajesh Kumar", room: "C-101" },
    { id: 8, name: "Class 5", students: 24, teacher: "Dr. Rajesh Kumar", room: "C-102" }
];

let newsData = [
    { id: 1, title: "Annual Sports Day 2024", content: "Join us for our annual sports day celebration...", date: "2024-02-15", type: "event" },
    { id: 2, title: "Admission Open for 2024-25", content: "Admissions are now open for the academic year 2024-25...", date: "2024-01-20", type: "announcement" },
    { id: 3, title: "Parent-Teacher Meeting", content: "Monthly parent-teacher meeting scheduled...", date: "2024-01-28", type: "meeting" }
];

let certificatesData = [
    { id: 1, studentName: "Rahul Kumar", class: "5", type: "completion", date: "2024-01-15", description: "Mathematics Course Completion" },
    { id: 2, studentName: "Priya Sharma", class: "3", type: "achievement", date: "2024-01-10", description: "Best Student Award" }
];

// Initialize the admin portal
$(document).ready(function() {
    initializeAdminPortal();
    loadDashboardData();
    setupEventListeners();
});

function initializeAdminPortal() {
    // Show dashboard by default
    showSection('dashboard');
    
    // Load initial data
    loadStudentsTable();
    loadFacultyTable();
    loadCoursesGrid();
    loadClassesGrid();
    loadNewsList();
    loadCertificatesList();
    
    console.log('Admin Portal initialized successfully!');
}

function setupEventListeners() {
    // Sidebar menu clicks
    $('.menu-item').click(function() {
        const section = $(this).data('section');
        showSection(section);
        
        $('.menu-item').removeClass('active');
        $(this).addClass('active');
    });
    
    // Certificate form submission
    $('#certificate-form').submit(function(e) {
        e.preventDefault();
        generateCertificate();
    });
    
    // Search functionality
    $('#student-search').on('input', function() {
        filterStudents();
    });
    
    $('#class-filter').change(function() {
        filterStudents();
    });
    
    // Settings form
    $('#school-settings').submit(function(e) {
        e.preventDefault();
        saveSchoolSettings();
    });
}

function showSection(sectionName) {
    $('.content-section').removeClass('active');
    $(`#${sectionName}`).addClass('active');
    
    // Update page title
    document.title = `${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} - Admin Portal`;
}

function loadDashboardData() {
    // Update statistics
    $('#total-students').text(studentsData.length);
    $('#total-faculty').text(facultyData.length);
    $('#total-courses').text(coursesData.length);
    $('#total-certificates').text(certificatesData.length);
    
    // Update admission stats
    $('#pending-applications').text('12');
    $('#approved-applications').text('8');
    $('#rejected-applications').text('3');
}

function loadStudentsTable() {
    const tbody = $('#students-table');
    tbody.empty();
    
    studentsData.forEach(student => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>Class ${student.class}</td>
                <td>${student.rollNo}</td>
                <td>${student.parentContact}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewStudent(${student.id})">
                        <i class="fa fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="editStudent(${student.id})">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteStudent(${student.id})">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });
}

function loadFacultyTable() {
    const tbody = $('#faculty-table');
    tbody.empty();
    
    facultyData.forEach(faculty => {
        const row = `
            <tr>
                <td>${faculty.id}</td>
                <td>${faculty.name}</td>
                <td>${faculty.subject}</td>
                <td>Class ${faculty.classes}</td>
                <td>${faculty.contact}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewFaculty(${faculty.id})">
                        <i class="fa fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="editFaculty(${faculty.id})">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteFaculty(${faculty.id})">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });
}

function loadCoursesGrid() {
    const grid = $('#courses-grid');
    grid.empty();
    
    coursesData.forEach(course => {
        const card = `
            <div class="course-card">
                <h5>${course.name}</h5>
                <p>${course.description}</p>
                <p><strong>Classes:</strong> ${course.classes}</p>
                <p><strong>Faculty:</strong> ${course.faculty}</p>
                <div class="card-actions">
                    <button class="btn btn-sm btn-warning" onclick="editCourse(${course.id})">
                        <i class="fa fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCourse(${course.id})">
                        <i class="fa fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        grid.append(card);
    });
}

function loadClassesGrid() {
    const grid = $('#classes-grid');
    grid.empty();
    
    classesData.forEach(classItem => {
        const card = `
            <div class="class-card">
                <h5>${classItem.name}</h5>
                <p><strong>Students:</strong> ${classItem.students}</p>
                <p><strong>Teacher:</strong> ${classItem.teacher}</p>
                <p><strong>Room:</strong> ${classItem.room}</p>
                <div class="card-actions">
                    <button class="btn btn-sm btn-info" onclick="viewClass(${classItem.id})">
                        <i class="fa fa-eye"></i> View
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="editClass(${classItem.id})">
                        <i class="fa fa-edit"></i> Edit
                    </button>
                </div>
            </div>
        `;
        grid.append(card);
    });
}

function loadNewsList() {
    const list = $('#news-list');
    list.empty();
    
    newsData.forEach(news => {
        const item = `
            <div class="news-item">
                <h5>${news.title}</h5>
                <div class="news-meta">
                    <span class="badge badge-primary">${news.type}</span>
                    <span>${formatDate(news.date)}</span>
                </div>
                <p>${news.content}</p>
                <div class="card-actions">
                    <button class="btn btn-sm btn-warning" onclick="editNews(${news.id})">
                        <i class="fa fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteNews(${news.id})">
                        <i class="fa fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        list.append(item);
    });
}

function loadCertificatesList() {
    const list = $('#certificates-list');
    list.empty();
    
    certificatesData.forEach(cert => {
        const item = `
            <div class="certificate-item">
                <h6>${cert.studentName}</h6>
                <p><strong>Class:</strong> ${cert.class}</p>
                <p><strong>Type:</strong> ${cert.type}</p>
                <p><strong>Date:</strong> ${formatDate(cert.date)}</p>
                <small>${cert.description}</small>
                <div class="mt-2">
                    <button class="btn btn-sm btn-success" onclick="downloadCertificate(${cert.id})">
                        <i class="fa fa-download"></i> Download
                    </button>
                    <button class="btn btn-sm btn-info" onclick="viewCertificate(${cert.id})">
                        <i class="fa fa-eye"></i> View
                    </button>
                </div>
            </div>
        `;
        list.append(item);
    });
}

function generateCertificate() {
    const studentName = $('#cert-student-name').val();
    const studentClass = $('#cert-class').val();
    const certType = $('#cert-type').val();
    const certDate = $('#cert-date').val();
    const certDescription = $('#cert-description').val();
    
    if (!studentName || !studentClass || !certType || !certDate) {
        showAlert('Please fill all required fields', 'danger');
        return;
    }
    
    // Generate certificate preview
    const certificateHTML = `
        <div class="certificate-template">
            <div style="text-align: center; padding: 20px;">
                <div style="border: 3px solid #a12c2f; padding: 30px; background: white;">
                    <div style="margin-bottom: 20px;">
                        <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #a12c2f, #f5a425); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                            <span style="color: white; font-weight: bold; font-size: 24px;">US</span>
                        </div>
                        <h2 style="color: #a12c2f; margin: 0;">U S Memorial Public School</h2>
                        <p style="color: #666; margin: 5px 0;">Newada Jhumila, Gorakhpur</p>
                    </div>
                    
                    <h1 style="color: #a12c2f; font-size: 36px; margin: 30px 0;">CERTIFICATE</h1>
                    <h3 style="color: #f5a425; margin: 20px 0;">OF ${certType.toUpperCase()}</h3>
                    
                    <div style="margin: 30px 0; line-height: 1.8;">
                        <p style="font-size: 18px; color: #333;">This is to certify that</p>
                        <h2 style="color: #a12c2f; font-size: 32px; margin: 15px 0; text-decoration: underline;">${studentName}</h2>
                        <p style="font-size: 18px; color: #333;">of Class ${studentClass}</p>
                        <p style="font-size: 16px; color: #666; margin: 20px 0;">${certDescription || 'has successfully completed the requirements'}</p>
                    </div>
                    
                    <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: end;">
                        <div style="text-align: left;">
                            <p style="margin: 0; color: #666;">Date: ${formatDate(certDate)}</p>
                        </div>
                        <div style="text-align: right;">
                            <div style="border-top: 2px solid #333; width: 200px; margin-bottom: 5px;"></div>
                            <p style="margin: 0; color: #333; font-weight: bold;">Principal</p>
                            <p style="margin: 0; color: #666; font-size: 14px;">U S Memorial Public School</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#certificate-preview').html('<h4>Certificate Preview</h4>' + certificateHTML);
    
    // Add to certificates data
    const newCert = {
        id: certificatesData.length + 1,
        studentName: studentName,
        class: studentClass,
        type: certType,
        date: certDate,
        description: certDescription || `${certType} certificate`
    };
    
    certificatesData.push(newCert);
    loadCertificatesList();
    loadDashboardData();
    
    showAlert('Certificate generated successfully!', 'success');
    
    // Reset form
    $('#certificate-form')[0].reset();
}

function downloadCertificate(certId) {
    const cert = certificatesData.find(c => c.id === certId);
    if (!cert) return;
    
    // In a real application, this would generate a PDF
    showAlert(`Certificate for ${cert.studentName} would be downloaded as PDF`, 'info');
}

function viewCertificate(certId) {
    const cert = certificatesData.find(c => c.id === certId);
    if (!cert) return;
    
    // Generate and show certificate in modal
    const certificateHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="border: 3px solid #a12c2f; padding: 30px; background: white;">
                <div style="margin-bottom: 20px;">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #a12c2f, #f5a425); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                        <span style="color: white; font-weight: bold; font-size: 24px;">US</span>
                    </div>
                    <h2 style="color: #a12c2f; margin: 0;">U S Memorial Public School</h2>
                    <p style="color: #666; margin: 5px 0;">Newada Jhumila, Gorakhpur</p>
                </div>
                
                <h1 style="color: #a12c2f; font-size: 36px; margin: 30px 0;">CERTIFICATE</h1>
                <h3 style="color: #f5a425; margin: 20px 0;">OF ${cert.type.toUpperCase()}</h3>
                
                <div style="margin: 30px 0; line-height: 1.8;">
                    <p style="font-size: 18px; color: #333;">This is to certify that</p>
                    <h2 style="color: #a12c2f; font-size: 32px; margin: 15px 0; text-decoration: underline;">${cert.studentName}</h2>
                    <p style="font-size: 18px; color: #333;">of Class ${cert.class}</p>
                    <p style="font-size: 16px; color: #666; margin: 20px 0;">${cert.description}</p>
                </div>
                
                <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: end;">
                    <div style="text-align: left;">
                        <p style="margin: 0; color: #666;">Date: ${formatDate(cert.date)}</p>
                    </div>
                    <div style="text-align: right;">
                        <div style="border-top: 2px solid #333; width: 200px; margin-bottom: 5px;"></div>
                        <p style="margin: 0; color: #333; font-weight: bold;">Principal</p>
                        <p style="margin: 0; color: #666; font-size: 14px;">U S Memorial Public School</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    showModal('Certificate View', certificateHTML, [
        {
            text: 'Download PDF',
            class: 'btn-success',
            action: () => downloadCertificate(certId)
        },
        {
            text: 'Close',
            class: 'btn-secondary',
            action: 'close'
        }
    ]);
}

function filterStudents() {
    const searchTerm = $('#student-search').val().toLowerCase();
    const classFilter = $('#class-filter').val();
    
    let filteredStudents = studentsData;
    
    if (searchTerm) {
        filteredStudents = filteredStudents.filter(student => 
            student.name.toLowerCase().includes(searchTerm) ||
            student.rollNo.toLowerCase().includes(searchTerm)
        );
    }
    
    if (classFilter) {
        filteredStudents = filteredStudents.filter(student => 
            student.class === classFilter
        );
    }
    
    // Update table with filtered results
    const tbody = $('#students-table');
    tbody.empty();
    
    filteredStudents.forEach(student => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>Class ${student.class}</td>
                <td>${student.rollNo}</td>
                <td>${student.parentContact}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewStudent(${student.id})">
                        <i class="fa fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="editStudent(${student.id})">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteStudent(${student.id})">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });
}

// Modal functions
function showModal(title, content, buttons = []) {
    const modalId = 'dynamicModal';
    const buttonsHTML = buttons.map(btn => 
        `<button type="button" class="btn ${btn.class}" onclick="${btn.action === 'close' ? `$('#${modalId}').modal('hide')` : btn.action + '()'}">${btn.text}</button>`
    ).join('');
    
    const modalHTML = `
        <div class="modal fade" id="${modalId}" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        ${buttonsHTML}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal
    $(`#${modalId}`).remove();
    
    // Add new modal
    $('body').append(modalHTML);
    $(`#${modalId}`).modal('show');
}

function showAlert(message, type = 'info') {
    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="close" data-dismiss="alert">
                <span>&times;</span>
            </button>
        </div>
    `;
    
    $('.main-content').prepend(alertHTML);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        $('.alert').fadeOut();
    }, 5000);
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session storage
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminUser');
        
        // Redirect to login page
        window.location.href = 'login.html';
    }
}

// Placeholder functions for CRUD operations
function viewStudent(id) { showAlert(`Viewing student with ID: ${id}`, 'info'); }
function editStudent(id) { showAlert(`Editing student with ID: ${id}`, 'info'); }
function deleteStudent(id) { 
    if (confirm('Are you sure you want to delete this student?')) {
        studentsData = studentsData.filter(s => s.id !== id);
        loadStudentsTable();
        loadDashboardData();
        showAlert('Student deleted successfully', 'success');
    }
}

function viewFaculty(id) { showAlert(`Viewing faculty with ID: ${id}`, 'info'); }
function editFaculty(id) { showAlert(`Editing faculty with ID: ${id}`, 'info'); }
function deleteFaculty(id) { 
    if (confirm('Are you sure you want to delete this faculty member?')) {
        facultyData = facultyData.filter(f => f.id !== id);
        loadFacultyTable();
        loadDashboardData();
        showAlert('Faculty member deleted successfully', 'success');
    }
}

function editCourse(id) { showAlert(`Editing course with ID: ${id}`, 'info'); }
function deleteCourse(id) { 
    if (confirm('Are you sure you want to delete this course?')) {
        coursesData = coursesData.filter(c => c.id !== id);
        loadCoursesGrid();
        loadDashboardData();
        showAlert('Course deleted successfully', 'success');
    }
}

function viewClass(id) { showAlert(`Viewing class with ID: ${id}`, 'info'); }
function editClass(id) { showAlert(`Editing class with ID: ${id}`, 'info'); }

function editNews(id) { showAlert(`Editing news with ID: ${id}`, 'info'); }
function deleteNews(id) { 
    if (confirm('Are you sure you want to delete this news item?')) {
        newsData = newsData.filter(n => n.id !== id);
        loadNewsList();
        showAlert('News item deleted successfully', 'success');
    }
}

function saveSchoolSettings() {
    showAlert('School settings saved successfully!', 'success');
}

// Modal show functions
function showAddStudentModal() {
    const content = `
        <form id="add-student-form">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>Student Name</label>
                    <input type="text" class="form-control" required>
                </div>
                <div class="form-group col-md-6">
                    <label>Class</label>
                    <select class="form-control" required>
                        <option value="">Select Class</option>
                        <option value="nursery">Nursery</option>
                        <option value="lkg">LKG</option>
                        <option value="ukg">UKG</option>
                        <option value="1">Class 1</option>
                        <option value="2">Class 2</option>
                        <option value="3">Class 3</option>
                        <option value="4">Class 4</option>
                        <option value="5">Class 5</option>
                        <option value="6">Class 6</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>Parent Contact</label>
                    <input type="tel" class="form-control" required>
                </div>
                <div class="form-group col-md-6">
                    <label>Email</label>
                    <input type="email" class="form-control">
                </div>
            </div>
        </form>
    `;
    
    showModal('Add New Student', content, [
        { text: 'Add Student', class: 'btn-primary', action: 'addStudent' },
        { text: 'Cancel', class: 'btn-secondary', action: 'close' }
    ]);
}

function showAddFacultyModal() {
    showAlert('Add Faculty modal would open here', 'info');
}

function showAddCourseModal() {
    showAlert('Add Course modal would open here', 'info');
}

function showAddClassModal() {
    showAlert('Add Class modal would open here', 'info');
}

function showAddNewsModal() {
    showAlert('Add News modal would open here', 'info');
}

function addStudent() {
    showAlert('Student would be added here', 'success');
    $('#dynamicModal').modal('hide');
}