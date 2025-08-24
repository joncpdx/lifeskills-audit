// Life Skills Audit - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - script starting...');
    // Initialize the application
    initializeApp();
    console.log('App initialized');
});

function initializeApp() {
    // Add hover effects to feature cards
    setupFeatureCards();
}



function setupFeatureCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        // Add click handler to navigate to audit
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on start button
            if (e.target.classList.contains('start-button')) {
                return;
            }
            
            const skillId = this.dataset.skill;
            window.location.href = `audit.html?skill=${skillId}`;
        });
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const skillId = this.dataset.skill;
                window.location.href = `audit.html?skill=${skillId}`;
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        // Add hover effect description
        card.setAttribute('title', 'Click to start the audit for this skill area');
    });
    
    // Setup start buttons
    setupStartButtons();
    
    // Setup clear data button
    setupClearDataButton();
    
    // Setup download button
    setupDownloadButton();
    
    // Setup generate random results button
    setupGenerateButton();
    
    // Load saved scores
    loadSavedScores();
}

function setupStartButtons() {
    console.log('Setting up start buttons...');
    const startButtons = document.querySelectorAll('.start-button');
    console.log('Found', startButtons.length, 'start buttons');
    
    startButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Start button clicked:', this.id);
            e.stopPropagation(); // Prevent card click
            
            const skillId = this.id.replace('start-', '');
            navigateToSkill(skillId);
        });
    });
    
    // Add click handlers for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    console.log('Found', skillCards.length, 'skill cards');
    
    skillCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the start button (already handled above)
            if (e.target.classList.contains('start-button')) {
                return;
            }
            
            const skillId = this.getAttribute('data-skill');
            console.log('Skill card clicked:', skillId);
            navigateToSkill(skillId);
        });
    });
}

function navigateToSkill(skillId) {
    // Check if this skill has already been completed
    const savedScores = localStorage.getItem('lifeSkillsScores');
    if (savedScores) {
        const scores = JSON.parse(savedScores);
        if (scores[skillId] && scores[skillId] > 0) {
            // Skill is completed, show results instead of questions
            window.location.href = `audit.html?skill=${skillId}&showResults=true`;
        } else {
            // Skill not completed, show questions
            window.location.href = `audit.html?skill=${skillId}`;
        }
    } else {
        // No saved scores, show questions
        window.location.href = `audit.html?skill=${skillId}`;
    }
}

function setupClearDataButton() {
    console.log('Setting up clear data button...');
    const clearButton = document.getElementById('clear-all-data');
    
    if (clearButton) {
        console.log('Clear button found, adding event listener');
        clearButton.addEventListener('click', function() {
            console.log('Clear button clicked');
            if (confirm('Are you sure you want to clear all audit data? This action cannot be undone.')) {
                clearAllData();
            }
        });
    } else {
        console.error('Clear button not found!');
    }
}

function clearAllData() {
    // Remove all saved scores from localStorage
    localStorage.removeItem('lifeSkillsScores');
    
    // Reset all skill cards to show start buttons
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
        const scoreElement = document.getElementById(`score-${skillId}`);
        const statementElement = document.getElementById(`statement-${skillId}`);
        const startButton = document.getElementById(`start-${skillId}`);
        
        if (scoreElement && statementElement && startButton) {
            // Hide score and statement
            scoreElement.style.display = 'none';
            statementElement.style.display = 'none';
            
            // Show start button
            startButton.style.display = 'inline-block';
        }
    });
    
    // Show success message
    showClearSuccessMessage();
}

function showClearSuccessMessage() {
    // Create a temporary success message
    const message = document.createElement('div');
    message.className = 'clear-success-message';
    message.textContent = 'All data cleared successfully!';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    }, 3000);
}

function loadSavedScores() {
    const savedScores = localStorage.getItem('lifeSkillsScores');
    if (savedScores) {
        const scores = JSON.parse(savedScores);
        let completedSkills = 0;
        
        Object.keys(scores).forEach(skillId => {
            const scoreElement = document.getElementById(`score-${skillId}`);
            const statementElement = document.getElementById(`statement-${skillId}`);
            const startButton = document.getElementById(`start-${skillId}`);
            const skillCard = document.querySelector(`[data-skill="${skillId}"]`);
            
            if (scoreElement && startButton) {
                const rawScore = scores[skillId];
                
                // Only show score if the skill has actually been audited (score > 0)
                if (rawScore > 0) {
                    completedSkills++;
                    
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
                    
                    // Add completed class to skill card
                    if (skillCard) {
                        skillCard.classList.add('completed');
                    }
                    
                    // Show the statement if it exists
                    if (statementElement) {
                        statementElement.style.display = 'block';
                    }
                } else {
                    // If score is 0 or invalid, keep start button visible
                    startButton.style.display = 'inline-block';
                    scoreElement.style.display = 'none';
                    
                    // Remove completed class from skill card
                    if (skillCard) {
                        skillCard.classList.remove('completed');
                    }
                    
                    if (statementElement) {
                        statementElement.style.display = 'none';
                    }
                }
            }
        });
        
        // Show download button if all 7 skills are completed
        const downloadSection = document.getElementById('download-section');
        if (downloadSection) {
            if (completedSkills === 7) {
                downloadSection.style.display = 'block';
            } else {
                downloadSection.style.display = 'none';
            }
        }
    } else {
        // If no saved scores, ensure all statements are hidden and start buttons are visible
        hideAllStatements();
        showAllStartButtons();
        
        // Hide download button
        const downloadSection = document.getElementById('download-section');
        if (downloadSection) {
            downloadSection.style.display = 'none';
        }
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
        const skillCard = document.querySelector(`[data-skill="${skillId}"]`);
        
        if (startButton && scoreElement) {
            startButton.style.display = 'inline-block';
            scoreElement.style.display = 'none';
        }
        
        // Remove completed class from skill card
        if (skillCard) {
            skillCard.classList.remove('completed');
        }
    });
    
    // Hide download button
    const downloadSection = document.getElementById('download-section');
    if (downloadSection) {
        downloadSection.style.display = 'none';
    }
}

function setupDownloadButton() {
    const downloadButton = document.getElementById('download-results');
    if (downloadButton) {
        downloadButton.addEventListener('click', generatePDF);
    }
}

function generatePDF() {
    try {
        // Check if jsPDF is available
        if (!window.jspdf) {
            alert('PDF generation library not loaded. Please refresh the page and try again.');
            return;
        }
        
                const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Set default text color to black
        doc.setTextColor(0, 0, 0);
        
        // Get current date
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Get saved scores
    const savedScores = localStorage.getItem('lifeSkillsScores');
    if (!savedScores) {
        alert('No results to download. Please complete the audit first.');
        return;
    }
    
    const scores = JSON.parse(savedScores);
    
    // PDF styling
    const titleFontSize = 20;
    const headerFontSize = 14;
    const bodyFontSize = 12;
    const smallFontSize = 10;
    
    let yPosition = 20;
    
    // Title
    doc.setFontSize(titleFontSize);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('LIFE SKILLS AUDIT RESULTS', 105, yPosition, { align: 'center' });
    
    yPosition += 15;
    
    // Date
    doc.setFontSize(smallFontSize);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(dateString, 105, yPosition, { align: 'center' });
    
    yPosition += 25;
    
    // Book Recommendation Section at the top
    // Draw a more detailed book icon
    const bookX = 20;
    const bookY = yPosition;
    const bookWidth = 35;
    const bookHeight = 45;
    
    // Book spine (darker purple)
    doc.setFillColor(88, 108, 200);
    doc.rect(bookX, bookY, 8, bookHeight, 'F');
    
    // Book cover (main purple)
    doc.setFillColor(102, 126, 234);
    doc.rect(bookX + 8, bookY, bookWidth - 8, bookHeight, 'F');
    
    // Book pages (white)
    doc.setFillColor(255, 255, 255);
    doc.rect(bookX + 10, bookY + 2, bookWidth - 12, bookHeight - 4, 'F');
    
    // Book title lines (simulating text)
    doc.setFillColor(200, 200, 200);
    doc.rect(bookX + 12, bookY + 8, bookWidth - 16, 2, 'F');
    doc.rect(bookX + 12, bookY + 12, bookWidth - 18, 2, 'F');
    doc.rect(bookX + 12, bookY + 16, bookWidth - 20, 2, 'F');
    
    // Book binding (gold)
    doc.setFillColor(255, 215, 0);
    doc.rect(bookX + 6, bookY + 5, 4, bookHeight - 10, 'F');
    
    // Book title
    doc.setFontSize(headerFontSize);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(pdfData.bookRecommendation.title, bookX + bookWidth + 10, bookY + 15);
    
    doc.setFontSize(bodyFontSize);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    const subtitleText = pdfData.bookRecommendation.subtitle;
    const subtitleLines = doc.splitTextToSize(subtitleText, 120);
    doc.text(subtitleLines, bookX + bookWidth + 10, bookY + 25);
    
    yPosition += Math.max(50, subtitleLines.length * 5 + 20);
    
    // Learn more link
    doc.setFontSize(bodyFontSize);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0); // Black color for link
    doc.text('Learn more: ' + pdfData.bookRecommendation.learnMoreUrl, 20, yPosition);
    
    yPosition += 30;
    
    // Individual Skill Results
    doc.setFontSize(headerFontSize);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('INDIVIDUAL SKILL RESULTS', 20, yPosition);
    
    yPosition += 15;
    
    // Process each skill
    const skillIds = [
        'receiving-love',
        'exploring-playfully', 
        'finding-voice',
        'initiating-power',
        'building-competence',
        'increasing-responsibility',
        'expanding-love'
    ];
    
    skillIds.forEach((skillId, index) => {
        const rawScore = scores[skillId];
        if (rawScore > 0) {
            const displayScore = Math.round((rawScore / 1000) * 100);
            const scoreText = getScoreText(displayScore);
            const skillName = getSkillName(skillId);
            const skillDescription = getSkillDescription(skillId);
            const resultStatement = getResultStatement(skillId, displayScore);
            
            // Check if we need a new page - more conservative to prevent cutoff
            if (yPosition > 220) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Skill name
            doc.setFontSize(bodyFontSize);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(`${index + 1}. ${skillName}`, 20, yPosition);
            
            yPosition += 8;
            
            // Skill statement
            doc.setFontSize(smallFontSize);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0); // Black color for statement
            const skillStatement = getSkillStatement(skillId);
            const skillStatementLines = doc.splitTextToSize(skillStatement, 160);
            doc.text(skillStatementLines, 25, yPosition);
            yPosition += (skillStatementLines.length * 4) + 4;
            
            // Color-coded result button
            const color = getScoreColor(displayScore);
            const buttonWidth = 60;
            const buttonHeight = 12;
            const buttonX = 20;
            const buttonY = yPosition - 5;
            
            // Draw colored rectangle for result button
            doc.setFillColor(color);
            doc.rect(buttonX, buttonY, buttonWidth, buttonHeight, 'F');
            
            // Add result text on the button
            doc.setFontSize(smallFontSize);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(255, 255, 255); // White text
            doc.text(scoreText, buttonX + buttonWidth/2, buttonY + buttonHeight/2 + 2, { align: 'center' });
            
            // Reset text color
            doc.setTextColor(0, 0, 0);
            
            yPosition += 15;
            
            // Developmental stage
            doc.setFontSize(smallFontSize);
            doc.setFont(undefined, 'italic');
            doc.setTextColor(0, 0, 0);
            const stageLines = doc.splitTextToSize(skillDescription, 160);
            doc.text(stageLines, 25, yPosition);
            yPosition += (stageLines.length * 4) + 4;
            
            // Result statement
            doc.setFontSize(bodyFontSize);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            const statementLines = doc.splitTextToSize(resultStatement, 160);
            doc.text(statementLines, 25, yPosition);
            yPosition += (statementLines.length * 5) + 10;
        }
    });
    
    yPosition += 15;
    
    // Add Color Key at the very end
    // Check if we need a new page for the color key
    if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
    }
    
    // Color Key
    doc.setFontSize(headerFontSize);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('RESULT KEY', 20, yPosition);
    
    yPosition += 15;
    
    // Color key items
    const colorKey = [
        { color: 'rgb(220, 38, 38)', text: 'needs attention', range: '1-20' },
        { color: 'rgb(255, 165, 0)', text: 'opportunity for growth', range: '21-40' },
        { color: 'rgb(180, 180, 0)', text: 'developing', range: '41-60' },
        { color: 'rgb(95, 120, 25)', text: 'strong', range: '61-80' },
        { color: 'rgb(0, 100, 0)', text: 'thriving', range: '81-100' }
    ];
    
    colorKey.forEach((item, index) => {
        const keyX = 20;
        const keyY = yPosition;
        const colorBoxSize = 8;
        
        // Draw color box
        doc.setFillColor(item.color);
        doc.rect(keyX, keyY, colorBoxSize, colorBoxSize, 'F');
        
        // Add text
        doc.setFontSize(bodyFontSize);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(item.text, keyX + colorBoxSize + 5, keyY + 5);
        
        yPosition += 12;
    });
    
    // Save the PDF
    doc.save('life-skills-audit-results.pdf');
    } catch (error) {
        console.error('PDF generation error:', error);
        alert('Error generating PDF. Please try again or contact support.');
    }
}

function getSkillName(skillId) {
    return pdfData.skillNames[skillId] || skillId;
}

function getSkillDescription(skillId) {
    return pdfData.skillDescriptions[skillId] || '';
}

function getSkillStatement(skillId) {
    return pdfData.skillStatements[skillId] || '';
}

function getResultStatement(skillId, score) {
    const skillStatements = pdfData.resultStatements[skillId];
    if (!skillStatements) return '';
    
    if (score <= 40) return skillStatements.low;
    if (score <= 80) return skillStatements.moderate;
    return skillStatements.high;
}

function setupGenerateButton() {
    console.log('Setting up generate button...');
    const generateButton = document.getElementById('generate-random-dashboard');
    if (generateButton) {
        console.log('Generate button found, adding event listener');
        generateButton.addEventListener('click', generateRandomResults);
    } else {
        console.error('Generate button not found!');
    }
}

function generateRandomResults() {
    try {
        console.log('Generate button clicked - starting random generation...');
        
        // Generate random scores for all skills
        const skillIds = [
            'receiving-love',
            'exploring-playfully', 
            'finding-voice',
            'initiating-power',
            'building-competence',
            'increasing-responsibility',
            'expanding-love'
        ];
        
        // Generate random scores for each skill (1-1000 range)
        const randomScores = {};
        skillIds.forEach(skillId => {
            // Generate a random score between 100 and 1000
            const randomScore = Math.floor(Math.random() * 901) + 100;
            randomScores[skillId] = randomScore;
        });
        
        console.log('Generated scores:', randomScores);
        
        // Save to localStorage
        localStorage.setItem('lifeSkillsScores', JSON.stringify(randomScores));
        console.log('Scores saved to localStorage');
        
        // Update the display immediately
        loadSavedScores();
        console.log('Display updated');
        
        // Show success message
        alert('Random results generated! All skills now have random scores.');
        
    } catch (error) {
        console.error('Error in generateRandomResults:', error);
        alert('Error generating random results: ' + error.message);
    }
}

function getScoreColor(score) {
    // Ensure score is between 1 and 100
    score = Math.max(1, Math.min(100, score));
    
    // 5 distinct color ranges
    if (score <= 20) {
        return pdfData.scoreColors.needsAttention;
    } else if (score <= 40) {
        return pdfData.scoreColors.opportunityForGrowth;
    } else if (score <= 60) {
        return pdfData.scoreColors.developing;
    } else if (score <= 80) {
        return pdfData.scoreColors.strong;
    } else {
        return pdfData.scoreColors.thriving;
    }
}

function getScoreText(score) {
    // Ensure score is between 1 and 100
    score = Math.max(1, Math.min(100, score));
    
    // Return descriptive text based on score range
    if (score <= 20) {
        return pdfData.scoreTexts.needsAttention;
    } else if (score <= 40) {
        return pdfData.scoreTexts.opportunityForGrowth;
    } else if (score <= 60) {
        return pdfData.scoreTexts.developing;
    } else if (score <= 80) {
        return pdfData.scoreTexts.strong;
    } else {
        return pdfData.scoreTexts.thriving;
    }
}

function addLoadingAnimation() {
    // Add a subtle loading animation to the page
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            mainContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
}

function addScrollAnimations() {
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe feature cards for animation
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
}

function showAuditModal() {
    // Create a simple modal for the audit start
    const modal = document.createElement('div');
    modal.className = 'audit-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Start Your Life Skills Audit</h2>
                <button class="close-modal" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p>Ready to assess your life skills? This comprehensive audit will help you identify your strengths and areas for improvement.</p>
                <div class="audit-options">
                    <button class="audit-option" onclick="startQuickAudit()">
                        <h3>Quick Assessment</h3>
                        <p>10-15 minutes</p>
                    </button>
                    <button class="audit-option" onclick="startFullAudit()">
                        <h3>Full Assessment</h3>
                        <p>30-45 minutes</p>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .audit-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideIn 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #718096;
            padding: 0.5rem;
        }
        
        .audit-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        
        .audit-option {
            background: #f7fafc;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: left;
        }
        
        .audit-option:hover {
            border-color: #667eea;
            background: #edf2f7;
        }
        
        .audit-option h3 {
            margin: 0 0 0.5rem 0;
            color: #4a5568;
        }
        
        .audit-option p {
            margin: 0;
            color: #718096;
            font-size: 0.9rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.audit-modal');
    if (modal) {
        modal.remove();
    }
}

function showFeatureDetails(title) {
    // Show details about the selected feature
    const details = {
        'Comprehensive Assessment': 'Our assessment covers 8 key life skill domains including communication, financial literacy, emotional intelligence, time management, problem-solving, adaptability, leadership, and practical skills.',
        'Personalized Insights': 'Based on your responses, we provide detailed analysis of your strengths and specific recommendations for improvement in each area.',
        'Actionable Goals': 'Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) and track your progress with our built-in progress monitoring system.'
    };
    
    alert(`${title}\n\n${details[title] || 'More details coming soon!'}`);
}

function startQuickAudit() {
    closeModal();
    // Redirect to quick audit page or show quick audit form
    console.log('Starting quick audit...');
    alert('Quick audit functionality coming soon!');
}

function startFullAudit() {
    closeModal();
    // Redirect to full audit page or show full audit form
    console.log('Starting full audit...');
    alert('Full audit functionality coming soon!');
}

// Add CSS for scroll animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .feature-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card:nth-child(1) { transition-delay: 0.1s; }
    .feature-card:nth-child(2) { transition-delay: 0.2s; }
    .feature-card:nth-child(3) { transition-delay: 0.3s; }
`;

document.head.appendChild(animationStyles);
