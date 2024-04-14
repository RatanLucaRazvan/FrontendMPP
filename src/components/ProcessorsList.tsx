import React from 'react'
import useProcessorStore from '../global_state/processorState'
import ProcessorItem from './ProcessorItem';


function ProcessorsList() {
    const {processors} = useProcessorStore();
  return (
    <div className="processors_list">
        {processors.map((processor) => (<ProcessorItem processor={processor} />))}
        </div>
  )
}

export default ProcessorsList