// User Registration
function register() {
    let userType = document.getElementById("userTypeRegister").value;
    let username = document.getElementById("newUsername").value;
    let password = document.getElementById("newPassword").value;
    
    if (username && password) {
        let userDetails = {
            username: username,
            password: password,
            type: userType // store the user type (volunteer, organization, admin)
        };
        
        localStorage.setItem(username, JSON.stringify(userDetails));
        alert("Registration successful! You can now log in.");
        window.location.href = "index.html";
    } else {
        alert("Please fill in all fields.");
    }
}

// User Login
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let userType = document.getElementById("userType").value;
    
    let user = JSON.parse(localStorage.getItem(username));

    if (user && user.password === password && user.type === userType) {
        localStorage.setItem("loggedInUser", username);
        
        if (user.type === "volunteer") {
            window.location.href = "volunteer_dashboard.html";
        } else if (user.type === "organization") {
            window.location.href = "organization-dashboard.html";
        } else if (user.type === "admin") {
            window.location.href = "admin_dashboard.html";
        }
    } else {
        alert("Invalid username, password, or user type!");
    }
}
// Save organization details in localStorage
document.getElementById('orgForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const orgName = document.getElementById('orgName').value;
    const orgAddress = document.getElementById('orgAddress').value;
    const orgContact = document.getElementById('orgContact').value;
    const orgEmail = document.getElementById('orgEmail').value;
    
    // Save organization details to localStorage
    const orgDetails = {
        orgName: orgName,
        orgAddress: orgAddress,
        orgContact: orgContact,
        orgEmail: orgEmail
    };
    
    localStorage.setItem('organizationDetails', JSON.stringify(orgDetails));
    alert('Organization details saved successfully!');
});

// Post volunteer request
document.getElementById('volunteerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const workDescription = document.getElementById('workDescription').value;
    const workDate = document.getElementById('workDate').value;
    const workTime = document.getElementById('workTime').value;
    const volunteersNeeded = document.getElementById('volunteersNeeded').value;
    const salaryPerVolunteer = document.getElementById('salaryPerVolunteer').value;
    const experienceRequired = document.getElementById('experienceRequired').checked;
    
    // Prepare the request object
    const request = {
        workDescription,
        workDate,
        workTime,
        volunteersNeeded,
        salaryPerVolunteer,
        experienceRequired
    };
    
    // Store the request in localStorage
    let volunteerRequests = JSON.parse(localStorage.getItem('volunteerRequests')) || [];
    volunteerRequests.push(request);
    localStorage.setItem('volunteerRequests', JSON.stringify(volunteerRequests));
    
    // Display the posted request
    displayPostedRequests();
    
    alert('Volunteer request posted successfully!');
});

// Display posted volunteer requests
function displayPostedRequests() {
    const requests = JSON.parse(localStorage.getItem('volunteerRequests')) || [];
    const postStatusDiv = document.getElementById('postStatus');
    postStatusDiv.innerHTML = ''; // Clear previous data

    requests.forEach(request => {
        const requestElement = document.createElement('p');
        requestElement.textContent = `Work: ${request.workDescription}, Date: ${request.workDate}, Time: ${request.workTime}, Volunteers Needed: ${request.volunteersNeeded}, Salary: ${request.salaryPerVolunteer}, Experience Required: ${request.experienceRequired ? 'Yes' : 'No'}`;
        postStatusDiv.appendChild(requestElement);
    });
}

// Display posted requests on page load
window.onload = displayPostedRequests;
// Show Add Organization Form
function showAddOrganizationForm() {
    document.getElementById("addOrganizationForm").style.display = "block";
}

// Save Organization Details
function saveOrganization() {
    let orgName = document.getElementById("orgName").value;
    let orgType = document.getElementById("orgType").value;
    let orgAddress = document.getElementById("orgAddress").value;
    let orgContact = document.getElementById("orgContact").value;
    let orgDescription = document.getElementById("orgDescription").value;

    if (orgName && orgType && orgAddress && orgContact && orgDescription) {
        // Save the organization details to localStorage
        localStorage.setItem("orgName", orgName);
        localStorage.setItem("orgType", orgType);
        localStorage.setItem("orgAddress", orgAddress);
        localStorage.setItem("orgContact", orgContact);
        localStorage.setItem("orgDescription", orgDescription);

        alert("Organization details saved successfully!");

        // Show the Request Volunteers button
        document.getElementById("requestVolunteersSection").style.display = "block";
        document.getElementById("addOrganizationForm").style.display = "none";
    } else {
        alert("Please fill in all fields.");
    }
}

// Request Volunteers
function requestVolunteers() {
    alert("You can now request volunteers for your organization!");
    // You can redirect to a new page or show a form to request volunteers
}
