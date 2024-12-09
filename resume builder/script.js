document.getElementById('generateBtn').addEventListener('click', function () {
  const name = document.getElementById('name').value;
  const fathersName = document.getElementById('fathersName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const education = document.getElementById('education').value;
  const summary = document.getElementById('summary').value;
  const experience = document.getElementById('experience').value;
  const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
  const hobbies = document.getElementById('hobbies').value;
  const languages = document.getElementById('languages').value.split(',').map(lang => lang.trim());
  const references = document.getElementById('references').value;
  const profileImage = document.getElementById('profileImage').files[0];

  if (!name || !email || !phone || !address || !education || !skills.length) {
    alert('Please fill out all mandatory fields.');
    return;
  }

  const resumeContent = document.getElementById('resumeContent');

  if (profileImage) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageBase64 = e.target.result; // Get Base64 string
      generateResumeContent(imageBase64);
    };
    reader.readAsDataURL(profileImage);
  } else {
    generateResumeContent();
  }

  function generateResumeContent(imageBase64 = '') {
    resumeContent.innerHTML = `
      ${imageBase64 ? `<img id="uploadedImage" src="${imageBase64}" alt="Profile Picture">` : ''}
      <h3>${name}</h3>
      <p><strong>Father's Name:</strong> ${fathersName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>

      <section>
        <h3>Education:</h3>
        <p>${education}</p>
      </section>

      <section>
        <h3>Professional Objective:</h3>
        <p>${summary}</p>
      </section>

      ${experience ? `
      <section>
        <h3>Work Experience:</h3>
        <p>${experience}</p>
      </section>` : ''}

      <section>
        <h3>Professional Skills:</h3>
        <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
      </section>

      <section>
        <h3>Hobbies:</h3>
        <p>${hobbies}</p>
      </section>

      <section>
        <h3>Languages:</h3>
        <ul>${languages.map(lang => `<li>${lang}</li>`).join('')}</ul>
      </section>

      ${references ? `
      <section>
        <h3>References:</h3>
        <p>${references}</p>
      </section>` : ''}
    `;

    document.getElementById('resumeOutput').classList.remove('hidden');
  }
});

document.getElementById('downloadBtn').addEventListener('click', function () {
  const resumeContent = document.getElementById('resumeContent').innerHTML;
  const completeHTML = `
    <html>
      <head>
        <title>Resume</title>
        <style>
          body { font-family: Arial, sans-serif; }
          img { max-width: 100px; border-radius: 50%; margin-bottom: 10px; }
          section { margin-bottom: 20px; }
          h3 { font-size: 18px; margin-bottom: 5px; }
          ul { list-style-type: square; margin-left: 20px; }
        </style>
      </head>
      <body>${resumeContent}</body>
    </html>
  `;

  const blob = new Blob([completeHTML], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'resume.html';
  a.click();
});
