async function buscaEndereco(cep){
  var msgErro = document.getElementById('erro');
  msgErro.innerHTML = "";

  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    var consultaCEPConvertida = await consultaCEP.json();

    if(consultaCEPConvertida.erro){
      throw Error('CEP não existente!');
    }

    var logradouro = document.getElementById('endereco');
    var bairro = document.getElementById('bairro');
    var cidade = document.getElementById('cidade');
    var estado = document.getElementById('estado');

    logradouro.value = consultaCEPConvertida.logradouro;
    bairro.value = consultaCEPConvertida.bairro;
    cidade.value = consultaCEPConvertida.localidade;
    estado.value = consultaCEPConvertida.uf;

    return consultaCEPConvertida;
  } catch (erro) {
    msgErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
  }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));