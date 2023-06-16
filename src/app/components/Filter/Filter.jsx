import { ModalElement } from '../Modal/ModalElement';
import Button from 'react-bootstrap/Button';
import './Filter.css'

export function Filter({isOpen, onClose}){

    const handleSubmitRecommendations = (e) => {
      console.log('handleSubmitRecommendations');
    };

    const handleSubmitFilters = (e) => {
      console.log('handleSubmitFilters');
    }

    return (
        <ModalElement
          size='lg'
          show={isOpen}
          onHide={() => {
            onClose();
          }}
          id="modal"
        >
          <h2 className='filter-title'>Filters</h2>
          <p className='filter-subtitle'>You can filter by as many categories as you like.</p>
          <div className='filter-wrapper'>
            <h4>Category</h4>
          </div>
          <div className='filter-wrapper'>
            <h4>Type</h4>
          </div>
          <div className='filter-buttons-wrapper'>
            <Button className='button' onClick={(e) => handleSubmitRecommendations(e)} variant="primary" type="button">
              Give me the results!
            </Button>
            <Button className='button' onClick={(e) => handleSubmitFilters(e)} variant="primary" type="button">
              Apply filters
            </Button>
          </div>
          <Button className="clear-filters-button" variant="link" size="sm" onClick={() => console.log('')}>Clear all filters</Button>

        </ModalElement>
      );
}