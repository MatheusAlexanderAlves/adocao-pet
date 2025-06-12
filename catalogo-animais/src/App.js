import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Cadastro from "./Cadastro";
import ListaAnimais from "./ListaAnimais";
import "./styles.css";

// Importando as imagens
import rexImg from "./imagens/cachorro-fofo-01.jpg";
import miauImg from "./imagens/cachorro-fofo-02.jpg";
import fidoImg from "./imagens/cachorro-fofo-03.jpg";
import lunaImg from "./imagens/cachorro-fofo-04.jpg";
import maxImg from "./imagens/cachorro-fofo-05.jpg";

function App() {
  const [animais, setAnimais] = useState([]);

  useEffect(() => {
    // Carregar os animais do LocalStorage e os dados da API
    const animaisStorage = JSON.parse(localStorage.getItem("animais")) || [];
    fetch("https://jsonplaceholder.typicode.com/users") // URL fictícia para fins de exemplo
      .then((response) => response.json())
      .then((data) => {
        const animaisData = data.map((user, index) => ({
          nome: getNomeAnimal(index),
          descricao: `Este é o animal ${getNomeAnimal(
            index
          )}, ele é amigável e adora brincar.`,
          idade: Math.floor(Math.random() * 6) + 1, // Idade aleatória entre 1 e 6 anos
          imagem: getImagemAnimal(index), // A URL da imagem
        }));
        setAnimais([...animaisStorage, ...animaisData]); // Junta animais do LocalStorage com dados da API
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  // Função para pegar um nome fictício de animal
  const getNomeAnimal = (index) => {
    const nomes = [
      "Rex",
      "Miau",
      "Fido",
      "Luna",
      "Max",
      "Bella",
      "Rocky",
      "Oliver",
      "Charlie",
      "Lily",
      "Simba",
      "Nala",
      "Coco",
      "Daisy",
      "Buddy",
      "Ziggy",
      "Chester",
      "Maggie",
      "Ruby",
      "Jack",
    ];
    return nomes[index % nomes.length]; // Garantir que não saia do array de nomes
  };

  // Função para associar a imagem com base no índice
  const getImagemAnimal = (index) => {
    const imagens = {
      Rex: rexImg,
      Miau: miauImg,
      Fido: fidoImg,
      Luna: lunaImg,
      Max: maxImg,
    };

    return imagens[getNomeAnimal(index)] || rexImg; // Retorna a imagem ou uma padrão (rexImg)
  };

  return (
    <Router>
      <div className="container">
        <h1>Catálogo de Animais para Adoção</h1>
        <nav>
          <Link to="/">Lista de Animais</Link> |
          <Link to="/cadastro">Cadastrar Animal</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<ListaAnimais animais={animais} setAnimais={setAnimais} />}
          />
          <Route
            path="/cadastro"
            element={<Cadastro setAnimais={setAnimais} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
