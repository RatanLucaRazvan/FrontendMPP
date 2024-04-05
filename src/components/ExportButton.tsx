import useStore from '../global_state/phoneState';


function ExportButton() {
  const {phones} = useStore();
    const exportToJSON = () => {
        const jsonData = JSON.stringify(phones);

        const blob = new Blob([jsonData], { type: 'application/json' });
        
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'exported_data.json';

        a.click();

        // Clean up
        URL.revokeObjectURL(url);
    }

  return (
        <button type="button" className="btn btn-primary add_button" onClick={exportToJSON}>
      Export data
    </button>
  )
}

export default ExportButton