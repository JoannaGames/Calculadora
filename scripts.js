document.addEventListener("DOMContentLoaded", () => {
    const display = document.querySelector("#display");
    const buttons = document.querySelectorAll("#calculadoraAritmetica button");
    const menuButtons = document.querySelectorAll("#menu button");
    const calculadoraAritmetica = document.querySelector("#calculadoraAritmetica");
    const calculadoraGeometrica = document.querySelector("#calculadoraGeometrica");
    const figuraSelect = document.querySelector("#figura");
    const inputsGeometria = document.querySelector("#inputsGeometria");
    const resultadoGeometria = document.querySelector("#resultadoGeometria");

    // Mostrar la calculadora seleccionada
    menuButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            calculadoraAritmetica.classList.add("hidden");
            calculadoraGeometrica.classList.add("hidden");
            if (btn.id === "btnAritmetica") {
                calculadoraAritmetica.classList.remove("hidden");
            } else {
                calculadoraGeometrica.classList.remove("hidden");
                actualizarInputsGeometria();
            }
        });
    });

    // Lógica de la calculadora aritmética
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.id;
            if (id === "=") {
                try {
                    display.value = eval(display.value);
                } catch {
                    display.value = "Error";
                }
            } else if (id === "ac") {
                display.value = "";
            } else if (id === "de") {
                display.value = display.value.slice(0, -1);
            } else {
                display.value += id;
            }
        });
    });

    // Lógica para la calculadora geométrica
    figuraSelect.addEventListener("change", actualizarInputsGeometria);
    document.querySelector("#calcularGeometria").addEventListener("click", calcularGeometria);

    function actualizarInputsGeometria() {
        inputsGeometria.innerHTML = "";
        const figura = figuraSelect.value;
        if (figura === "triangulo") {
            inputsGeometria.innerHTML = `
                <input type="number" id="base" placeholder="Base" min="0" required>
                <input type="number" id="altura" placeholder="Altura" min="0" required>
            `;
        } else if (figura === "circulo") {
            inputsGeometria.innerHTML = `<input type="number" id="radio" placeholder="Radio" min="0" required>`;
        } else if (figura === "cubo") {
            inputsGeometria.innerHTML = `<input type="number" id="lado" placeholder="Lado" min="0" required>`;
        }
    }

    function calcularGeometria() {
        const figura = figuraSelect.value;
        let resultado = "";

        if (figura === "triangulo") {
            const base = parseFloat(document.querySelector("#base").value);
            const altura = parseFloat(document.querySelector("#altura").value);
            resultado = `Área: ${(base * altura) / 2}`;
        } else if (figura === "circulo") {
            const radio = parseFloat(document.querySelector("#radio").value);
            resultado = `Área: ${(Math.PI * radio ** 2).toFixed(2)}`;
        } else if (figura === "cubo") {
            const lado = parseFloat(document.querySelector("#lado").value);
            resultado = `Volumen: ${(lado ** 3).toFixed(2)}`;
        }

        resultadoGeometria.textContent = resultado || "Entradas inválidas.";
    }
});
