let miImagen;

function preload() {
  // Logo de TECHO
miImagen = loadImage("https://upload.wikimedia.org/wikipedia/commons/e/e6/Logo_de_la_Organizaci%C3%B3n_TECHO.jpg");
}

function setup() {
createCanvas(800, 1000);
textAlign(CENTER, CENTER);
textFont("sans-serif");
}

function draw() {
background(230);
fill(0);

  // ---- PREGUNTA 1 ----


  // ---- PREGUNTA 2 ----

  // ---- TÍTULO DEL PROYECTO ----
textSize(20);
textStyle(BOLD);
text("Visualizando los Asentamientos Populares con TECHO", width / 2, 200);
textStyle(NORMAL);

  // ---- DESCRIPCIÓN DEL PROYECTO ----
textSize(15);
text(
    "El proyecto busca utilizar la tecnología y la visualización de datos \npara mostrar las condiciones de los asentamientos populares en México. \nA través de una aplicación interactiva, las personas podrán explorar \nmapas y gráficos sobre acceso a agua, energía, vivienda y educación, \nvisibilizando la desigualdad territorial y apoyando la defensa del territorio.",
    width / 2,
    270
);

  // ---- IMAGEN (LOGO TECHO) ----
const posterW = 300;
  const posterH = posterW * (1080 / 1920); // proporción del logo TECHO
image(miImagen, width / 2 - posterW / 2, 500, posterW, posterH);

  // ---- PIE DE PÁGINA ----
textSize(14);
text(
    "Proyecto enfocado en la defensa del territorio y el acceso equitativo a la vivienda digna.\nOrganización: TECHO México.",
    width / 2,
    500 + posterH + 40
);
}
