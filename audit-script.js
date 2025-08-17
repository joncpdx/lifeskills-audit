// Life Skills Audit - Main Script

let currentSkillIndex = 0;
let userAnswers = {};

document.addEventListener('DOMContentLoaded', function() {
    initializeAudit();
});

function initializeAudit() {
    // Initialize user answers object
    auditData.skills.forEach(skill => {
        userAnswers[skill.id] = {};
        skill.questions.forEach((question, index) => {
            userAnswers[skill.id][index] = null;
        });
    });

    // Event listeners
    document.getElementById('start-audit').addEventListener('click', startAudit);
    document.getElementById('prev-skill').addEventListener('click', previousSkill);
    document.getElementById('next-skill').addEventListener('click', nextSkill);
    document.getElementById('submit-audit').addEventListener('click', submitAudit);
    document.getElementById('download-results').addEventListener('click', downloadResults);
    document.getElementById('retake-audit').addEventListener('click', retakeAudit);
}

function startAudit() {
    document.getElementById('audit-intro').style.display = 'none';
    document.getElementById('audit-form').style.display = 'block';
    
    // Check if a specific skill was requested
    const urlParams = new URLSearchParams(window.location.search);
    const requestedSkill = urlParams.get('skill');
    
    if (requestedSkill) {
        const skillIndex = auditData.skills.findIndex(skill => skill.id === requestedSkill);
        if (skillIndex !== -1) {
            currentSkillIndex = skillIndex;
        }
    }
    
    generateSkillSections();
    showSkill(currentSkillIndex);
    updateProgress();
}

function generateSkillSections() {
    const skillSectionsContainer = document.getElementById('skill-sections');
    skillSectionsContainer.innerHTML = '';

    auditData.skills.forEach((skill, skillIndex) => {
        const skillSection = document.createElement('div');
        skillSection.className = 'skill-section';
        skillSection.id = `skill-${skillIndex}`;
        skillSection.style.display = skillIndex === 0 ? 'block' : 'none';

        // Skill header
        const skillHeader = document.createElement('div');
        skillHeader.className = 'skill-header';
        skillHeader.innerHTML = `
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
        `;
        skillSection.appendChild(skillHeader);

        // Questions
        skill.questions.forEach((question, questionIndex) => {
            const questionContainer = document.createElement('div');
            questionContainer.className = 'question-container';
            questionContainer.innerHTML = `
                <div class="question-text">${question}</div>
                <div class="rating-options">
                    ${generateRatingOptions(skill.id, questionIndex)}
                </div>
            `;
            skillSection.appendChild(questionContainer);
        });

        skillSectionsContainer.appendChild(skillSection);
    });

    addRatingEventListeners();
}

function generateRatingOptions(skillId, questionIndex) {
    const ratings = [
        { value: 1, label: 'Never' },
        { value: 2, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 4, label: 'Often' },
        { value: 5, label: 'Always' }
    ];

    return ratings.map(rating => `
        <label class="rating-option" data-skill="${skillId}" data-question="${questionIndex}" data-value="${rating.value}">
            <input type="radio" name="q_${skillId}_${questionIndex}" value="${rating.value}">
            <span class="rating-label">${rating.label}</span>
            <span class="rating-value">${rating.value}</span>
        </label>
    `).join('');
}

function addRatingEventListeners() {
    document.querySelectorAll('.rating-option').forEach(option => {
        option.addEventListener('click', function() {
            const skillId = this.dataset.skill;
            const questionIndex = parseInt(this.dataset.question);
            const value = parseInt(this.dataset.value);

            userAnswers[skillId][questionIndex] = value;

            const questionContainer = this.closest('.question-container');
            questionContainer.querySelectorAll('.rating-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');

            checkSkillCompletion();
        });
    });
}

function checkSkillCompletion() {
    const currentSkill = auditData.skills[currentSkillIndex];
    const skillAnswers = userAnswers[currentSkill.id];
    const allAnswered = Object.values(skillAnswers).every(answer => answer !== null);

    const nextButton = document.getElementById('next-skill');
    const submitButton = document.getElementById('submit-audit');

    if (allAnswered) {
        nextButton.disabled = false;
        if (currentSkillIndex === auditData.skills.length - 1) {
            submitButton.style.display = 'inline-block';
            nextButton.style.display = 'none';
        }
    } else {
        nextButton.disabled = true;
    }
}

function showSkill(skillIndex) {
    document.querySelectorAll('.skill-section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });

    const currentSection = document.getElementById(`skill-${skillIndex}`);
    if (currentSection) {
        currentSection.style.display = 'block';
        currentSection.classList.add('active');
    }

    const prevButton = document.getElementById('prev-skill');
    const nextButton = document.getElementById('next-skill');
    const submitButton = document.getElementById('submit-audit');

    prevButton.disabled = skillIndex === 0;
    
    if (skillIndex === auditData.skills.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }

    restoreAnswers(skillIndex);
    checkSkillCompletion();
}

function restoreAnswers(skillIndex) {
    const skill = auditData.skills[skillIndex];
    const skillAnswers = userAnswers[skill.id];

    Object.keys(skillAnswers).forEach(questionIndex => {
        const answer = skillAnswers[questionIndex];
        if (answer !== null) {
            const option = document.querySelector(`[data-skill="${skill.id}"][data-question="${questionIndex}"][data-value="${answer}"]`);
            if (option) {
                option.classList.add('selected');
            }
        }
    });
}

function previousSkill() {
    if (currentSkillIndex > 0) {
        currentSkillIndex--;
        showSkill(currentSkillIndex);
        updateProgress();
    }
}

function nextSkill() {
    if (currentSkillIndex < auditData.skills.length - 1) {
        currentSkillIndex++;
        showSkill(currentSkillIndex);
        updateProgress();
    }
}

function updateProgress() {
    const totalQuestions = auditData.skills.reduce((total, skill) => total + skill.questions.length, 0);
    let answeredQuestions = 0;

    Object.keys(userAnswers).forEach(skillId => {
        Object.values(userAnswers[skillId]).forEach(answer => {
            if (answer !== null) answeredQuestions++;
        });
    });

    const progressPercentage = (answeredQuestions / totalQuestions) * 100;
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');

    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `${Math.round(progressPercentage)}% Complete`;
}

function submitAudit() {
    const results = calculateResults();
    displayResults(results);
    
    document.getElementById('audit-form').style.display = 'none';
    document.getElementById('audit-results').style.display = 'block';
}

function calculateResults() {
    const results = {
        skills: [],
        totalScore: 0,
        averageScore: 0
    };

    auditData.skills.forEach(skill => {
        const skillAnswers = userAnswers[skill.id];
        const skillScore = Object.values(skillAnswers).reduce((sum, answer) => sum + (answer || 0), 0);
        const maxScore = skill.questions.length * 5;
        const percentage = (skillScore / maxScore) * 100;

        let level = 'low';
        if (percentage >= 80) level = 'excellent';
        else if (percentage >= 60) level = 'good';
        else if (percentage >= 40) level = 'moderate';

        results.skills.push({
            name: skill.name,
            description: skill.description,
            score: skillScore,
            maxScore: maxScore,
            percentage: percentage,
            level: level,
            recommendations: generateRecommendations(skill.name, level)
        });

        results.totalScore += skillScore;
    });

    results.averageScore = results.totalScore / auditData.skills.length;
    return results;
}

function generateRecommendations(skillName, level) {
    const recommendations = {
        'Receiving Love': {
            low: ['Practice accepting compliments', 'Allow yourself to ask for help', 'Work on self-compassion'],
            moderate: ['Continue building trust', 'Practice vulnerability', 'Develop self-worth'],
            good: ['Help others develop this skill', 'Model healthy behaviors', 'Deepen spiritual connection'],
            excellent: ['Mentor others', 'Share your journey', 'Continue spiritual practices']
        },
        'Exploring Playfully': {
            low: ['Start with small new experiences', 'Practice curiosity', 'Reduce fear of failure'],
            moderate: ['Try one new activity monthly', 'Practice decision-making', 'Develop growth mindset'],
            good: ['Encourage others to try new things', 'Create opportunities', 'Share experiences'],
            excellent: ['Mentor others', 'Create encouraging environments', 'Lead by example']
        },
        'Finding Your Voice': {
            low: ['Express opinions in safe settings', 'Identify your preferences', 'Develop confidence'],
            moderate: ['Practice assertive communication', 'Handle disagreements constructively', 'Develop unique voice'],
            good: ['Help others find their voice', 'Create inclusive spaces', 'Model respectful disagreement'],
            excellent: ['Mentor others', 'Advocate for inclusion', 'Lead diverse discussions']
        },
        'Initiating Power': {
            low: ['Take small initiatives daily', 'Learn conflict resolution', 'Practice assertiveness'],
            moderate: ['Take leadership roles', 'Practice constructive conflict', 'Develop decision confidence'],
            good: ['Mentor others in initiative', 'Create leadership opportunities', 'Model healthy power dynamics'],
            excellent: ['Lead empowering initiatives', 'Create fair power systems', 'Mentor emerging leaders']
        },
        'Building Competence': {
            low: ['Identify one skill to develop', 'Learn in low-pressure environments', 'Accept feedback constructively'],
            moderate: ['Set specific learning goals', 'Seek diverse perspectives', 'Adapt to new situations'],
            good: ['Help others develop skills', 'Create learning opportunities', 'Model continuous learning'],
            excellent: ['Design learning experiences', 'Mentor skill development', 'Create inclusive learning']
        },
        'Increasing Responsibility': {
            low: ['Take responsibility for one area', 'Practice emotional awareness', 'Keep small commitments'],
            moderate: ['Expand responsibility areas', 'Develop emotional intelligence', 'Make and keep commitments'],
            good: ['Help others develop responsibility', 'Create accountability structures', 'Model healthy responsibility'],
            excellent: ['Mentor responsibility development', 'Create accountability systems', 'Lead by example']
        },
        'Expanding Love': {
            low: ['Start with small acts of kindness', 'Work on emotional connection', 'Address unresolved issues'],
            moderate: ['Expand circle of care', 'Practice emotional intimacy', 'Contribute to community'],
            good: ['Help others expand love capacity', 'Create inclusive spaces', 'Model unconditional love'],
            excellent: ['Lead love-expanding initiatives', 'Mentor others', 'Create well-being systems']
        }
    };

    return recommendations[skillName]?.[level] || [
        'Continue developing this skill area',
        'Seek feedback from trusted mentors',
        'Practice regularly in daily life'
    ];
}

function displayResults(results) {
    const resultsContent = document.getElementById('results-content');
    
    const summary = document.createElement('div');
    summary.className = 'results-summary';
    summary.innerHTML = `
        <h3>Your Life Skills Assessment Summary</h3>
        <p>You completed all 70 questions across 7 life skills areas. Here's your overall performance:</p>
        <div style="text-align: center; margin: 1rem 0;">
            <div style="font-size: 2.5rem; font-weight: 700; color: #667eea;">${Math.round(results.averageScore)}</div>
            <div style="color: #718096;">Average Score per Skill</div>
        </div>
    `;
    resultsContent.appendChild(summary);

    const skillResults = document.createElement('div');
    skillResults.className = 'skill-results';
    
    results.skills.forEach(skill => {
        const skillResult = document.createElement('div');
        skillResult.className = 'skill-result';
        skillResult.style.borderLeftColor = auditData.interpretation[skill.level].color;
        
        skillResult.innerHTML = `
            <h4>${skill.name}</h4>
            <div class="score-display">
                <span class="score-number">${skill.score}/${skill.maxScore}</span>
                <span class="score-label" style="background: ${auditData.interpretation[skill.level].color}; color: white;">
                    ${auditData.interpretation[skill.level].label}
                </span>
            </div>
            <div class="score-bar">
                <div class="score-fill" style="width: ${skill.percentage}%; background: ${auditData.interpretation[skill.level].color};"></div>
            </div>
            <p style="color: #718096; margin-bottom: 1rem;">${skill.description}</p>
            <div class="recommendations">
                <h5>Recommendations for Growth:</h5>
                <ul>
                    ${skill.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        `;
        
        skillResults.appendChild(skillResult);
    });
    
    resultsContent.appendChild(skillResults);
}

function downloadResults() {
    const results = calculateResults();
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'life-skills-audit-results.json';
    link.click();
}

function retakeAudit() {
    currentSkillIndex = 0;
    userAnswers = {};
    
    auditData.skills.forEach(skill => {
        userAnswers[skill.id] = {};
        skill.questions.forEach((question, index) => {
            userAnswers[skill.id][index] = null;
        });
    });
    
    document.getElementById('audit-results').style.display = 'none';
    document.getElementById('audit-intro').style.display = 'block';
}
