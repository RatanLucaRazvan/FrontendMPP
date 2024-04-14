import "../styles/list_page.css";

interface Props{
  text: string
}
function AddPageButton({text}: Props) {
  return (
    <button type="button" className="btn btn-primary add_button">
      {text}
    </button>
  );
}

export default AddPageButton;
