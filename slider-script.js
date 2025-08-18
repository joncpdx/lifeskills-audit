// Slider-based Life Skills Audit

let currentSkillIndex = 0;
let currentQuestionIndex = 0;
let userAnswers = {};
let skillScores = {};

document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    loadSkillFromURL();
    updateQuestion();
    setupEventListeners();
});

function initializeSlider() {
    // Load existing scores from localStorage
    const savedScores = localStorage.getItem('lifeSkillsScores');
    if (savedScores) {
        skillScores = JSON.parse(savedScores);
    }
    
    // Initialize user answers for all skills
    auditData.skills.forEach(skill => {
        userAnswers[skill.id] = {};
        skill.questions.forEach((question, index) => {
            userAnswers[skill.id][index] = 50; // Default to middle (50)
        });
        
        // Only initialize score to 0 if it doesn't already exist
        if (!skillScores[skill.id]) {
            skillScores[skill.id] = 0;
        }
    });
}

function loadSkillFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const requestedSkill = urlParams.get('skill');
    
    if (requestedSkill) {
        const skillIndex = auditData.skills.findIndex(skill => skill.id === requestedSkill);
        if (skillIndex !== -1) {
            currentSkillIndex = skillIndex;
        }
    }
}

function setupEventListeners() {
    const slider = document.getElementById('slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');

    slider.addEventListener('input', function() {
        const value = this.value;
        document.getElementById('slider-value').textContent = value;
        
        // Save the answer
        const currentSkill = auditData.skills[currentSkillIndex];
        userAnswers[currentSkill.id][currentQuestionIndex] = parseInt(value);
    });

    prevBtn.addEventListener('click', previousQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    finishBtn.addEventListener('click', finishSkill);
}

function updateQuestion() {
    const currentSkill = auditData.skills[currentSkillIndex];
    const currentQuestion = currentSkill.questions[currentQuestionIndex];
    
    // Update skill name
    document.getElementById('skill-name').textContent = currentSkill.name;
    
    // Update question number
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    
    // Update question text
    document.getElementById('question-text').textContent = currentQuestion;
    
    // Update slider value
    const savedValue = userAnswers[currentSkill.id][currentQuestionIndex];
    const slider = document.getElementById('slider');
    slider.value = savedValue;
    document.getElementById('slider-value').textContent = savedValue;
    
    // Update navigation buttons
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');
    
    prevBtn.disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === 9) { // Last question
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        finishBtn.style.display = 'none';
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < 9) {
        currentQuestionIndex++;
        updateQuestion();
    }
}

function finishSkill() {
    // Calculate score for current skill
    const currentSkill = auditData.skills[currentSkillIndex];
    const skillAnswers = userAnswers[currentSkill.id];
    const totalScore = Object.values(skillAnswers).reduce((sum, answer) => sum + answer, 0);
    
    // Save the score (1-1000 range)
    skillScores[currentSkill.id] = totalScore;
    
    // Save to localStorage
    localStorage.setItem('lifeSkillsScores', JSON.stringify(skillScores));
    
    // Return to dashboard
    window.location.href = 'index.html';
}



// Function to update scores on main page
function updateMainPageScores() {
    const savedScores = localStorage.getItem('lifeSkillsScores');
    if (savedScores) {
        const scores = JSON.parse(savedScores);
        
        Object.keys(scores).forEach(skillId => {
            const scoreElement = document.getElementById(`score-${skillId}`);
            const statementElement = document.getElementById(`statement-${skillId}`);
            const startButton = document.getElementById(`start-${skillId}`);
            
            if (scoreElement && startButton) {
                const rawScore = scores[skillId];
                
                // Only show score if the skill has actually been audited (score > 0)
                if (rawScore > 0) {
                    // Convert 1-1000 score to 0-100 for display
                    const displayScore = Math.round((rawScore / 1000) * 100);
                    
                    // Calculate color and text based on score
                    const color = getScoreColor(displayScore);
                    const scoreText = getScoreText(displayScore);
                    
                    // Hide start button and show score
                    startButton.style.display = 'none';
                    scoreElement.style.display = 'block';
                    scoreElement.textContent = scoreText;
                    scoreElement.style.background = color;
                    
                    // Show the statement if it exists
                    if (statementElement) {
                        statementElement.style.display = 'block';
                    }
                } else {
                    // If score is 0 or invalid, keep start button visible
                    startButton.style.display = 'inline-block';
                    scoreElement.style.display = 'none';
                    if (statementElement) {
                        statementElement.style.display = 'none';
                    }
                }
            }
        });
    } else {
        // If no saved scores, ensure all statements are hidden and start buttons are visible
        hideAllStatements();
        showAllStartButtons();
    }
}

function hideAllStatements() {
    const skillIds = [
        'receiving-love',
        'exploring-playfully', 
        'finding-voice',
        'initiating-power',
        'building-competence',
        'increasing-responsibility',
        'expanding-love'
    ];
    
    skillIds.forEach(skillId => {
        const statementElement = document.getElementById(`statement-${skillId}`);
        if (statementElement) {
            statementElement.style.display = 'none';
        }
    });
}

function showAllStartButtons() {
    const skillIds = [
        'receiving-love',
        'exploring-playfully', 
        'finding-voice',
        'initiating-power',
        'building-competence',
        'increasing-responsibility',
        'expanding-love'
    ];
    
    skillIds.forEach(skillId => {
        const startButton = document.getElementById(`start-${skillId}`);
        const scoreElement = document.getElementById(`score-${skillId}`);
        if (startButton && scoreElement) {
            startButton.style.display = 'inline-block';
            scoreElement.style.display = 'none';
        }
    });
}

function getScoreColor(score) {
    // Ensure score is between 1 and 100
    score = Math.max(1, Math.min(100, score));
    
    // 5 distinct color ranges
    if (score <= 20) {
        return 'rgb(220, 38, 38)'; // Deep red
    } else if (score <= 40) {
        return 'rgb(245, 101, 101)'; // Orange-red
    } else if (score <= 60) {
        return 'rgb(180, 180, 0)'; // Darker yellow for better readability
    } else if (score <= 80) {
        return 'rgb(34, 197, 94)'; // Light green
    } else {
        return 'rgb(0, 255, 0)'; // Pure green
    }
}

function getScoreText(score) {
    // Ensure score is between 1 and 100
    score = Math.max(1, Math.min(100, score));
    
    // Return descriptive text based on score range
    if (score <= 20) {
        return 'needs attention';
    } else if (score <= 40) {
        return 'opportunity for growth';
    } else if (score <= 60) {
        return 'developing';
    } else if (score <= 80) {
        return 'strong';
    } else {
        return 'thriving';
    }
}

// Update scores when main page loads
if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    document.addEventListener('DOMContentLoaded', updateMainPageScores);
}
