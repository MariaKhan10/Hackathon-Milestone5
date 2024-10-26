declare var html2pdf: any;

document.addEventListener('DOMContentLoaded', function (): void {
    const form: HTMLFormElement | null = document.getElementById('resume-form') as HTMLFormElement;
    const resumePreview: HTMLElement | null = document.getElementById('resume-preview');
    const shareDownloadOptions: HTMLElement | null = document.getElementById('share-download-options');
    const resumeLink: HTMLElement | null = document.getElementById('resume-link');
    const shareLinkBtn: HTMLElement | null = document.getElementById('share-link-btn');
    const downloadPdfBtn: HTMLElement | null = document.getElementById('download-pdf-btn');

    // Function to dynamically add more Education fields
    const addEducationBtn: HTMLElement | null = document.getElementById('add-education');
    addEducationBtn?.addEventListener('click', function (): void {
        const educationSection = document.getElementById('education-section') as HTMLElement;
        const educationItem = document.createElement('div');
        educationItem.classList.add('education-item');
        educationItem.innerHTML = `
            <label>Education:</label>
            <input type="text" placeholder="Your Education Background" />
            <label>Year:</label>
            <input type="text" placeholder="Year of Completion" />
        `;
        educationSection.appendChild(educationItem);
    });

    // Function to dynamically add more Experience fields
    const addExperienceBtn: HTMLElement | null = document.getElementById('add-experience');
    addExperienceBtn?.addEventListener('click', function (): void {
        const experienceSection = document.getElementById('experience-section') as HTMLElement;
        const experienceItem = document.createElement('div');
        experienceItem.classList.add('experience-item');
        experienceItem.innerHTML = `
            <label>Work Experience:</label>
            <input type="text" placeholder="Your Work Experience" />
            <label>Year:</label>
            <input type="text" placeholder="Year of Experience" />
        `;
        experienceSection.appendChild(experienceItem);
    });

    // Function to dynamically add more Skills fields
    const addSkillsBtn: HTMLElement | null = document.getElementById('add-skills');
    addSkillsBtn?.addEventListener('click', function (): void {
        const skillsSection = document.getElementById('skills-section') as HTMLElement;
        const skillsItem = document.createElement('div');
        skillsItem.classList.add('skills-item');
        skillsItem.innerHTML = `
            <label>Skills:</label>
            <input type="text" placeholder="Your Key Skills" />
            <label>Year:</label>
            <input type="text" placeholder="Year of Proficiency" />
        `;
        skillsSection.appendChild(skillsItem);
    });

    // Form submission event to generate the resume preview
    form?.addEventListener('submit', function (e: Event): void {
        e.preventDefault();

        const name: string = (document.getElementById('name') as HTMLInputElement).value;
        const email: string = (document.getElementById('email') as HTMLInputElement).value;
        const phone: string = (document.getElementById('phone') as HTMLInputElement).value;

        // Get profile picture
        const profilePictureInput = document.getElementById('profile-picture') as HTMLInputElement;
        const profilePictureFile = profilePictureInput.files?.[0];
        const reader = new FileReader();

        reader.onload = function (event: ProgressEvent<FileReader>): void {
            const imageUrl: string = event.target?.result as string;

            // Get all Education fields
            const educationItems = document.querySelectorAll('.education-item');
            const educationData = Array.from(educationItems).map(item => ({
                education: (item.querySelector('input[placeholder="Your Education Background"]') as HTMLInputElement).value,
                year: (item.querySelector('input[placeholder="Year of Completion"]') as HTMLInputElement).value,
            }));

            // Get all Experience fields
            const experienceItems = document.querySelectorAll('.experience-item');
            const experienceData = Array.from(experienceItems).map(item => ({
                workExperience: (item.querySelector('input[placeholder="Your Work Experience"]') as HTMLInputElement).value,
                year: (item.querySelector('input[placeholder="Year of Experience"]') as HTMLInputElement).value,
            }));

            // Get all Skills fields
            const skillsItems = document.querySelectorAll('.skills-item');
            const skillsData = Array.from(skillsItems).map(item => ({
                skill: (item.querySelector('input[placeholder="Your Key Skills"]') as HTMLInputElement).value,
                year: (item.querySelector('input[placeholder="Year of Proficiency"]') as HTMLInputElement).value,
            }));

            // Build the resume preview with user data
            resumePreview!.innerHTML = `
                <div class="resume-header">
                    ${imageUrl ? `<img src="${imageUrl}" alt="Profile Picture" />` : ''}
                    <h3 contenteditable="true">${name}</h3>
                </div>
                <div class="resume-section">
                    <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
                    <p><strong>Phone:</strong> <span contenteditable="true">${phone}</span></p>
                </div>
                <div class="resume-section">
                    <h4>Education</h4>
                    ${educationData.map(edu => `<p>${edu.education} (${edu.year})</p>`).join('')}
                </div>
                <div class="resume-section">
                    <h4>Work Experience</h4>
                    ${experienceData.map(exp => `<p>${exp.workExperience} (${exp.year})</p>`).join('')}
                </div>
                <div class="resume-section">
                    <h4>Skills</h4>
                    ${skillsData.map(skill => `<p>${skill.skill} (${skill.year})</p>`).join('')}
                </div>
            `;

            // Store the data in localStorage for sharing
            const resumeData = {
                name,
                email,
                phone,
                profilePicture: imageUrl, // Store the profile picture URL
                education: educationData,
                workExperience: experienceData,
                skills: skillsData,
            };
            localStorage.setItem('resumeData', JSON.stringify(resumeData));

            // Generate a link to share the resume
            const formattedName: string = name.trim().toLowerCase().replace(/\s+/g, '-');
            const resumeURL: string = `resume.html?user=${formattedName}`;
            resumeLink!.innerHTML = `Your resume link: <a href="${resumeURL}" target="_blank">${resumeURL}</a>`;

            // Display the share and download buttons
            shareDownloadOptions!.style.display = 'block';
        };

        // If no file is selected, proceed without a profile picture
        if (profilePictureFile) {
            reader.readAsDataURL(profilePictureFile);
        } else {
            reader.onload(null); // Proceed without a profile picture
        }
    });

    // Copy link to clipboard functionality
    shareLinkBtn?.addEventListener('click', function (): void {
        const linkElement: HTMLAnchorElement | null = resumeLink?.querySelector('a') as HTMLAnchorElement;
        navigator.clipboard.writeText(linkElement?.href || '')
            .then(function (): void { alert('Link copied to clipboard!'); })
            .catch(function (err: Error): void { console.error('Failed to copy link:', err); });
    });

    // Download resume as PDF functionality
    downloadPdfBtn?.addEventListener('click', function (): void {
        const element: HTMLElement | null = document.getElementById('resume-preview');
        html2pdf().from(element).save();
    });
});


const shareResumeBtn: HTMLElement | null = document.getElementById('share-resume-btn');

shareResumeBtn?.addEventListener('click', function (): void {
    if (navigator.share) {
        const name: string = (document.getElementById('name') as HTMLInputElement).value;
        const email: string = (document.getElementById('email') as HTMLInputElement).value;

        // Example text for sharing
        const shareData = {
            title: `${name}'s Resume`,
            text: `Check out the resume of ${name}, available at the link provided.`,
            url: window.location.href  // Link to the generated resume
        };

        navigator.share(shareData).then(() => {
            console.log("Resume shared successfully!");
        }).catch((error) => {
            console.error("Error sharing resume:", error);
        });
    } else {
        alert("Your device does not support sharing.");
    }
});
