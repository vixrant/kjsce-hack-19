import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap';

import _ from 'lodash';

type UserDocType = {
  name: string,
  phone: string,
  age: number,
  weight: number,
  height: number,
  bloodGroup: string,
  sex: string,
};

const UserInfo: React.FC<UserDocType & { onFillClick: () => void }> = (props) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onFillClick();
  };

  return (
    <Card>
      <CardHeader className="border-0 text-center" tag="h1">{props.name}</CardHeader>
      
      <CardBody tag={Container} fluid>
        <Row>
          <Col>
            <b>{props.age} years old</b>
          </Col>
          <Col>
            {_.capitalize(props.sex)}
          </Col>
          <Col>
            +91{props.phone}
          </Col>
        </Row>
        <Row>
          <Col>
            Height: {props.height} cm
          </Col>
          <Col>
            Weight: {props.weight} kg
          </Col>
          <Col>
            Blood Group: {props.bloodGroup}ve
          </Col>
        </Row>
      </CardBody>

      <CardFooter tag="form" className="d-flex flex-column px-5">
        <Button type="submit" color="info" size="lg" onClick={onClick}>Fill Prescription</Button>
      </CardFooter>
    </Card>
  );
};

export default UserInfo;
