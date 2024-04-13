import React, { useRef } from "react";
import "../styles/form_style.css"
import "../styles/add_page.css"

// todo: string;
// setTodo: React.Dispatch<React.SetStateAction<string>>;
// handleAdd: (e: React.FormEvent) => void;
interface Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  prodYear: string;
  setProdYear: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

function InputForm({
  name,
  setName,
  price,
  setPrice,
  prodYear,
  setProdYear,
  description,
  setDescription,
  handleAdd,
}: Props) {

    const refName = useRef<HTMLInputElement>(null);
    const refPrice = useRef<HTMLInputElement>(null);
    const refProdYear = useRef<HTMLInputElement>(null);
    const refDescription = useRef<HTMLInputElement>(null);
  return (
    <form className="form"
      onSubmit={(e) => {
        handleAdd(e);
      }}
    >
      <div>
          <div className="edit_fields">
            <input className="new"
              ref={refName}
              type="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a name"
            ></input>
            <input className="new"
              ref={refPrice}
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter a price"
            ></input>
            <input className="new"
              ref={refProdYear}
              type="number"
              value={prodYear}
              onChange={(e) => setProdYear(e.target.value)}
              placeholder="Enter a launch year"
            ></input>
            <input className="new"
              ref={refDescription}
              type="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description"
            ></input>
          </div>
          <button type={"submit"} className="confirm_add_button">Add phone</button>
      </div>
    </form>
  );
}

export default InputForm;
