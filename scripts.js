let codigos = JSON.parse(localStorage.getItem('tecnoGameCodigos')) || {};

function guardarEnStorage() {
    localStorage.setItem('tecnoGameCodigos', JSON.stringify(codigos));
}

function actualizarVista() {
    const lista = document.getElementById("lista");
    const contador = document.getElementById("contador");
    lista.innerHTML = "";
    contador.textContent = Object.keys(codigos).length;

    if (Object.keys(codigos).length === 0) {
        lista.innerHTML = `<p style="text-align:center;opacity:0.7;padding:30px;">Aún no hay códigos guardados</p>`;
        return;
    }

    for (const c in codigos) {
        lista.innerHTML += `<div class="fila"><b>${c}</b><span class="${codigos[c]==='Disponible' ? 'disp' : 'usado'}">${codigos[c]}</span></div>`;
    }
}

function guardar() {
    const v = document.getElementById("codNuevo").value.trim().toUpperCase();
    if (!v) return alert("⚠️ Ingresa un código");
    if (codigos[v]) return alert("⚠️ Ya existe");
    codigos[v] = "Disponible";
    guardarEnStorage();
    document.getElementById("codNuevo").value = "";
    actualizarVista();
    alert("✅ Código guardado correctamente");
}

function buscar() {
    const v = document.getElementById("codBuscar").value.trim().toUpperCase();
    const r = document.getElementById("resultado");
    if (!v) {
        r.textContent = "⚠️ Ingresa un código";
        r.style.background = "#503800";
        return;
    }
    if (codigos[v]) {
        r.textContent = `Estado: ${codigos[v]}`;
        r.style.background = codigos[v] === "Disponible" ? "#005c31" : "#503800";
    } else {
        r.textContent = "❌ No encontrado";
        r.style.background = "#503800";
    }
}

function marcarUsado() {
    const v = document.getElementById("codBuscar").value.trim().toUpperCase();
    if (!codigos[v]) return alert("❌ Este código no existe");
    if (codigos[v] === "Usado") return alert("ℹ️ Ya está marcado como usado");
    if (confirm(`¿Marcar ${v} como USADO?`)) {
        codigos[v] = "Usado";
        guardarEnStorage();
        buscar();
        actualizarVista();
        alert("✅ Marcado como usado");
    }
}

actualizarVista();