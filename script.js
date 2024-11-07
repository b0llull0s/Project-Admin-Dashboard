document.addEventListener('DOMContentLoaded', function() {
    const languageButton = document.querySelector('.header-buttons button');  
    const languageSelector = document.getElementById('language-selector');  
    const translateButton = document.getElementById('translate-button'); 
    const languageSelect = document.getElementById('language-select');  

    languageButton.addEventListener('click', function() {
        if (languageSelector.style.display === 'none' || languageSelector.style.display === '') {
            languageSelector.style.display = 'block';  
        } else {
            languageSelector.style.display = 'none';  
        }
    });

    translateButton.addEventListener('click', function() {
        const targetLanguage = languageSelect.value;  
        languageSelector.style.display = 'none';  
    });

    function translatePage(targetLanguage) {
        const elements = document.querySelectorAll('h1, h2, p, li, button, a');
        
        elements.forEach(element => {
            const originalText = element.textContent.trim();  
            if (originalText === "") return;  

            fetch('https://libretranslate.de/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: originalText,
                    source: 'en',  
                    target: targetLanguage  
                })
            })
            .then(response => response.json())
            .then(data => {
                element.textContent = data.translatedText;
            })
            .catch(error => {
                console.error('Translation error:', error);
            });
        });
    }
});
