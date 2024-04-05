import { useParams } from "react-router-dom";
import { Phone } from "../model";
import "../styles/detail_page.css"

interface Props {
  phones: Phone[];
}
function DetailPage({ phones }: Props) {
  const { id } = useParams<{ id: string }>();
  const phone = id ? phones.find((p) => p.id === parseInt(id)) : undefined;

  return (
    <div className="home_detail">
      <h1 className="heading_detail">Details Page</h1>
      <div className="details_box">
        <p className="detail">Name: {phone!.name}</p>
        <p className="detail">Price: {phone!.price}</p>
        <p className="detail">Production Year: {phone!.prodYear}</p>
        <p className="detail"> Description: {phone!.description}</p>
      </div>
    </div>
  );
}

export default DetailPage;
