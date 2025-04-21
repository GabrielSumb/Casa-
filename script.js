// Tab functionality
const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");

for (let i = 0; i < botoes.length; i++) {
    botoes[i].onclick = function () {
        for (let j = 0; j < botoes.length; j++) {
            botoes[j].classList.remove("ativo");
            textos[j].classList.remove("ativo");
        }
        botoes[i].classList.add("ativo");
        textos[i].classList.add("ativo");
    }
}

// Countdown timers
const contadores = document.querySelectorAll(".contador");
const tempoObjetivo1 = new Date("2025-10-05T00:00:00"); // ENEM/vestibular
const tempoObjetivo2 = new Date("2025-12-22T00:00:00"); // Fim do ensino médio
const tempoObjetivo3 = new Date("2026-02-28T00:00:00"); // Ingresso na faculdade
const tempoObjetivo4 = new Date("2035-02-01T00:00:00"); // Conquistar uma casa

const tempos = [tempoObjetivo1, tempoObjetivo2, tempoObjetivo3, tempoObjetivo4];

function calculaTempo(tempoObjetivo) {
    const tempoAtual = new Date();
    let tempoFinal = tempoObjetivo - tempoAtual;
    
    if (tempoFinal <= 0) {
        return [0, 0, 0, 0];
    }
    
    let segundos = Math.floor(tempoFinal / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    segundos %= 60;
    minutos %= 60;
    horas %= 24;
    
    return [dias, horas, minutos, segundos];
}

function atualizaCronometro() {
    for (let i = 0; i < contadores.length; i++) {
        const tempo = calculaTempo(tempos[i]);
        document.getElementById("dias" + i).textContent = tempo[0];
        document.getElementById("horas" + i).textContent = tempo[1];
        document.getElementById("min" + i).textContent = tempo[2];
        document.getElementById("seg" + i).textContent = tempo[3];
    }
}

function comecaCronometro() {
    atualizaCronometro();
    setInterval(atualizaCronometro, 1000);
}

// Theme switcher functionality
const themeToggle = document.getElementById('theme-toggle');

function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Default to dark theme
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update button aria-label
    themeToggle.setAttribute('aria-label', 
        newTheme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start countdowns
    comecaCronometro();
    
    // Set up theme
    setInitialTheme();
    
    // Add event listeners
    themeToggle.addEventListener('click', toggleTheme);
    
    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});
