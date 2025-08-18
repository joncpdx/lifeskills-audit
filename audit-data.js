// Life Skills Audit Data
const auditData = {
    skills: [
        {
            id: "receiving-love",
            name: "Receiving Love",
            description: "The ability to accept love, care, and support from others and God",
            questions: [
                "I avoid being vulnerable and receiving help",
                "I have a lot of negative thoughts about myself",
                "I get jealous when others get what they need",
                "I am unaware or ignore my physical needs for food, rest, and movement",
                "I expect others to know my needs without me telling them",
                "I use substances, media, or work to avoid addressing uncomfortable feelings",
                "I'm only lovable if I am _________(perfect, helpful, accomplished, unique, smart, loyal, fun, in control or liked by others)",
                "God is just putting up with me",
                "I imagine God as disappointed, or angry towards me",
                "It's difficult to trust that God genuinely cares about my needs"
            ]
        },
        {
            id: "exploring-playfully",
            name: "Exploring Playfully",
            description: "The ability to try new things, take risks, and embrace curiosity",
            questions: [
                "I avoid trying new behaviors",
                "I get stuck in my negative feelings and thoughts and often don't do anything about it",
                "I'm easily angry, ashamed, or afraid of trying new experiences or tasks",
                "I feel hindered by perfectionism",
                "I complain about the same problems and avoid taking action",
                "When I see other people doing interesting things in their life, I feel bad about myself",
                "I feel stuck",
                "I'm afraid to make decisions",
                "I'm afraid that God will disapprove or become angry with my decisions",
                "I don't experience God's kindness, patience, love and grace."
            ]
        },
        {
            id: "finding-voice",
            name: "Finding Your Voice",
            description: "The ability to express your thoughts, opinions, and preferences authentically",
            questions: [
                "I'm unaware of my own perspective and preferences",
                "I struggle communicating and I expect others to read my body language about my opinions and convictions",
                "I'm afraid of having different opinions or preferences from other people because my relationship might become threatened",
                "I ignore, or minimize negative thoughts and feelings in myself and others",
                "People describe me as a bully, aggressive, or passive-aggressive",
                "I believe that there is only a right way and wrong way to think about life I believe that there is only a right way and wrong way to think about life rather than embracing the fact that there are different perspectives, opinions and behaviors that are valuable.",
                "I often assume that my thoughts and interpretations about God and/or theology are facts.",
                "Prayer is difficult because I believe that God doesn't care about my real thoughts and preferences",
                "I automatically argue or feel afraid of other's perspectives and opinions about God",
                "God doesn’t care about me developing my thoughts and preferences"
            ]
        },
        {
            id: "initiating-power",
            name: "Initiating Power",
            description: "The ability to take initiative, be assertive, and handle conflicts constructively",
            questions: [
                "I am afraid of being assertive and taking initiative",
                "People say that I’m aggressive",
                "I avoid communicating my weaknesses and limitations",
                "I feel outraged or overwhelmed when things don't go the way I planned",
                "I stay stuck in painful circumstances instead of taking action",
                "I'm disrespectful or aggressive during conflicts with others.",
                "I avoid conflict",
                "I don't know how to make repairs in my relationships",
                "I believe God wants power-over me rather than a partnership with me",
                "I believe God controls everything and everyone"
            ]
        },
        {
            id: "building-competence",
            name: "Building Competence",
            description: "The ability to learn new skills, adapt to new situations, and grow capabilities",
            questions: [
                "I avoid learning new abilities or skills",
                "I avoid or get overwhelmed in new settings",
                "I'm overly accommodating in new settings",
                "I'm overly rebellious in new settings",
                "I can't listen and/or adapt to constructive feedback",
                "I expect to be capable and know how to do everything quickly",
                "I mostly engage with people who think like me, behave like me, or look like me",
                "I think God's cares more about rules and being a good person, than a relationship with me",
                "God doesn't care about me growing my abilities and skills",
                "I believe that God is more concerned about perfect or moral behavior than helping me grow my physical, emotional and social abilities"
            ]
        },
        {
            id: "increasing-responsibility",
            name: "Increasing Responsibility",
            description: "The ability to take ownership of your life, emotions, and commitments",
            questions: [
                "I'm afraid or avoid taking responsibility for my physical, emotional, social or spiritual well being",
                "I feel clueless or avoid dealing with negative emotions",
                "I avoid meeting my needs and mainly focus on the needs of others.",
                "I blame my problems on other people",
                "I blame my problems on bad luck",
                "I have a difficult time making and keeping commitments",
                "I'm only dependant in my relationships",
                "People say that I'm irresponsible",
                "My parents have more influence in my life than God",
                "God wants to control and direct my life"
            ]
        },
        {
            id: "expanding-love",
            name: "Expanding Love",
            description: "The ability to contribute to others' wellbeing and build meaningful connections",
            questions: [
                "I lack connection and meaning in my life",
                "I'm not contributing to the well being of others",
                "I don't know how to connect emotionally in my relationships",
                "I don't know how I could contribute in my relationships",
                "I haven't addressed or faced an addiction, health issues or unresolved trauma and how it affects both me and my relationships",
                "I contribute to my family and church but I feel joyless, burdened, jealous and/or resentful",
                "I have unprocessed wounds from relationships and it hinders a positive experience with God and relationships",
                "I use Scripture as a way to show how others are wrong, instead of it challenging me to become more like Jesus",
                "My community lacks diversity of thought, race, cultures, age, and socio-economics",
                "It's ok to treat people with disrespect and contempt in my words and behavior if they don't have the same beliefs and convictions as me and my community."
            ]
        }
    ],
    
    // Scoring system
    scoring: {
        never: 1,
        rarely: 2,
        sometimes: 3,
        often: 4,
        always: 5
    },
    
    // Interpretation ranges
    interpretation: {
        low: { min: 10, max: 20, label: "Needs Development", color: "#ef4444" },
        moderate: { min: 21, max: 35, label: "Developing", color: "#f59e0b" },
        good: { min: 36, max: 45, label: "Good", color: "#10b981" },
        excellent: { min: 46, max: 50, label: "Excellent", color: "#059669" }
    }
};
