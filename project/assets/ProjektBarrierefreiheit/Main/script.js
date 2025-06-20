//Variablen Navigationsleiste
let btn = document.querySelector('#openSide'); 
let sidebar = document.querySelector('#sidebar'); 
let links; 
let currentIndex = 0; 

//Variable für das Verhindern von zu vielen asyncgronen Abfragen
let isLoading = false;

// Funktion zum Umschalten der Navigationsleiste
function toggleSidebar() {
    sidebar.classList.toggle('active');
    
    if (sidebar.classList.contains('active')) {
        focusFirstElement();
    } else {
        removeFocusFromElement(links[currentIndex]);
    }
}

// Funktion, um das erste Element zu fokussieren
function focusFirstElement() {
    currentIndex = 0;
    if (links.length > 0) {
        links[currentIndex].focus();
    }
}

function removeFocusFromElement(element) {
    if (element) {
        element.blur();
    }
}

// Klick-Event für das öffnen der Navigationsleiste
btn.onclick = toggleSidebar;

// Tastaturbedienbarkeit Navigationsleiste
document.addEventListener('keydown', function(event) {
    if (sidebar.classList.contains('active')) {
        switch (event.key) {
            case 'Escape':
                toggleSidebar();
                console.log(links);
                
                break;
            case 'ArrowDown':
                navigateLinks(1);
                break;
            case 'ArrowUp':
                navigateLinks(-1);
                break;
            case 'Enter':
                links[currentIndex].click();
                toggleSidebar();
                break;
        }
    } else if (event.key == 'Escape') {
        toggleSidebar();
    }
    // Tastaturbedienbarkeit der Links/ Webinhalte
    const keyMapping = {
        'g': 0,
        'w': 1,
        't': 2,
        'a': 3,
        'f': 4,
        'l': 5,
        's': 6
    };
    
    if (keyMapping.hasOwnProperty(event.key)) {
        const index = keyMapping[event.key];
        if (index >= 0 && index < links.length) {
            links[index].click();
        }
    }
});

// Funktion zum Navigieren durch die Links
function navigateLinks(direction) {
    if (links.length === 0) return;
    links[currentIndex].blur();
    currentIndex = (currentIndex + direction + links.length) % links.length;
    links[currentIndex].focus();
}

function loadPage(component) {
    if (isLoading) return; // Wenn eine Seite bereits geladen wird, breche ab. Ist wichtig, um den Browser vor einen Absturz durch viele Anfragen zu schützen

    isLoading = true;
    //HTML Inhalte in index.html reinladen
    fetch(`../${component}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.statusText})`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('sidebarContainer').innerHTML = data;
            initializeLinks();
            sidebar.classList.remove('active');
        })
        .catch(error => {
            console.error(`Fehler beim Laden der Seite ${component}:`, error);
            document.getElementById('sidebarContainer').innerHTML = `<p>Fehler beim Laden der Seite: ${error.message}</p>`;
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

document.addEventListener('click', function(event) {
    // Überprüfen, ob der Klick innerhalb der Sidebar war
    if (sidebar.classList.contains('active') && !sidebar.contains(event.target) && event.target !== btn) {
        toggleSidebar();
    }
});


// Initialisierung bei Laden der Seite und Startseite in index.html laden
document.addEventListener('DOMContentLoaded', () => {
    loadPage('Startseite/startseite');
    initializeLinks();
    console.log(links);
});

//Funktionalität für den Wechsel zwischen White und Dark Mode
document.addEventListener("DOMContentLoaded", function() {
    const toggleSwitch = document.querySelector("#modeToggleButton");
    const body = document.body;
    const sidebarContainer = document.getElementById('sidebarContainer');
    const sidebar = document.getElementById('sidebar');
    const moonIcon = document.createElement('i');
    moonIcon.classList.add('bx', 'bx-moon');
    const sunIcon = document.createElement('i');
    sunIcon.classList.add('bx', 'bx-sun');
    toggleSwitch.appendChild(moonIcon);
    toggleSwitch.appendChild(sunIcon);

    toggleSwitch.addEventListener("click", function() {
        body.classList.toggle("dark-mode");
        body.classList.toggle("light-mode");

        if (body.classList.contains("dark-mode")) {
            moonIcon.style.display = "none";
            sunIcon.style.display = "block";
        } else {
            moonIcon.style.display = "block";
            sunIcon.style.display = "none";
        }
    });

    if (body.classList.contains("dark-mode")) {
        moonIcon.style.display = "none";
        sunIcon.style.display = "block";
    } else {
        moonIcon.style.display = "block";
        sunIcon.style.display = "none";
    }
    //Tastaturbedienbarkeit White und Dark-Mode d
    document.addEventListener('keydown', function(event) {
        if(event.key==='d'){
            body.classList.toggle("dark-mode");
            body.classList.toggle("light-mode");

        if (body.classList.contains("dark-mode")) {
            moonIcon.style.display = "none";
            sunIcon.style.display = "block";
        } else {
            moonIcon.style.display = "block";
            sunIcon.style.display = "none";
        }
        }
    
    });
});

//Tastaturbedienbarkeit PDF-Benutzerhandbuch o
document.addEventListener('keydown', function(event){
    let pdf = document.querySelector('#pdf a');
    console.log(pdf);
    if(event.key=='o'&&pdf!=null){
        pdf.click();
    }

});

//Funktion zum verändern der CSS Schriftgröße-Variablen
function setFontSize(size) {
    document.documentElement.style.setProperty('--base-font-size', size + 'px');
    document.getElementById('fontSizeSlider').value = size;
}
//Verändern der Schriftgröße 
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('fontSizeSlider');
    const initialFontSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size'));
    slider.value = initialFontSize;

    slider.addEventListener('input', function() {
        setFontSize(this.value);
    });
    //Tastaturbedienbarkeit Schriftgröße + und -
    document.addEventListener('keydown', function(event) {
        const currentSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size'));
        if (event.key === '+') {
            setFontSize(currentSize + 1);
        }
        if (event.key === '-') {
            setFontSize(currentSize - 1);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const detailsElements = document.querySelectorAll('details');
    
    detailsElements.forEach(details => {
      const summary = details.querySelector('summary');
      summary.addEventListener('click', function() {
        detailsElements.forEach(d => {
          if (d !== details) {
            d.removeAttribute('open');
          }
        });
      });
    });
});



  

