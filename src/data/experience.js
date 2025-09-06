const experienceData = [
    {
        id: 1,
        company: 'MobiNext Technologies Pvt. Ltd.',
        role: 'Artificial Intelligence Intern',
        duration: 'Jun 2023 - Aug 2023',
        location: 'Navi Mumbai, IN',
        description: 'Led mission-critical enhancements to MobiNext’s AI-powered surveillance ecosystem, transforming detection reliability, user interactivity, and cross-location scalability.',
        impact:[
            { imhead: 'Multi-Model Optimization', imdesc:'Fine-tuned and deployed 4 real-time object detection models (gun, fire, chemical spill, age/gender) using YOLOv8 and custom pipelines. → Boosted mAP by +20.3%, reduced false positives by ~60%, and improved night-time detection by +35% using CLAHE & color space augmentations.'},
            { imhead: 'Distributed Cloud Architecture', imdesc:'Designed a modular AWS deployment stack (EC2, S3, EKS, Lambda, API Gateway) for real-time detection over ~120 live IP cameras in 12 commercial/industrial sites. → Achieved 99.98% uptime, with sub-250ms latency and auto-scaling support via Dockerized GPU containers.'},
            { imhead: 'Intelligent ROI & Event Filtering', imdesc:'Developed front-end tools for real-time ROI selection and conditional detection toggling (e.g., detect fire only in storage zones). → Increased operator control by +35%; reduced false alarms by ~42% via context-based suppression logic.'},
            { imhead: 'Monitoring & CI/CD Automation', imdesc:'Implemented ML observability stack: confidence heatmaps, per-class accuracy drift, latency charts (via Grafana + Prometheus). → Enabled weekly retraining using AWS CodePipeline + S3 triggers for seamless model updates.'},
            { imhead: 'Business Impact', imdesc:'Helped reduce incident response time by ~65% through faster, more accurate alerts.'},
        ],
        logo: '/images/mn_logo.png',
        technologies: ['Python', 'Flask', 'Pytorch', 'Ultralytics', 'OpenCV', 'AWS Lambda', 'AWS S3', 'AWS EC2', 'AWS DynamoDB', 'AWS API Gateway', 'AWS Kinesis'],
        gradient: 'from-blue-500 via-purple-500 to-pink-500',
    }
];


export default experienceData;