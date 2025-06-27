(function () {
  const jobTypeGroup = document.querySelector('.job-type-group');
  const jobTypeInput = document.getElementById('jobType');
  const buttons = jobTypeGroup.querySelectorAll('.job-type-option');

  // Job type button selection
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isSelected = btn.classList.contains('selected');
      if (isSelected) {
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
      } else {
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
      }

      const selectedValues = Array.from(buttons)
        .filter((b) => b.classList.contains('selected'))
        .map((b) => b.dataset.value);
      jobTypeInput.value = selectedValues.join(',');
      jobTypeInput.dispatchEvent(new Event('input'));
    });
  });

  // Skills tag input logic
  const skillsWrapper = document.getElementById('skillsInputWrapper');
  const skillsInput = document.getElementById('skillsInput');
  const skillsHiddenInput = document.getElementById('skills');
  let skills = [];

  function renderSkills() {
    skillsWrapper.querySelectorAll('.skills-tag').forEach((e) => e.remove());
    skills.forEach((skill, index) => {
      const tag = document.createElement('span');
      tag.className = 'skills-tag';
      tag.setAttribute('role', 'listitem');
      tag.textContent = skill;

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.setAttribute('aria-label', `Remove skill ${skill}`);
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', () => {
        skills.splice(index, 1);
        updateSkills();
        renderSkills();
      });

      tag.appendChild(removeBtn);
      skillsWrapper.insertBefore(tag, skillsInput);
    });
    skillsHiddenInput.value = skills.join(',');
  }

  function updateSkills() {
    skillsHiddenInput.value = skills.join(',');
    if (skills.length === 0) {
      skillsHiddenInput.setCustomValidity('Please add at least one skill.');
    } else {
      skillsHiddenInput.setCustomValidity('');
    }
  }

  skillsInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && skillsInput.value.trim() !== '') {
      e.preventDefault();
      if (skills.length >= 5) {
        alert('You can only add up to 5 skills.');
        return;
      }
      const skillToAdd = skillsInput.value.trim();
      if (!skills.includes(skillToAdd)) {
        skills.push(skillToAdd);
        updateSkills();
        renderSkills();
      }
      skillsInput.value = '';
    }

    if (e.key === 'Backspace' && skillsInput.value === '' && skills.length > 0) {
      skills.pop();
      updateSkills();
      renderSkills();
    }
  });

  skillsWrapper.addEventListener('click', () => {
    skillsInput.focus();
  });

  // Form handling
  const form = document.getElementById('jobPostForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = {
      jobTitle: form.jobTitle.value.trim(),
      companyName: form.companyName.value.trim(),
      location: form.location.value.trim(),
      jobType: form.jobType.value,
      industry: form.industry.value,
      experienceLevel: form.experienceLevel.value,
      jobDescription: form.jobDescription.value.trim(),
      skills: skills,
      salaryMin: form.salaryMin.value ? Number(form.salaryMin.value) : null,
      salaryMax: form.salaryMax.value ? Number(form.salaryMax.value) : null,
    };

    alert('Job posted successfully! \n\n' + JSON.stringify(data, null, 2));
    form.reset();
    buttons.forEach((b) => {
      b.classList.remove('selected');
      b.setAttribute('aria-pressed', 'false');
    });
    jobTypeInput.value = '';
    skills = [];
    renderSkills();
  });
})();
