document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumePreview = document.getElementById('resume-preview');
    var shareDownloadOptions = document.getElementById('share-download-options');
    var resumeLink = document.getElementById('resume-link');
    var shareLinkBtn = document.getElementById('share-link-btn');
    var downloadPdfBtn = document.getElementById('download-pdf-btn');
    // Function to dynamically add more Education fields
    var addEducationBtn = document.getElementById('add-education');
    addEducationBtn === null || addEducationBtn === void 0 ? void 0 : addEducationBtn.addEventListener('click', function () {
        var educationSection = document.getElementById('education-section');
        var educationItem = document.createElement('div');
        educationItem.classList.add('education-item');
        educationItem.innerHTML = "\n            <label>Education:</label>\n            <input type=\"text\" placeholder=\"Your Education Background\" />\n            <label>Year:</label>\n            <input type=\"text\" placeholder=\"Year of Completion\" />\n        ";
        educationSection.appendChild(educationItem);
    });
    // Function to dynamically add more Experience fields
    var addExperienceBtn = document.getElementById('add-experience');
    addExperienceBtn === null || addExperienceBtn === void 0 ? void 0 : addExperienceBtn.addEventListener('click', function () {
        var experienceSection = document.getElementById('experience-section');
        var experienceItem = document.createElement('div');
        experienceItem.classList.add('experience-item');
        experienceItem.innerHTML = "\n            <label>Work Experience:</label>\n            <input type=\"text\" placeholder=\"Your Work Experience\" />\n            <label>Year:</label>\n            <input type=\"text\" placeholder=\"Year of Experience\" />\n        ";
        experienceSection.appendChild(experienceItem);
    });
    // Function to dynamically add more Skills fields
    var addSkillsBtn = document.getElementById('add-skills');
    addSkillsBtn === null || addSkillsBtn === void 0 ? void 0 : addSkillsBtn.addEventListener('click', function () {
        var skillsSection = document.getElementById('skills-section');
        var skillsItem = document.createElement('div');
        skillsItem.classList.add('skills-item');
        skillsItem.innerHTML = "\n            <label>Skills:</label>\n            <input type=\"text\" placeholder=\"Your Key Skills\" />\n            <label>Year:</label>\n            <input type=\"text\" placeholder=\"Year of Proficiency\" />\n        ";
        skillsSection.appendChild(skillsItem);
    });
    // Form submission event to generate the resume preview
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (e) {
        var _a;
        e.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        // Get profile picture
        var profilePictureInput = document.getElementById('profile-picture');
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            var imageUrl = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            // Get all Education fields
            var educationItems = document.querySelectorAll('.education-item');
            var educationData = Array.from(educationItems).map(function (item) { return ({
                education: item.querySelector('input[placeholder="Your Education Background"]').value,
                year: item.querySelector('input[placeholder="Year of Completion"]').value,
            }); });
            // Get all Experience fields
            var experienceItems = document.querySelectorAll('.experience-item');
            var experienceData = Array.from(experienceItems).map(function (item) { return ({
                workExperience: item.querySelector('input[placeholder="Your Work Experience"]').value,
                year: item.querySelector('input[placeholder="Year of Experience"]').value,
            }); });
            // Get all Skills fields
            var skillsItems = document.querySelectorAll('.skills-item');
            var skillsData = Array.from(skillsItems).map(function (item) { return ({
                skill: item.querySelector('input[placeholder="Your Key Skills"]').value,
                year: item.querySelector('input[placeholder="Year of Proficiency"]').value,
            }); });
            // Build the resume preview with user data
            resumePreview.innerHTML = "\n                <div class=\"resume-header\">\n                    ".concat(imageUrl ? "<img src=\"".concat(imageUrl, "\" alt=\"Profile Picture\" />") : '', "\n                    <h3 contenteditable=\"true\">").concat(name, "</h3>\n                </div>\n                <div class=\"resume-section\">\n                    <p><strong>Email:</strong> <span contenteditable=\"true\">").concat(email, "</span></p>\n                    <p><strong>Phone:</strong> <span contenteditable=\"true\">").concat(phone, "</span></p>\n                </div>\n                <div class=\"resume-section\">\n                    <h4>Education</h4>\n                    ").concat(educationData.map(function (edu) { return "<p>".concat(edu.education, " (").concat(edu.year, ")</p>"); }).join(''), "\n                </div>\n                <div class=\"resume-section\">\n                    <h4>Work Experience</h4>\n                    ").concat(experienceData.map(function (exp) { return "<p>".concat(exp.workExperience, " (").concat(exp.year, ")</p>"); }).join(''), "\n                </div>\n                <div class=\"resume-section\">\n                    <h4>Skills</h4>\n                    ").concat(skillsData.map(function (skill) { return "<p>".concat(skill.skill, " (").concat(skill.year, ")</p>"); }).join(''), "\n                </div>\n            ");
            // Store the data in localStorage for sharing
            var resumeData = {
                name: name,
                email: email,
                phone: phone,
                profilePicture: imageUrl,
                education: educationData,
                workExperience: experienceData,
                skills: skillsData,
            };
            localStorage.setItem('resumeData', JSON.stringify(resumeData));
            // Generate a link to share the resume
            var formattedName = name.trim().toLowerCase().replace(/\s+/g, '-');
            var resumeURL = "resume.html?user=".concat(formattedName);
            resumeLink.innerHTML = "Your resume link: <a href=\"".concat(resumeURL, "\" target=\"_blank\">").concat(resumeURL, "</a>");
            // Display the share and download buttons
            shareDownloadOptions.style.display = 'block';
        };
        // If no file is selected, proceed without a profile picture
        if (profilePictureFile) {
            reader.readAsDataURL(profilePictureFile);
        }
        else {
            reader.onload(null); // Proceed without a profile picture
        }
    });
    // Copy link to clipboard functionality
    shareLinkBtn === null || shareLinkBtn === void 0 ? void 0 : shareLinkBtn.addEventListener('click', function () {
        var linkElement = resumeLink === null || resumeLink === void 0 ? void 0 : resumeLink.querySelector('a');
        navigator.clipboard.writeText((linkElement === null || linkElement === void 0 ? void 0 : linkElement.href) || '')
            .then(function () { alert('Link copied to clipboard!'); })
            .catch(function (err) { console.error('Failed to copy link:', err); });
    });
    // Download resume as PDF functionality
    downloadPdfBtn === null || downloadPdfBtn === void 0 ? void 0 : downloadPdfBtn.addEventListener('click', function () {
        var element = document.getElementById('resume-preview');
        html2pdf().from(element).save();
    });
});
