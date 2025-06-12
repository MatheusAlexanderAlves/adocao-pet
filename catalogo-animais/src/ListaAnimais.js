import React from "react";

function ListaAnimais({ animais, setAnimais }) {
  // Função para remover o pet
  const removerAnimal = (index) => {
    // Remove o animal da lista de estado
    const novosAnimais = animais.filter((_, i) => i !== index);
    setAnimais(novosAnimais); // Atualiza o estado

    // Remove o animal do LocalStorage
    localStorage.setItem("animais", JSON.stringify(novosAnimais));
  };

  // Função para adotar o pet
  const adotarAnimal = (index) => {
    // Encontrar o animal a ser adotado
    const animalAdotado = animais[index];
    animalAdotado.status = "Adotado"; // Marca o status como "Adotado"

    // Atualizar o estado com a lista de animais
    const novosAnimais = [...animais];
    novosAnimais[index] = animalAdotado; // Atualiza o animal no estado

    setAnimais(novosAnimais); // Atualiza o estado
    localStorage.setItem("animais", JSON.stringify(novosAnimais)); // Atualiza o LocalStorage

    alert(`Parabéns! Você adotou o pet: ${animalAdotado.nome}`);
  };

  return (
    <div>
      <h2>Lista de Animais para Adoção</h2>
      {animais.length > 0 ? (
        <ul className="listagem">
          {animais.map((animal, index) => (
            <li key={index}>
              <img
                src={animal.imagem || "default-image.jpg"} // Verifica se a imagem existe, senão usa uma padrão
                alt={animal.nome}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div>
                <h3>{animal.nome}</h3>
                <p>{animal.descricao}</p>
                <p>
                  <strong>Idade:</strong> {animal.idade} anos
                </p>
                {animal.status === "Adotado" ? (
                  <p style={{ color: "green" }}>Este pet foi adotado!</p>
                ) : (
                  <button
                    onClick={() => adotarAnimal(index)} // Função de adotar pet
                    className="btn-adotar"
                  >
                    Adotar Pet
                  </button>
                )}
                <button
                  onClick={() => removerAnimal(index)} // Função de remover pet
                  className="btn-remover"
                >
                  Remover Pet
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum animal disponível para adoção.</p>
      )}
    </div>
  );
}

export default ListaAnimais;
