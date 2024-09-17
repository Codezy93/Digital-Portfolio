const certificatesMap = {
    "certificate1": ["J.P. Morgan & Chase Software Engineering Job Simulation", "Forage", "22-09-2023", "EShoHHK6qTTZtRHSr", "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/J.P.%20Morgan/R5iK7HMxJGBgaSbvk_J.P.%20Morgan_ogfqbYD8ohLjszF8v_1695351303878_completion_certificate.pdf", "./assets/images/EShoHHK6qTTZtRHSr.jpg"],
    "certificate2": ["British Airways - Data Science Job Simulation", "Forage", "21-09-2023", "YALXyzmeL8LXtoPqu", "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/British%20Airways/NjynCWzGSaWXQCxSX_British%20Airways_ogfqbYD8ohLjszF8v_1695267528569_completion_certificate.pdf", "./assets/images/YALXyzmeL8LXtoPqu.jpg"],
    "certificate3": ["Tata - Data Visualisation: Empowering Business with Effective Insights Job Simulation", "Forage", "21-09-2023", "mSf8mSyNYM3vsHPQu", "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Tata/MyXvBcppsW2FkNYCX_Tata_ogfqbYD8ohLjszF8v_1695275521624_completion_certificate.pdf", "./assets/images/mSf8mSyNYM3vsHPQu.jpg"],
    "certificate4": ["J.P. Morgan & Chase Software Engineering Lite Job Simulation", "Forage", "21-09-2023", "9TovWXCpf77wyFbc2", "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/J.P.%20Morgan/Wb4yEmHvZrC2qxiyX_JPMorgan%20Chase%20&%20Co._ogfqbYD8ohLjszF8v_1695269578017_completion_certificate.pdf", "./assets/images/9TovWXCpf77wyFbc2.jpg"],
    "certificate5": ["Python (Basic)", "HackerRank", "26-01-2023", "2119373d9d76", "https://www.hackerrank.com/certificates/2119373d9d76", "./assets/images/2119373d9d76.jpg"],
    "certificate6": ["Java (Basic)", "HackerRank", "21-04-2023", "60f7c9b5a552", "https://www.hackerrank.com/certificates/60f7c9b5a552", "./assets/images/60f7c9b5a552.jpg"],
    "certificate7": ["Problem Solving (Basic)", "HackerRank", "02-12-2023", "872a0ec95d9f", "https://www.hackerrank.com/certificates/872a0ec95d9f", "./assets/images/872a0ec95d9f.jpg"],
    "certificate8": ["CSS (Basic)", "HackerRank", "01-12-2023", "a821fc54cc3c", "https://www.hackerrank.com/certificates/a821fc54cc3c", "./assets/images/a821fc54cc3c.jpg"],
    "certificate9": ["SQL (Basic)", "HackerRank", "01-12-2023", "e1ec930bf551", "https://www.hackerrank.com/certificates/e1ec930bf551", "./assets/images/e1ec930bf551.jpg"],
    "certificate10": ["Software Engineer Intern", "HackerRank", "05-12-2023", "45027223a498", "https://www.hackerrank.com/certificates/45027223a498", "./assets/images/45027223a498.jpg"],
    "certificate11": ["JavaScript (Basic)", "HackerRank", "30-08-2024", "131add0afc35", "https://www.hackerrank.com/certificates/131add0afc35", "./assets/images/131add0afc35.png"],
    "certificate12": ["IBM Machine Learning with Python with Honours", "Coursera", "02-02-2023", "Z52NSW5NA2U5", "https://www.coursera.org/account/accomplishments/verify/Z52NSW5NA2U5", "./assets/images/Z52NSW5NA2U5.jpg"],
    "certificate13": ["The Bits and Bytes of Computer Networking", "Coursera", "03-12-2023", "Q54FR3FXEWD7", "https://www.coursera.org/account/accomplishments/verify/Q54FR3FXEWD7", "./assets/images/Q54FR3FXEWD7.jpeg"],
    "certificate14": ["Learn Linux in 5 Days and Level Up Your Career", "Udemy", "12-04-2023", "UC-a735b01e-dd0d-4216-8ece-5acc753ee89c", "https://www.udemy.com/certificate/UC-a735b01e-dd0d-4216-8ece-5acc753ee89c/", "./assets/images/UC-a735b01e-dd0d-4216-8ece-5acc753ee89c.jpg"],
    "certificate15": [" Python GUI Programming using Tkinter and Python 3", "Udemy", "09-02-2021", "UC-5726a49b-0c61-4876-9376-f4c4be2f58c4", "https://www.udemy.com/certificate/UC-5726a49b-0c61-4876-9376-f4c4be2f58c4/", "./assets/images/UC-5726a49b-0c61-4876-9376-f4c4be2f58c4.jpg"],
    "certificate16": [" Learn Ethical Hacking From Scratch", "Udemy", "15-04-2023", "UC-b2fe4a0b-ec6b-4fb3-85e6-15511a38df6c", "https://www.udemy.com/certificate/UC-b2fe4a0b-ec6b-4fb3-85e6-15511a38df6c/", "./assets/images/UC-b2fe4a0b-ec6b-4fb3-85e6-15511a38df6c.jpg"],
    "certificate17": ["Machine Learning A-Z: AI, Python & R", "Udemy", "15-04-2023", "UC-4d43f32c-97d6-4f32-954b-d6a7f9d3c140", "https://www.udemy.com/certificate/UC-4d43f32c-97d6-4f32-954b-d6a7f9d3c140/", "./assets/images/UC-4d43f32c-97d6-4f32-954b-d6a7f9d3c140.jpg"],
    "certificate18": ["Deep Learning A-Z 2024: Neural Networks, AI ", "Udemy", "16-09-2023", "UC-9a5b53f4-d539-4ff2-9c3c-12fc13cc9a6a", "https://www.udemy.com/certificate/UC-9a5b53f4-d539-4ff2-9c3c-12fc13cc9a6a/", "./assets/images/UC-9a5b53f4-d539-4ff2-9c3c-12fc13cc9a6a.jpg"],
    "certificate19": ["IBM Artificial Intelligence Analyst", "IBM", "07-07-2023", "5c8137f3e52b4c2f9294351c63715b44", "https://courses.ibmcep.cognitiveclass.ai/certificates/5c8137f3e52b4c2f9294351c63715b44", "./assets/images/5c8137f3e52b4c2f9294351c63715b44.jpg"],
    "certificate20": ["Industry Oriented Training on Embedded, IOT and Matlab", "Cranes Varsity", "17-09-2022", "A/WS/809/22-23", "https://viraj-paradkar.vercel.app/./assets/documents/certificate-14.pdf", "./assets/images/AWS80922-23.jpg"],
};

const certificatesContainer = document.getElementById('certificates');

Object.keys(certificatesMap).forEach(key => {
    let cert = certificatesMap[key];
    let certDiv = document.createElement('div');
    certDiv.className = 'certificate';
    certDiv.onclick = function() { window.open(cert[4], '_blank'); };
    
    let img = document.createElement('img');
    img.src = cert[5];
    img.alt = 'Certificate Image';

    let name = document.createElement('p');
    name.textContent = cert[0];

    let platform = document.createElement('p');
    platform.textContent = 'Platform: ' + cert[1];

    let id = document.createElement('p');
    id.textContent = 'ID: ' + cert[3];

    let date = document.createElement('p');
    date.textContent = 'Date: ' + cert[2];

    certDiv.style.backgroundColor = '#ffffff';
    certDiv.style.border = '1px solid #ccc';
    certDiv.style.borderRadius = '10px';
    certDiv.style.padding = '10px';
    certDiv.style.marginBottom = '10px';

    img.style.height = 'auto';
    img.style.display = 'block';
    img.style.margin = '0 auto';  // Center the image

    name.style.fontWeight = 'bold';
    name.style.color = '#333';

    platform.style.color = '#666';

    id.style.fontSize = '12px';
    id.style.color = '#777';

    date.style.fontSize = '12px';
    date.style.color = '#777';

    certDiv.appendChild(img);
    certDiv.appendChild(name);
    certDiv.appendChild(id);
    certDiv.appendChild(date);

    certificatesContainer.appendChild(certDiv);
});