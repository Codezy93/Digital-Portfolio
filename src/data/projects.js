const projects = [
    {
        id: 1,
        name: "Stock Monk",
        image: "/images/stockmonk.jpg",
        description: "LSTM and NLP-powered stock price predictor that blends market sentiment with historical trends.",
        techStack: ["Python", "TensorFlow", "Keras", "NLTK", "Scikit-learn"],
        demoUrl: "https://stockmonk.example.com",
        githubUrl: "https://github.com/virajparadkar/stockmonk",
        htmlContent: `
        <h2>Stock Monk – AI-Driven Market Forecasting</h2>
        <p>
            A hybrid deep learning pipeline combining LSTM time series forecasting with real-time sentiment analysis from news and social media.
            Reduced prediction error by <strong>11%</strong> compared to vanilla LSTM models.
        </p>
        <ul>
            <li>Used VADER and custom sentiment scoring to guide sequence models dynamically.</li>
            <li>Processed over <strong>50,000 financial headlines</strong> and tweets for training sentiment weights.</li>
            <li>Deployed dashboards visualizing sentiment trends against price movement using Plotly.</li>
        </ul>
        `,
    },
    {
        id: 2,
        name: "Sprout App",
        image: "/images/sprout.png",
        description: "Postnatal mental health companion app using AI-driven sentiment monitoring.",
        techStack: ["Flutter", "Python", "AWS", "NLTK"],
        demoUrl: "https://sprout.example.com",
        githubUrl: "https://github.com/virajparadkar/sprout",
        htmlContent: `
        <h2>Sprout – AI-Powered Postnatal Wellness</h2>
        <p>
            A mobile health app that detects early signs of postpartum depression using journal-based sentiment analysis and psychological scoring models.
        </p>
        <ul>
            <li>Achieved <strong>40% increase in active users</strong> through 15+ interactive features.</li>
            <li>Implemented NLP models that analyze user inputs to track mental health over time.</li>
            <li>Improved backend data retrieval by <strong>25%</strong> using AWS Lambda and RDS tuning.</li>
            <li>Targeted for use in rural clinics and NGOs supporting new mothers.</li>
        </ul>
        `,
    },
    {
        id: 3,
        name: "Doctorify App",
        image: "/images/doctorify.png",
        description: "A disease detection mobile app designed for underserved and rural areas.",
        techStack: ["Flutter", "Python", "Scikit-learn", "REST API"],
        demoUrl: "https://doctorify.example.com",
        githubUrl: "https://github.com/virajparadkar/doctorify",
        htmlContent: `
        <h2>Doctorify – Mobile AI for Rural Diagnostics</h2>
        <p>
            AI-based diagnostic assistant delivering fast, offline-first medical assessments. Built to serve low-connectivity areas and aid community health workers.
        </p>
        <ul>
            <li>ML model trained on 30+ common conditions with <strong>98% accuracy</strong>.</li>
            <li>Reduced time to diagnosis by <strong>70%</strong>, increasing early detection rates by <strong>50%</strong>.</li>
            <li>Supports local language instructions and offline caching of results for health workers.</li>
        </ul>
        `,
    },
    {
        id: 4,
        name: "Sanvad",
        image: "/images/sanvad.png",
        description: "A multilingual conversational chatbot built using LLMs and Indian language models.",
        techStack: ["Python", "Transformers", "Langchain", "HTML", "CSS", "JavaScript"],
        demoUrl: "https://sanvad.example.com",
        githubUrl: "https://github.com/virajparadkar/sanvad",
        htmlContent: `
        <h2>Sanvad – India’s Multilingual LLM Chatbot</h2>
        <p>
            A context-aware conversational agent supporting 6+ Indian languages, built using transformer models and Langchain.
        </p>
        <ul>
            <li>Boosted user engagement by <strong>45%</strong> and satisfaction by <strong>50%</strong> with culturally tuned responses.</li>
            <li>Integrated fallback logic, entity memory, and multilingual translation layers.</li>
            <li>Target use-cases: rural education, digital helpdesks, and language inclusivity in public services.</li>
        </ul>
        `,
    },
];


export default projects;