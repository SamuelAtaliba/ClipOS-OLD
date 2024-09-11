document.getElementById('reportForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const unidade = document.getElementById('unidade').value;
  const tecnico = document.getElementById('tecnico').value;
  const data = document.getElementById('data').value;
  const custos = document.getElementById('custos').value || "Não houveram custos";
  const chegada = document.getElementById('chegada').value;
  const saida = document.getElementById('saida').value;
  const supervisora = document.getElementById('supervisora').value;
  const feito = document.getElementById('feito').value;
  const pendente = document.getElementById('pendente').value || "Não houveram pendências";

  const entrada = new Date(`1970-01-01T${chegada}Z`);
  const saidaDate = new Date(`1970-01-01T${saida}Z`);
  const permanencia = (saidaDate - entrada) / (1000 * 60); // Convert to minutes

  const reportHTML = `
      <h2>Relatório de Ordem de Serviço</h2>
      <p><strong>Unidade:</strong> ${unidade}</p>
      <p><strong>Técnico:</strong> ${tecnico}</p>
      <p><strong>Data:</strong> ${new Date(data).toLocaleDateString('pt-BR')}</p>
      <p><strong>Custos:</strong> ${custos}</p>
      <p><strong>Horário de Chegada:</strong> ${chegada}</p>
      <p><strong>Horário de Saída:</strong> ${saida}</p>
      <p><strong>Tempo de Permanência:</strong> ${permanencia} minutos</p>
      <p><strong>Supervisor(a):</strong> ${supervisora}</p>
      <p><strong>O que foi feito:</strong> ${feito}</p>
      <p><strong>Pendências:</strong> ${pendente}</p>
  `;

  document.getElementById('report').innerHTML = reportHTML;
});

document.getElementById('copyButton').addEventListener('click', function () {
  const report = document.getElementById('report');
  if (report.innerText.trim() === "") {
      alert("Gere o relatório antes de copiá-lo.");
      return;
  }
  
  const range = document.createRange();
  range.selectNode(report);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  
  try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'Relatório copiado!' : 'Falha ao copiar relatório.';
      alert(msg);
  } catch (err) {
      alert('Falha ao copiar relatório.');
  }
  
  window.getSelection().removeAllRanges();
});
