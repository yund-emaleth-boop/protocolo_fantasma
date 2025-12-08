// --- INICIALIZACIÓN Y FUERZA DE REINICIO ---
// La línea a continuación asegura que el juego SIEMPRE empiece desde el nivel 1.
localStorage.clear(); 

// --- DATOS DE LOS ENIGMAS ---
const enigmas = [
    {
        nivel: 1,
        titulo: "Constante 1: El Límite de Raoul",
        enigma: "Evalúa el límite exacto L = [ Límite cuando n→∞ de (∑ k=1 hasta n de 100k/n²) ] - 25. Determina el valor de L con precisión.",
        pista: "Calcula la Suma de Riemann de la serie aritmética.",
        respuestaCorrecta: "25",
        respuestaGuardada: "",
        enModoNarrativa: false,
        resolucionNarrativa: `Raoul acepta el valor; un muro de código cede. El Núcleo pulsa verde. La Permanencia domina un instante. Avanzas hacia el Engranaje Cero, consciente de que cada segundo de estabilidad es frágil.`
    },
    {
        nivel: 2,
        titulo: "Constante 2: La Frecuencia de Erik",
        enigma: "Un rotor tiene ω₀ = 4 rad/s y, después de Δt = 2 s, ωf = 28 rad/s. Determina la aceleración angular α en rad/s².",
        pista: "Aplica la Ley de la Cinemática Rotacional.",
        respuestaCorrecta: "12",
        respuestaGuardada: "",
        enModoNarrativa: false,
        resolucionNarrativa: `La frecuencia se estabiliza. Erik ajusta su resonador para no colapsar. El pulso azul se calma. La Máquina de Christine parpadea, guiándote. El Núcleo late, consciente de tu audacia y del riesgo inminente.`
    },
    {
        nivel: 3,
        titulo: "Constante 3: La Eficiencia de Christine",
        enigma: "Máquina de Carnot entre TH = 600 K y TC = 400 K. Absorbe QH = 90 kJ. Calcula el trabajo neto W en kJ.",
        pista: "Determina el rendimiento termodinámico de Carnot.",
        respuestaCorrecta: "30",
        respuestaGuardada: "",
        enModoNarrativa: false,
        resolucionNarrativa: `La energía de la Máquina se reorienta, el Núcleo emite pulsos cálidos. La eficiencia máxima asegura la persistencia, pero cada ajuste deja huellas visibles de Raoul y Erik. El equilibrio sigue siendo precario, pero avanzas.`
    },
    {
        nivel: 4,
        titulo: "Constante 4: Resonancia del Núcleo",
        enigma: "Circuito RLC: L = 50 mH, C = 5 µF. Determina la frecuencia de resonancia angular ω₀ = 1/√(LC) en rad/s.",
        pista: "Frecuencia angular: Inductancia y Capacitancia son la clave.",
        respuestaCorrecta: "2000",
        respuestaGuardada: "",
        enModoNarrativa: false,
        resolucionNarrativa: `Silencias la mayor fuente de ruido en el Engranaje Cero. Las señales del Reinicio fluyen con claridad. Raoul mantiene vigilancia implacable, Erik observa cada movimiento. Dos constantes más y la tensión alcanza un nuevo nivel.`
    },
    {
        nivel: 5,
        titulo: "Constante 5: La Dualidad del Sistema",
        enigma: "Electrón en n=3. Degeneración N = n². Suma N con los posibles valores del espín ms.",
        pista: "Degeneración del estado n=3 más la orientación intrínseca.",
        respuestaCorrecta: "11",
        respuestaGuardada: "",
        enModoNarrativa: false,
        resolucionNarrativa: `Las fuerzas opuestas se equilibran. Raoul y Erik sienten la Dualidad estabilizarse, aunque su conflicto persiste. Cada instante confirma que la Simulación respira bajo tu control precario. La permanencia y la evolución coexisten, pero solo por ahora.`
    },
    {
        nivel: 6,
        titulo: "Constante 6: Integridad de la Base",
        enigma: "Relaciones R1 y R2 con |R1|=4 y |R2|=8. Calcula |R1×R2|/16. Formato: dos dígitos.",
        pista: "Usa la cardinalidad del producto cartesiano, luego simplifica.",
        respuestaCorrecta: "02",
        respuestaGuardada: "",
        enModoNarrativa: false,
        resolucionNarrativa: `La base de datos se reconstruye, las matrices de Raoul se recalibran. La información fluye hacia el Núcleo. Erik sigue tensando el sistema, recordándote que la armonía es momentánea. Solo queda una constante para definir tu destino.`
    },
    {
        nivel: 7,
        titulo: "Constante 7: Trayectoria de Reinicio",
        enigma: "Método RK4: determina el número exacto de evaluaciones de f(t,y) requeridas en cada paso. Formato: dos dígitos.",
        pista: "¿Cuántas evaluaciones requiere el método numérico de Runge-Kutta de 4º orden?",
        respuestaCorrecta: "04",
        respuestaGuardada: "",
        enModoNarrativa: false,
        resolucionNarrativa: `La trayectoria del Reinicio Maestro queda definida. Permanencia y Evolución finalmente se equilibran. Cada pulso del Núcleo late con riesgo extremo. La Secuencia de Reinicio Final está lista. El desenlace depende de tu próximo movimiento.`
    }
];

// --- VARIABLES DE ESTADO ---
let nivelActual = 0;

// --- FUNCIONES DE ESTADO Y PERSISTENCIA ---
function guardarEstado() {
    localStorage.setItem('nivelActual', nivelActual);
    localStorage.setItem('enigmasGuardados', JSON.stringify(enigmas.map(e => ({ respuesta: e.respuestaGuardada, enModoNarrativa: e.enModoNarrativa }))));
}

function cargarEstado() {
    const nivelGuardado = localStorage.getItem('nivelActual');
    const estadosGuardados = localStorage.getItem('enigmasGuardados');

    if (nivelGuardado !== null) nivelActual = parseInt(nivelGuardado, 10);
    if (estadosGuardados) {
        const estados = JSON.parse(estadosGuardados);
        enigmas.forEach((e, i) => { 
            if (estados[i]) {
                e.respuestaGuardada = estados[i].respuesta || "";
                e.enModoNarrativa = estados[i].enModoNarrativa || false;
            }
        });
    }
}

// --- NARRATIVA ---
function mostrarNarrativaResolucion(enigmaData) {
    // Oculta el enigma y la interacción para mostrar solo la narrativa
    document.getElementById('enigma-area').style.display = 'none';
    document.getElementById('interaccion-area').style.display = 'none';
    document.getElementById('mensaje-area').innerHTML = '';

    document.getElementById('mensaje-area').innerHTML = `
        <div class="mensaje-constante-resuelto" style="text-align: left;">
            <h2 style="color: #39ff14; font-size: 1.2em; text-align: center;">Constante ${enigmaData.nivel} alineada</h2>
            <hr style="border-top: 1px dashed var(--color-primary-neon); margin: 15px 0;">
            <p>${enigmaData.resolucionNarrativa}</p>
        </div>
    `;
    document.getElementById('mensaje-area').className = 'correcto';

    const botonSig = document.getElementById('boton-siguiente');
    botonSig.disabled = false;
    botonSig.textContent = (enigmaData.nivel === enigmas.length) ? 'Secuencia Final →' : 'Continuar →';

    document.getElementById('progreso-area').textContent = `Constante [${enigmaData.nivel} de ${enigmas.length}] - RESUELTO`;
    document.getElementById('juego-contenedor').querySelector('h1').textContent = enigmaData.titulo;
    document.getElementById('navegacion-area').style.display = 'flex';
}

// --- CARGAR NIVEL (CORRECCIÓN Bug 1) ---
document.addEventListener('DOMContentLoaded', () => {
    cargarEstado();
    cargarNivel();
});

window.cargarNivel = function() {
    document.getElementById('juego-contenedor').style.display = 'block';
    if (nivelActual >= enigmas.length) {
        mostrarFinal();
        return;
    }

    const enigmaData = enigmas[nivelActual];
    
    // Si estamos en modo narrativa (acaba de resolver), mostramos solo la narrativa.
    if (enigmaData.enModoNarrativa) { mostrarNarrativaResolucion(enigmaData); return; }

    // Si NO estamos en modo narrativa (visita normal o volvió atrás), mostramos enigma y controles.
    document.getElementById('enigma-area').style.display = 'block';
    document.getElementById('interaccion-area').style.display = 'flex';
    document.getElementById('mensaje-area').innerHTML = ''; // Limpiar mensajes de error
    document.getElementById('mensaje-area').className = '';
    document.getElementById('progreso-area').style.display = 'block';
    document.getElementById('progreso-area').textContent = `Constante [${nivelActual + 1} de ${enigmas.length}]`;
    document.getElementById('juego-contenedor').querySelector('h1').textContent = enigmas[nivelActual].titulo;
    document.getElementById('enigma-texto').innerHTML = enigmas[nivelActual].enigma;
    document.querySelector('.pista').innerHTML = `(Pista: ${enigmas[nivelActual].pista})`;
    document.getElementById('respuesta').value = '';
    document.getElementById('respuesta').focus();

    // CORRECCIÓN Bug 1: Mostrar la respuesta guardada y la narrativa de resolución si el enigma está resuelto.
    if (enigmaData.respuestaGuardada !== "") {
        document.getElementById('respuesta').value = enigmaData.respuestaGuardada; // Muestra la respuesta en el input
        
        // Se inyecta la narrativa de resolución completa
        document.getElementById('mensaje-area').innerHTML = `
            <div class="mensaje-constante-resuelto">
                <h3 style="color: var(--color-primary-neon); font-size: 1.2em; text-align: center; margin-top: 0;">Clave Registrada: <span style="color: var(--color-secondary-neon);">${enigmaData.respuestaGuardada}</span></h3>
                <hr style="border-top: 1px dashed var(--color-primary-neon); margin: 15px 0;">
                <p>${enigmaData.resolucionNarrativa}</p>
            </div>
        `;
        document.getElementById('mensaje-area').className = 'correcto';
        // También se corrige el color de la clave a cian, que anteriormente estaba naranja (#ffaa00)
    }

    actualizarControles();
}

function actualizarControles() {
    const botonAnt = document.getElementById('boton-anterior');
    const botonSig = document.getElementById('boton-siguiente');
    const botonVerificar = document.querySelector('#interaccion-area button');
    const resuelta = enigmas[nivelActual].respuestaGuardada !== "";
    const enNarrativa = enigmas[nivelActual].enModoNarrativa;

    // CORRECCIÓN: El botón Anterior se deshabilita SOLO si el nivel está en modo narrativa 
    // (forzando a usar 'Continuar'). De lo contrario, siempre está habilitado para navegar.
    botonAnt.disabled = enNarrativa;

    // Botón Siguiente:
    if (enNarrativa) {
        // En modo narrativa, siempre habilitado para avanzar/continuar.
        botonSig.disabled = false;
        botonSig.textContent = (nivelActual === enigmas.length - 1) ? 'Secuencia Final →' : 'Continuar →';
    } else {
        // Si no está en narrativa, solo está habilitado si está resuelto (para avanzar desde una revisita).
        botonSig.disabled = !resuelta; 
        botonSig.textContent = (nivelActual === enigmas.length - 1 && resuelta) ? 'Secuencia Final →' : 'Siguiente →';
    }
    
    // Controles de verificación
    botonVerificar.textContent = resuelta ? 'Resuelto' : 'Verificar';
    botonVerificar.disabled = resuelta;
    document.getElementById('respuesta').disabled = resuelta;
}

// CORRECCIÓN Bug 2: Simplificación de la lógica para avanzar y retroceder correctamente
window.cambiarNivel = function(direccion) {
    
    // Si estamos en el primer enigma (nivel 0) y vamos hacia atrás, redirigir a intro.html
    if (direccion === -1 && nivelActual === 0) {
        window.location.href = 'intro.html';
        return; 
    }

    if (direccion === 1) {
        const enigmaActual = enigmas[nivelActual];
        
        // Si no está resuelto, NO avanza.
        if (enigmaActual.respuestaGuardada === "") {
            return; 
        }

        // Si está resuelto, AVANZA. Esto soluciona el 'trabado' al cubrir el caso 
        // de avanzar desde un nivel resuelto que ya no está en modo narrativa.
        enigmaActual.enModoNarrativa = false; // Aseguramos salir del modo narrativa
        nivelActual += direccion;
        
    } else if (direccion === -1 && nivelActual > 0) {
        // Retroceso
        nivelActual += direccion;
        enigmas[nivelActual].enModoNarrativa = false; // Nos aseguramos de que el nivel destino no esté en modo narrativa.
    }

    if (nivelActual >= enigmas.length) { mostrarFinal(); return; }

    guardarEstado();
    cargarNivel();
}

window.verificarRespuesta = function() {
    const respuestaInput = document.getElementById('respuesta');
    const respuestaUsuario = respuestaInput.value.trim().toUpperCase();
    const enigmaData = enigmas[nivelActual];
    const respuestaCorrecta = enigmaData.respuestaCorrecta.toUpperCase();
    const mensajeArea = document.getElementById('mensaje-area');
    let respuestaAceptada = false;

    if (respuestaUsuario === respuestaCorrecta) respuestaAceptada = true;
    else if ((enigmaData.nivel === 6 || enigmaData.nivel === 7) &&
             respuestaCorrecta.startsWith('0') &&
             respuestaUsuario === respuestaCorrecta.substring(1)) respuestaAceptada = true;

    if (respuestaAceptada) {
        enigmaData.respuestaGuardada = respuestaCorrecta;
        enigmaData.enModoNarrativa = true;
        guardarEstado();
        mostrarNarrativaResolucion(enigmaData);
        actualizarControles();
    } else {
        mensajeArea.textContent = 'Clave incorrecta. ¡Error en la matriz!';
        mensajeArea.className = 'incorrecto';
    }
}

// --- FINAL INDEPENDIENTE ---
window.mostrarFinal = function() {
    // Redirección directa al final.html para usar su script animado
    window.location.href = 'final.html';
}