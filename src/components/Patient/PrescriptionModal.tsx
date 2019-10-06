import React, { useState } from 'react';

import { useList, useToggle } from 'react-use';
import classnames from 'classnames';
import { useInput } from '../../util';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  Button,
  Input,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Label,
  Row,
  Col,
  Container,
} from 'reactstrap';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectSearchBox, connectHits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  '2KPEBQNUMT',
  'e06a322469fe746fead40c6df7e668e5'
);

type Medicine = {
  name: string,
  time: string,
  endDate?: Date,
  notes?: string,
};

type ExtraAddMedicineModalProps = {
  onAdd: (m: Medicine) => void, 
}

// -----------

const MedicineBox: React.FC<Medicine & { onRemove: () => void }> = ({ name, time }) => (
  <ListGroupItem>{name} - {time}</ListGroupItem>
);

const MySearchBox = connectSearchBox(({ currentRefinement, refine }) => (
  <Input
    type="search"
    value={currentRefinement}
    onChange={event => refine(event.currentTarget.value)}
  />
));

const MyHitsBox: any = connectHits(({ hits, onClick, current } : any) => {
  return (hits.map((h: any) => (
    <ListGroupItem
      onClick={() => onClick(h.brand_name[0])}
      className={classnames({
        'bg-warning': h.brand_name[0] === current,
      })}
    >
      {h.brand_name[0]}
      </ListGroupItem>
    ))
  );
});

const AddMedicineModal: React.FC<ModalProps & ExtraAddMedicineModalProps> = (props) => {
  const onClick = () => {
    props.onAdd({
      name: medicine,
      time: `${morning === true ? 1 : 0}${noon === true ? 1 : 0}${evening === true ? 1 : 0}`
    });
    if(props.toggle) {
      props.toggle();
    }
  };

  const [medicine, setMedicine] = useState("-");
  const notesInput = useInput();
  
  const [morning, mToggle] = useToggle(false);
  const [noon, nToggle] = useToggle(false);
  const [evening, eToggle] = useToggle(false);
  
  return (
    <Modal {...props}>
      <ModalHeader>Add Medicine</ModalHeader>
      <ModalBody>
        <Label>Select medicine</Label>
        <InstantSearch
          indexName="dev_medicines"
          searchClient={searchClient}
        >
          <MySearchBox />
          <ListGroup flush>
            <MyHitsBox onClick={setMedicine} current={medicine} />
          </ListGroup>
        </InstantSearch>

        <FormGroup check className="mt-4 container">
          <Row>
            <h1>{medicine}</h1>
          </Row>
          <Row>
            <Col>
              <Label check>
                <Input type="checkbox" onClick={mToggle} />
                Morning
              </Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label check>
                <Input type="checkbox" onClick={nToggle} />
                Noon
              </Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label check>
                <Input type="checkbox" onClick={eToggle} />
                Evening
              </Label>
            </Col>
          </Row>
        </FormGroup>
        <Input {...notesInput} />
      </ModalBody>
      <ModalFooter>
        <Button disabled={!medicine || medicine === "-"} onClick={onClick}>Submit</Button>
      </ModalFooter>
    </Modal>
  );
};

// -----------

const PrescriptionModal: React.FC<ModalProps> = (props) => {
  const [medicines, medActions] = useList<Medicine>([]);

  const [isAddModalOpen, toggle] = useToggle(false);

  const onAddClick = (e: any) => {
    e.preventDefault();
    toggle();
  };

  return (
    <Modal {...props}>
      <ModalHeader>
        Fill Prescription
      </ModalHeader>
      <ModalBody className="d-flex flex-column">
        <ListGroup>
          {medicines.map((m, i) => <MedicineBox {...m} onRemove={() => medActions.remove(i)} />)}
        </ListGroup>

        <Button onClick={onAddClick} type="submit" color="primary" className="my-2">+ Add Medicine</Button>
        <AddMedicineModal isOpen={isAddModalOpen} toggle={toggle} onAdd={(m: Medicine) => medActions.push(m)} />
      </ModalBody>
      <ModalFooter>
        <Button>Submit</Button>
      </ModalFooter>
    </Modal>
  );
};

export default PrescriptionModal;
