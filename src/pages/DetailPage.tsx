import { useParams } from "react-router-dom";
import { Phone } from "../model/Phone";
import "../styles/detail_page.css";
import useProcessorStore from "../global_state/processorState";

interface Props {
  phones: Phone[];
}
function DetailPage({ phones }: Props) {
  const {processors} = useProcessorStore();
  const { id } = useParams<{ id: string }>();
  const phone = id ? phones.find((p) => p.id === id) : undefined;
  let processor = processors.find((p) => p.id === phone!.processorId);

  return (
    <div className="home_detail">
      <h1 className="heading_detail">Details Page</h1>
      <div className="details_box">
        <p className="detail">Name: {phone!.name}</p>
        <p className="detail">Price: {phone!.price}</p>
        <p className="detail">Production Year: {phone!.prodYear}</p>
        <p className="detail"> Description: {phone!.description}</p>
        <p className="detail"> Processor: {processor!.name}</p>
      </div>
    </div>
  );
}

export default DetailPage;
