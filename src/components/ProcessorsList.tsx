import useProcessorStore from '../global_state/processorState'
import ProcessorItem from './ProcessorItem';
import "../styles/list_page.css"


function ProcessorsList() {
    const {processors} = useProcessorStore();
  return (
    <div className="list">
        {processors.map((processor) => (<ProcessorItem processor={processor} />))}
        </div>
  )
}

export default ProcessorsList