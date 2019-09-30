// Typing animations
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10)
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        
        // Get full text of current word
        const fullTxt = this.words[current];
        
        // Check if deleting
        if(this.isDeleting){
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        // Insert txt-type element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 300;
        
        if(this.isDeleting){
            typeSpeed /= 2;
        }
        // Check if word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            // Pauses on complete
            typeSpeed= this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move onto next word
            this.wordIndex++;
            // Pause before next word
            typeSpeed = 500
        }
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

// Night Mode
function nightMode() {
    // Button variable
    const button = document.querySelector("#mynightmode");

    // Left half class variable
    const left = document.querySelector("body > div > div.left");

    // Right half class variable
    const right = document.querySelector("body > div > div.right");
    
    // If button checked replace CSS classes for night mode classes
    if (button.checked) {
      left.classList.replace("left-light", "left-night");
      right.classList.replace("right-light","right-night");
    } else {
      left.classList.replace("left-night", "left-light");
      right.classList.replace("right-night","right-light");
    }
}

function sendMessage() {
    document.querySelector(".sendbutton").innerHTML("Message sent. Thank you!")
}