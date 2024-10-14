declare var html2pdf: any;

document.addEventListener('DOMContentLoaded', function (): void {
    const form: HTMLFormElement | null = document.getElementById('resume-form') as HTMLFormElement;
    const resumePreview: HTMLElement | null = document.getElementById('resume-preview');
    const shareDownloadOptions: HTMLElement | null = document.getElementById('share-download-options');
    const resumeLink: HTMLElement | null = document.getElementById('resume-link');
    const shareLinkBtn: HTMLElement | null = document.getElementById('share-link-btn');
    const downloadPdfBtn: HTMLElement | null = document.getElementById('download-pdf-btn');

    form?.addEventListener('submit', function (e: Event): void {
        e.preventDefault();

        const name: string = (document.getElementById('name') as HTMLInputElement).value;
        const email: string = (document.getElementById('email') as HTMLInputElement).value;
        const phone: string = (document.getElementById('phone') as HTMLInputElement).value;
        const education: string = (document.getElementById('education') as HTMLInputElement).value;
        const workExperience: string = (document.getElementById('workExperience') as HTMLInputElement).value;
        const skills: string = (document.getElementById('skills') as HTMLInputElement).value;
        const profilePicture: File | null = (document.getElementById('profilePicture') as HTMLInputElement).files?.[0] || null;

        if (!name || !email || !phone || !education || !workExperience || !skills) {
            alert('Please fill in all required fields.');
            return;
        }

        // Prepare the profile picture and save the data
        const reader: FileReader = new FileReader();
        reader.onload = function (event: ProgressEvent<FileReader>): void {
            const imageUrl: string = event.target?.result as string;
            // Save the resume data in localStorage
            const resumeData = {
                name,
                email,
                phone,
                education,
                workExperience,
                skills,
                profilePicture: imageUrl,
            };
            localStorage.setItem('resumeData', JSON.stringify(resumeData));

            // Display resume preview
            resumePreview!.innerHTML = `
                <div class="resume-header">
                    <img src="${imageUrl}" alt="Profile Picture"/>
                    <h3 contenteditable="true">${name}</h3>
                </div>
                <div class="resume-section">
                    <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
                    <p><strong>Phone:</strong> <span contenteditable="true">${phone}</span></p>
                </div>
                <div class="resume-section">
                    <h4>Education</h4>
                    <p contenteditable="true">${education}</p>
                </div>
                <div class="resume-section">
                    <h4>Work Experience</h4>
                    <p contenteditable="true">${workExperience}</p>
                </div>
                <div class="resume-section">
                    <h4>Skills</h4>
                    <p contenteditable="true">${skills}</p>
                </div>
            `;
        };

        if (profilePicture) {
            reader.readAsDataURL(profilePicture);
        }

        // Generate a link with a query parameter to load the resume
        const formattedName: string = name.trim().toLowerCase().replace(/\s+/g, '-');
        const resumeURL: string = `resume.html?user=${formattedName}`;
        resumeLink!.innerHTML = `Your resume link: <a href="${resumeURL}" target="_blank">${resumeURL}</a>`;

        // Show the share and download buttons
        shareDownloadOptions!.style.display = 'block';
    });

    // Copy link to clipboard
    shareLinkBtn?.addEventListener('click', function (): void {
        const linkElement: HTMLAnchorElement | null = resumeLink?.querySelector('a') as HTMLAnchorElement;
        navigator.clipboard.writeText(linkElement?.href || '')
            .then(function (): void { return alert('Link copied to clipboard!'); })
            .catch(function (err: Error): void { return console.error('Failed to copy link:', err); });
    });

    // Download as PDF
    downloadPdfBtn?.addEventListener('click', function (): void {
        const element: HTMLElement | null = document.getElementById('resume-preview');
        html2pdf().from(element).save();
    });
});
