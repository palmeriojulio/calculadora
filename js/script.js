const form = document.querySelector("#form-media");
const inputs = [
  document.querySelector("#nota1"),
  document.querySelector("#nota2"),
  document.querySelector("#nota3"),
];
const erro = document.querySelector("#erro");
const resultadoVazio = document.querySelector("#resultado-vazio");
const resultado = document.querySelector("#resultado");
const media = document.querySelector("#media");
const situacao = document.querySelector("#situacao");
const mensagem = document.querySelector("#mensagem");
const limpar = document.querySelector("#limpar");

function obterNotas() {
  return inputs.map((input) => Number(input.value.replace(",", ".")));
}

function notasValidas(notas) {
  return notas.every((nota, index) =>
    inputs[index].value.trim() !== "" && Number.isFinite(nota) && nota >= 0 && nota <= 10
  );
}

function atualizarEstadoDeErro(mostrarErro) {
  erro.hidden = !mostrarErro;
  inputs.forEach((input) => {
    const nota = Number(input.value.replace(",", "."));
    const invalida = input.value.trim() === "" || !Number.isFinite(nota) || nota < 0 || nota > 10;
    input.classList.toggle("invalid", mostrarErro && invalida);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const notas = obterNotas();

  if (!notasValidas(notas)) {
    resultado.hidden = true;
    resultadoVazio.hidden = false;
    atualizarEstadoDeErro(true);
    return;
  }

  atualizarEstadoDeErro(false);
  const valor = (notas[0] + notas[1] + notas[2]) / 3;
  media.textContent = valor.toFixed(1).replace(".", ",");

  if (valor >= 7) {
    situacao.textContent = "Aprovado";
    mensagem.textContent = "Parabéns! Excelente resultado.";
  } else if (valor >= 5) {
    situacao.textContent = "Recuperação";
    mensagem.textContent = "Você está quase lá. Continue estudando.";
  } else {
    situacao.textContent = "Reprovado";
    mensagem.textContent = "Não desanime. Há sempre uma nova chance.";
  }

  resultadoVazio.hidden = true;
  resultado.hidden = false;
});

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9,.]/g, "").slice(0, 4);
    atualizarEstadoDeErro(false);
  });
});

limpar.addEventListener("click", () => {
  inputs.forEach((input) => {
    input.value = "";
    input.classList.remove("invalid");
  });
  erro.hidden = true;
  resultado.hidden = true;
  resultadoVazio.hidden = false;
  inputs[0].focus();
});
