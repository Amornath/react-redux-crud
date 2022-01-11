import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLists, createList, updateList, deleteList } from "./listSlice";
import {
  Row,
  Card,
  Col,
  Table,
  Form,
  Button,
  Spinner,
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const List = () => {
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [student, setStudent] = useState({});
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.list.data);

  useEffect(() => {
    dispatch(getLists());
  }, [toggle]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const deleteRowClick = (item) => {
    fetch(`http://localhost:8000/students/` + item.id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setToggle(!toggle);
      });
  };

  const saveStudentData = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    } else {
      setLoading(true);
      if (!student.id) {
        // dispatch(createList(student));

        fetch(`http://localhost:8000/students`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        })
          .then((res) => res.json())
          .then(() => {
            setToggle(!toggle);
            setValidated(false);
            setLoading(false);
          });
      } else {
        // dispatch(updateList(student));
        fetch(`http://localhost:8000/students/` + student.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        })
          .then((res) => res.json())
          .then(() => {
            setToggle(!toggle);
            setValidated(false);
            setLoading(false);
          });
      }
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">REDUX-CRUD</Navbar.Brand>
          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
      <Container>
        <Row className="mt-3">
          <Col>
            <Card>
              <Button
                variant="primary"
                type="submit"
                onClick={() => setStudent({ name: "", roll: "", clss: "" })}
              >
                Add New
              </Button>
              <Form
                noValidate
                validated={validated}
                onSubmit={saveStudentData}
                method="POST"
                className="p-5"
              >
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    name="name"
                    type="text"
                    value={student.name}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Roll No</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    name="roll"
                    type="text"
                    value={student.roll}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    name="clss"
                    type="text"
                    value={student.clss}
                    required
                  />
                </Form.Group>
                {loading ? (
                  <Button variant="primary" disabled className="float-end mt-2">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    type="submit"
                    className="float-end mt-2"
                  >
                    {student.id ? "Update" : "Save"}
                  </Button>
                )}
              </Form>
            </Card>
          </Col>
          <Col>
            <Card>
              <Table responsive striped borderless>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Roll</th>
                    <th>Class</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((item, index) => (
                    <tr
                      key={index}
                      className={item.id === student.id ? "table-active" : ""}
                    >
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.roll}</td>
                      <td>{item.clss}</td>
                      <td>
                        <Button
                          variant="primary"
                          className="me-2"
                          onClick={() => {
                            setStudent(item);
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => deleteRowClick(item)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default List;
