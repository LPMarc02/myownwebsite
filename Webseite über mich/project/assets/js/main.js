//Variable für das Verhindern von zu vielen asyncgronen Abfragen 
let sidebar = document.querySelector('#nav'); 
let links;
let isLoading = false;

function loadPage(component) {
    if (isLoading) return; // Wenn eine Seite bereits geladen wird, breche ab. Ist wichtig, um den Browser vor einen Absturz durch viele Anfragen zu schützen

    isLoading = true;
    //HTML Inhalte in index.html reinladen
    fetch(`../project/${component}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.statusText})`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('HTML').innerHTML = data;
            initializeLinks();
        })
        .catch(error => {
            console.error(`Fehler beim Laden der Seite ${component}:`, error);
            document.getElementById('HTML').innerHTML = `<p>Fehler beim Laden der Seite: ${error.message}</p>`;
        })
        .finally(() => {
            isLoading = false; // Ladezustand zurücksetzen
        });
}

// Funktion zum Initialisieren der Links für den Fokus und das Laden der Komponente
function initializeLinks() {
    links = Array.from(document.querySelectorAll('#links a'));
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault(); 
            const component = event.currentTarget.getAttribute('data-page');
            loadPage(component);
        });
    });
}

// Initialisierung bei Laden der Seite und Startseite in index.html laden
document.addEventListener('DOMContentLoaded', () => {
    initializeLinks();
    loadPage('components/Übermich');
    console.log(links);
});

function SetImgActive(element1, element2, event) {
    if (element1.classList.contains('displaynone')) {
        element1.classList.remove('displaynone');
        element2.classList.add('displaynone');
    } else {
        element1.classList.add('displaynone');
        element2.classList.remove('displaynone');
    }
}

function SetSkillsActive(element1, event) {
    class1 = document.querySelector('.' + element1);
    if (class1.classList.contains('displaynone')) {
        document.querySelectorAll('.skills').forEach(el => el.classList.add('displaynone'));
        class1.classList.remove('displaynone');
    }
    else {
        document.querySelectorAll('.skills').forEach(el => el.classList.add('displaynone'));
    }
}