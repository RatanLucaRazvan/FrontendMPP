import ProcessorsList from '../components/ProcessorsList'
import { Link } from 'react-router-dom'
import AddPageButton from '../components/AddPageButton'
import "../styles/list_page.css";

function ProcessorsListPage() {
  return (
    <div className="home_list">
    <h1 className="heading_list">Phone List Administration</h1>
      <div className="home_list">
        <Link to="/phones-list-page">
        <button
            type="button"
            className="btn btn-primary add_button"
          >
            See phones list
        </button>
        </Link>
        <Link to="/add-page-processor">
          <AddPageButton text="Add new processor"/>
        </Link>
        <ProcessorsList
        />
      </div>
    </div>
  )
}

export default ProcessorsListPage