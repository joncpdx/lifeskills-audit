// Life Skills Audit - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Add interactive features to the CTA button
    setupCTAButton();
    
    // Add hover effects to feature cards
    setupFeatureCards();
    
    // Add a simple loading animation
    addLoadingAnimation();
    
    // Add scroll-based animations
    addScrollAnimations();
}

function addSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show a modal or navigate to audit page
            showAuditModal();
        });
    }
}

function setupFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Add click handler for more details
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showFeatureDetails(title);
        });
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const title = this.querySelector('h3').textContent;
                showFeatureDetails(title);
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
    });
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
