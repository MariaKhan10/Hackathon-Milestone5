document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumePreview = document.getElementById('resume-preview');
    var shareDownloadOptions = document.getElementById('share-download-options');
    var resumeLink = document.getElementById('resume-link');
    var shareLinkBtn = document.getElementById('share-link-btn');
    var downloadPdfBtn = document.getElementById('download-pdf-btn');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (e) {
        var _a;
        e.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var workExperience = document.getElementById('workExperience').value;
        var skills = document.getElementById('skills').value;
        var profilePicture = ((_a = document.getElementById('profilePicture').files) === null || _a === void 0 ? void 0 : _a[0]) || null;
        if (!name || !email || !phone || !education || !workExperience || !skills) {
            alert('Please fill in all required fields.');
            return;
        }
        // Prepare the profile picture and save the data
        var reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            var imageUrl = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            // Save the resume data in localStorage
            var resumeData = {
                name: name,
                email: email,
                phone: phone,
                education: education,
                workExperience: workExperience,
                skills: skills,
                profilePicture: imageUrl,
            };
            localStorage.setItem('resumeData', JSON.stringify(resumeData));
            // Display resume preview
            resumePreview.innerHTML = "\n                <div class=\"resume-header\">\n                    <img src=\"".concat(imageUrl, "\" alt=\"Profile Picture\"/>\n                    <h3 contenteditable=\"true\">").concat(name, "</h3>\n                </div>\n                <div class=\"resume-section\">\n                    <p><strong>Email:</strong> <span contenteditable=\"true\">").concat(email, "</span></p>\n                    <p><strong>Phone:</strong> <span contenteditable=\"true\">").concat(phone, "</span></p>\n                </div>\n                <div class=\"resume-section\">\n                    <h4>Education</h4>\n                    <p contenteditable=\"true\">").concat(education, "</p>\n                </div>\n                <div class=\"resume-section\">\n                    <h4>Work Experience</h4>\n                    <p contenteditable=\"true\">").concat(workExperience, "</p>\n                </div>\n                <div class=\"resume-section\">\n                    <h4>Skills</h4>\n                    <p contenteditable=\"true\">").concat(skills, "</p>\n                </div>\n            ");
        };
        if (profilePicture) {
            reader.readAsDataURL(profilePicture);
        }
        // Generate a link with a query parameter to load the resume
        var formattedName = name.trim().toLowerCase().replace(/\s+/g, '-');
        var resumeURL = "resume.html?user=".concat(formattedName);
        resumeLink.innerHTML = "Your resume link: <a href=\"".concat(resumeURL, "\" target=\"_blank\">").concat(resumeURL, "</a>");
        // Show the share and download buttons
        shareDownloadOptions.style.display = 'block';
    });
    // Copy link to clipboard
    shareLinkBtn === null || shareLinkBtn === void 0 ? void 0 : shareLinkBtn.addEventListener('click', function () {
        var linkElement = resumeLink === null || resumeLink === void 0 ? void 0 : resumeLink.querySelector('a');
        navigator.clipboard.writeText((linkElement === null || linkElement === void 0 ? void 0 : linkElement.href) || '')
            .then(function () { return alert('Link copied to clipboard!'); })
            .catch(function (err) { return console.error('Failed to copy link:', err); });
    });
    // Download as PDF
    downloadPdfBtn === null || downloadPdfBtn === void 0 ? void 0 : downloadPdfBtn.addEventListener('click', function () {
        var element = document.getElementById('resume-preview');
        html2pdf().from(element).save();
    });
});
