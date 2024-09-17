function navbar(sectionId) {
    var element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function projectOpen(url){
    window.open(url, target="_blank");
}