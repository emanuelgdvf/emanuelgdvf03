function toggleDropdown() {
  document.getElementById('dropdown').classList.toggle('open');
}

document.addEventListener('click', function(e) {
  if (!e.target.closest('.btn-acessibilidade') && !e.target.closest('.dropdown')) {
    document.getElementById('dropdown').classList.remove('open');
  }
});

const filters = {
  none:          '',
  protanopia:    'url(#protanopia)',
  deuteranopia:  'url(#deuteranopia)',
  tritanopia:    'url(#tritanopia)',
  achromatopsia: 'url(#achromatopsia)',
};

const labels = {
  none:          '',
  protanopia:    'Filtro ativo: Protanopia',
  deuteranopia:  'Filtro ativo: Deuteranopia',
  tritanopia:    'Filtro ativo: Tritanopia',
  achromatopsia: 'Filtro ativo: Achromatopsia (preto e branco)',
};

function setFilter(name, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.body.style.filter = filters[name];
  const label = document.getElementById('filter-label');
  if (name === 'none') {
    label.classList.remove('show');
  } else {
    label.textContent = labels[name];
    label.classList.add('show');
  }
  document.getElementById('dropdown').classList.remove('open');
}
// ===== CATÁLOGO IA =====
const catalogoDados = [
  { id:'palh', nome:'Palheiros', cat:'Restaurante', tags:['almoço','refeição','comida','restaurante','prato feito','frango','carne','comida caseira'], insta:'https://instagram.com/palheirosrestaurante', zap:'https://wa.me/5584994040800', loca:'https://maps.google.com/?cid=6112973312867157753' },
  { id:'espe', nome:'Espeto de Ouro', cat:'Churrascaria', tags:['espeto','churrasco','carne','assado','churrascaria','frango','linguiça'], insta:'https://instagram.com/espetodeouro', zap:'https://wa.me/5584996060600', loca:'https://maps.google.com/?cid=430885642499483640' },
  { id:'novo', nome:'Novo Sabor', cat:'Petiscaria', tags:['petisco','tira-gosto','cerveja','porção','aperitivo','frango','camarão'], insta:'https://instagram.com/petiscaria_novo_sabor_', zap:'https://wa.me/5584994208328', loca:'' },
  { id:'aabb', nome:'AABB', cat:'Restaurante', tags:['restaurante','almoço','refeição','buffet','jantar','comida','eventos'], insta:'https://instagram.com/aabbapodi', zap:'https://wa.me/5584996340129', loca:'https://maps.google.com/?cid=13606427193244036249' },
  { id:'lamp', nome:'Lamparina', cat:'Pizzaria', tags:['pizza','pizzaria','massa','queijo','italiana','mozzarella','calabresa'], insta:'https://instagram.com/pizzaria_lamparina', zap:'https://wa.me/5584933332925', loca:'https://maps.app.goo.gl/42h5pPZNM7WsLEEC8' },
  { id:'espi', nome:'Espetinho Praxedes', cat:'Espetinho', tags:['espetinho','espeto','carne','frango','linguiça','assado'], insta:'https://instagram.com/espetinhopraxedes', zap:'', loca:'https://maps.app.goo.gl/u3nWQcjSMaRXNU7w7' },
  { id:'case', nome:'Gostinho Caseiro', cat:'Comida Caseira', tags:['comida caseira','marmita','feijão','arroz','frango','carne','almoço','simples'], insta:'https://instagram.com/gostinho_caseiroo', zap:'https://wa.me/5584991480186', loca:'' },
  { id:'para', nome:'Paraíba Salgados', cat:'Salgados', tags:['salgado','coxinha','risole','esfirra','lanche rápido','salgadinho'], insta:'https://instagram.com/paraiba_salgados_apodi', zap:'https://wa.me/5584996469958', loca:'' },
  { id:'dssa', nome:'DS Salgados', cat:'Salgados & Bolos', tags:['salgado','bolo','coxinha','festa','doce','sobremesa','encomenda'], insta:'https://instagram.com/delivery_salgadosbolos', zap:'https://wa.me/55849494343813', loca:'' },
  { id:'chur', nome:'Churrascaria Apodi', cat:'Churrascaria', tags:['churrasco','carne','assado','picanha','costela','frango','espeto'], insta:'https://instagram.com/churrascariaapodi', zap:'https://wa.me/5584999663385', loca:'' },
  { id:'mati', nome:'Pastelaria Matias', cat:'Pastelaria', tags:['pastel','pastelaria','frito','queijo','carne','frango','salgado'], insta:'https://instagram.com/pastelaria_matias', zap:'https://wa.me/5584994242757', loca:'' },
  { id:'reil', nome:'Rei do Lanche', cat:'Lanchonete', tags:['lanche','hamburguer','hot dog','sanduíche','batata','rápido','x-burguer'], insta:'https://instagram.com/oreidolanchepizzariaoficial', zap:'https://wa.me/5584991915772', loca:'https://maps.google.com/?cid=10914834443010279695' },
  { id:'dgus', nome:'Dgust', cat:'Restaurante', tags:['restaurante','almoço','refeição','comida','prato','jantar'], insta:'https://instagram.com/dgustapodi', zap:'https://wa.me/5584991547056', loca:'' },
];

function catalogoPreencher(texto) {
  document.getElementById('cat-input').value = texto;
  document.getElementById('cat-input').focus();
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('cat-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); catalogoBuscar(); }
    });
  }
});

function catMostrar(id) { document.getElementById(id).classList.add('show'); }
function catEsconder(id) { document.getElementById(id).classList.remove('show'); }

function catIniciais(nome) {
  return nome.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase();
}

async function catalogoBuscar() {
  const input = document.getElementById('cat-input');
  const query = input.value.trim();
  if (!query) return;

  const btn = document.getElementById('cat-btn');
  btn.disabled = true;

  catEsconder('cat-answer');
  catEsconder('cat-empty');
  catEsconder('cat-error');
  document.getElementById('cat-grid').innerHTML = '';
  catMostrar('cat-loading');

  const prompt = `Você é o assistente do GAC (Guia Apodi Connect), guia de restaurantes de Apodi-RN, Brasil.

O usuário disse: "${query}"

Restaurantes disponíveis:
${catalogoDados.map(r => `- ${r.nome} (${r.cat}): ${r.tags.slice(0,5).join(', ')}`).join('\n')}

Selecione os mais relevantes e responda em JSON puro (sem markdown, sem backtick):
{
  "resumo": "frase curta e animada com a recomendação (máx 2 linhas, mencione os nomes)",
  "restaurantes": [
    { "id": "id_do_restaurante", "motivo": "frase curta do porquê" }
  ]
}

IDs válidos: palh, espe, novo, aabb, lamp, espi, case, para, dssa, chur, mati, reil, dgus
Se nenhum combinar, retorne restaurantes: []`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await res.json();
    const raw = data.content?.find(b => b.type === 'text')?.text || '{}';
    const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());

    catEsconder('cat-loading');

    if (parsed.resumo) {
      document.getElementById('cat-answer-text').innerHTML = parsed.resumo.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      catMostrar('cat-answer');
    }

    const recs = parsed.restaurantes || [];
    if (recs.length > 0) {
      const grid = document.getElementById('cat-grid');
      recs.forEach((rec, i) => {
        const r = catalogoDados.find(x => x.id === rec.id);
        if (!r) return;
        const card = document.createElement('div');
        card.className = 'cat-card';
        card.style.animationDelay = `${i * 0.08}s`;
        card.innerHTML = `
          <div class="cat-initials">${catIniciais(r.nome)}</div>
          <div class="cat-nome">${r.nome}</div>
          <div class="cat-motivo">${rec.motivo}</div>
          <div class="cat-links">
            ${r.insta ? `<a href="${r.insta}" target="_blank" class="cat-link insta">📸 Insta</a>` : ''}
            ${r.zap  ? `<a href="${r.zap}"  target="_blank" class="cat-link zap">💬 Zap</a>` : ''}
            ${r.loca ? `<a href="${r.loca}" target="_blank" class="cat-link">🗺️ Mapa</a>` : ''}
          </div>`;
        grid.appendChild(card);
      });
    } else {
      catMostrar('cat-empty');
    }

  } catch(err) {
    catEsconder('cat-loading');
    catMostrar('cat-error');
  }

  btn.disabled = false;
  input.value = '';
}