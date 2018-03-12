/* AnagramAnalysis
 * @param word1 Uma das palavras que serão comparadas.
 * @param word2 Uma das palavras que serão comparadas.
 * @param result Resultado da comparação (É anagrama ou não).
*/
class AnagramAnalysis {
  constructor(word1, word2, result) {
    this.word1 = word1;
    this.word2 = word2;
    this.result = result;
  }
}

// Verificar se existe alguma análise de anagrama no localStorage
// Exibir na view 'myTable' caso exista, criar um exemplo caso não exista.
window.onload = function() {
  var storedAnagramAnalysis = JSON.parse(localStorage.getItem("AnagramAnalysis"));
  if(!storedAnagramAnalysis) {
    var example = new AnagramAnalysis("EXAMPLE", "EAXPMEL", true);
    insertResultIntoTable(example);
    storedAnagramAnalysis = [example];
    localStorage.setItem("AnagramAnalysis", JSON.stringify(storedAnagramAnalysis));
  } else {
    var arrayLength = storedAnagramAnalysis.length;
    for (var i=arrayLength-1; i>=0; i--) {
      insertResultIntoTable(storedAnagramAnalysis[i]);
    }
  }
}

/* Função chamada pelo botão. Obtem duas strings dos campos 'word1' e 'word2',
   transforma em UpperCase, ordena os caracteres e compara as strings.
   O objeto AnagramAnalysis é inserido na view 'myTable' e no localStorage */
function anagramCheck() {
  var word1 = document.getElementById('word1').value;
  var word2 = document.getElementById('word2').value;
  var upperWord1 = word1.toUpperCase();
  var upperWord2 = word2.toUpperCase();
  var arrangedWord1 = putStringsInOrder(upperWord1);
  var arrangedWord2 = putStringsInOrder(upperWord2);
  var result = false;
  if(arrangedWord1 === arrangedWord2) {
    result = true;
  }
  var anagramAnalysis = new AnagramAnalysis(upperWord1, upperWord2, result);
  insertResultIntoTable(anagramAnalysis);
  insertResultIntoLocalStorage(anagramAnalysis);
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Quebra uma string em array, põe em ordem e junta em String novamente.
function putStringsInOrder(myString) {
  return myString.split('').sort().join('');
}

/* Insere uma nova linha no topo da tabela e adiciona o conteúdo à ela.
   Guia utilizado: https://www.w3schools.com/jsref/met_table_insertrow.asp */
function insertResultIntoTable(anagramAnalysis) {
  var table = document.getElementById("myTable");
  var row = table.insertRow(1);
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  cell0.innerHTML = anagramAnalysis.word1;
  cell1.innerHTML = anagramAnalysis.word2;
  if(anagramAnalysis.result) {
    cell2.innerHTML = "São anagramas";
  } else {
    cell2.innerHTML = "Não são anagramas"
  }
}

// Obtem o array armazenado em localStorage e adiciona um anagrama na posição 0.
function insertResultIntoLocalStorage(anagramAnalysis) {
  var storedAnagramAnalysis = JSON.parse(localStorage.getItem("AnagramAnalysis"));
  storedAnagramAnalysis.unshift(anagramAnalysis);
  localStorage.setItem("AnagramAnalysis", JSON.stringify(storedAnagramAnalysis));
}
