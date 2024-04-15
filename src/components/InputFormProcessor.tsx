import React, { useRef } from 'react'

interface Props {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    prodYear: string;
    setProdYear: React.Dispatch<React.SetStateAction<string>>;
    speed: string;
    setSpeed: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
  }
function InputFormProcessor({name, setName, prodYear, setProdYear, speed, setSpeed, handleAdd, }: Props) {

    const refName = useRef<HTMLInputElement>(null);
    const refProdYear = useRef<HTMLInputElement>(null);
    const refSpeed = useRef<HTMLInputElement>(null);
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
              ref={refProdYear}
              type="number"
              value={prodYear}
              onChange={(e) => setProdYear(e.target.value)}
              placeholder="Enter a prod year"
            ></input>
            <input className="new"
              ref={refSpeed}
              type="input"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              placeholder="Enter speed"
            ></input>
          </div>
          <button type={"submit"} className="confirm_add_button">Add Processor</button>
      </div>
    </form>
  );
}

export default InputFormProcessor