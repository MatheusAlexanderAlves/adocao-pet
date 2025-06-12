import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cadastro({ setAnimais }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [idade, setIdade] = useState("");
  const [imagem, setImagem] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result); // Armazena a imagem no estado como uma URL base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se a idade é válida (não menor que 0)
    if (idade < 0) {
      alert("A idade não pode ser menor que 0.");
      return; // Impede o envio do formulário
    }

    const novoAnimal = {
      id: Date.now(), // ID único usando o timestamp
      nome,
      descricao,
      idade,
      imagem,
      local: true, // Marca este animal como adicionado manualmente
    };

    // Salvar no LocalStorage
    let animais = JSON.parse(localStorage.getItem("animais")) || [];
    animais.push(novoAnimal);
    localStorage.setItem("animais", JSON.stringify(animais));

    // Atualizar o estado
    setAnimais((prevAnimais) => [...prevAnimais, novoAnimal]);

    // Limpar o formulário após o envio
    setNome("");
    setDescricao("");
    setIdade("");
    setImagem(null);

    // Navegar de volta para a lista
    navigate("/");
    alert("Animal cadastrado com sucesso!");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do Animal:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do animal"
          />
        </div>

        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva o animal"
          />
        </div>

        <div className="form-group">
          <label>Idade:</label>
          <input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Idade do animal"
            min="0" // Impede a idade ser menor que 0
          />
        </div>

        <div className="form-group">
          <label>Imagem do Animal:</label>
          <label htmlFor="file-upload" className="custom-file-button">
            Escolher Imagem
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        {imagem && (
          <img
            src={imagem}
            alt="Imagem do animal"
            style={{ width: "100px", marginTop: "10px" }}
          />
        )}

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
