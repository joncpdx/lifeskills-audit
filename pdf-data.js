// PDF Content Data
const pdfData = {
    // Skill Names
    skillNames: {
        'receiving-love': 'Receiving Love',
        'exploring-playfully': 'Exploring Playfully',
        'finding-voice': 'Finding Your Voice',
        'initiating-power': 'Initiating Power',
        'building-competence': 'Building Competence',
        'increasing-responsibility': 'Increasing Responsibility',
        'expanding-love': 'Expanding Love'
    },

    // Skill Descriptions (Developmental Stage Connections)
    skillDescriptions: {
        'receiving-love': 'This skill is rooted in the infant stage, when we learn to receive care and love—because being loved helps us develop trust and security.',
        'exploring-playfully': 'This skill is rooted in the toddler stage, when curiosity and safety meet—because exploration helps us learn resilience and joy.',
        'finding-voice': 'This skill is rooted in the preschool stage, when we develop our unique identity—because having a voice helps us maintain connections while being ourselves.',
        'initiating-power': 'This skill is rooted in the preschool age stage when we learn to use our abilities because healthy power helps us contribute and create change.',
        'building-competence': 'This skill is rooted in middle childhood, when we develop our capabilities—because competence helps us adapt and grow in challenging circumstances.',
        'increasing-responsibility': 'This skill is rooted in young adulthood, when we take ownership of our lives—because responsibility helps us manage our internal world and behavior.',
        'expanding-love': 'This skill is rooted in adulthood, when we contribute to others—because expanding love helps us connect and contribute meaningfully.'
    },

    // Skill Statements
    skillStatements: {
        'receiving-love': 'I can receive love because I am loved just as I am.',
        'exploring-playfully': 'I can try new behaviors because I am supported.',
        'finding-voice': 'I can become my own person and keep connections.',
        'initiating-power': 'I can use my abilities and influence for healthy relationships.',
        'building-competence': 'I can grow my abilities in challenging circumstances.',
        'increasing-responsibility': 'I can manage my internal world and behavior.',
        'expanding-love': 'I can connect and contribute meaningfully.'
    },

    // Result Statements (Personalized recommendations based on score)
    resultStatements: {
        'receiving-love': {
            low: 'You may struggle to accept love and care from others. Consider practicing vulnerability and allowing yourself to receive support.',
            moderate: 'You\'re developing the ability to receive love. Focus on accepting help and recognizing your worthiness of care.',
            high: 'You have a strong foundation in receiving love. Continue to nurture this skill and help others develop it too.'
        },
        'exploring-playfully': {
            low: 'You may avoid new experiences due to fear or perfectionism. Try small experiments and celebrate curiosity.',
            moderate: 'You\'re building courage to explore. Practice trying new things in safe environments.',
            high: 'You embrace new experiences with joy. Your curiosity and resilience inspire others.'
        },
        'finding-voice': {
            low: 'You may struggle to express your authentic self. Practice sharing your thoughts and preferences.',
            moderate: 'You\'re developing your unique voice. Continue to express your perspective while maintaining connections.',
            high: 'You confidently express your authentic self. Your voice adds valuable perspective to your relationships.'
        },
        'initiating-power': {
            low: 'You may avoid taking initiative or handling conflicts. Practice assertiveness and constructive conflict resolution.',
            moderate: 'You\'re developing healthy power and initiative. Continue to take action and address conflicts directly.',
            high: 'You effectively use your influence for positive change. Your leadership and conflict resolution skills are strong.'
        },
        'building-competence': {
            low: 'You may avoid learning new skills or adapting to change. Focus on growth mindset and seeking feedback.',
            moderate: 'You\'re developing new capabilities. Continue to embrace challenges and learn from diverse perspectives.',
            high: 'You adapt and grow in challenging circumstances. Your competence and resilience are impressive.'
        },
        'increasing-responsibility': {
            low: 'You may avoid taking ownership of your life and emotions. Practice self-reflection and commitment-keeping.',
            moderate: 'You\'re taking more responsibility for your well-being. Continue to manage your internal world effectively.',
            high: 'You take full ownership of your life and choices. Your responsibility and self-management are exemplary.'
        },
        'expanding-love': {
            low: 'You may struggle to contribute meaningfully to others. Focus on identifying your gifts and connecting emotionally.',
            moderate: 'You\'re developing your ability to contribute and connect. Continue to share your talents and support others.',
            high: 'You meaningfully contribute to others\' well-being. Your love and generosity create positive impact.'
        }
    },

    // Score Color Definitions
    scoreColors: {
        needsAttention: 'rgb(220, 38, 38)',      // Deep red (1-20)
        opportunityForGrowth: 'rgb(255, 165, 0)', // Orange (21-40)
        developing: 'rgb(180, 180, 0)',           // Darker yellow (41-60)
        strong: 'rgb(95, 120, 25)',               // Olive green (61-80)
        thriving: 'rgb(0, 100, 0)'                // Dark green (81-100)
    },

    // Score Text Labels
    scoreTexts: {
        needsAttention: 'needs attention',
        opportunityForGrowth: 'opportunity for growth',
        developing: 'developing',
        strong: 'strong',
        thriving: 'thriving'
    },

    // Book Recommendation
    bookRecommendation: {
        title: '7 Skills for Life:',
        subtitle: 'Spiritual Growth in Each Stage of Human Development',
        learnMoreUrl: 'www.tristencollins.com'
    }
};
