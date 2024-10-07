import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
} from "react-bootstrap";
import { useState, useContext } from "react";
import { TableContext } from "../../../App";
import { Row } from "../../../interface";

function Total() {
  const table = useContext(TableContext);
  let [total, setTotal] = useState({
    amount: 0,
    expenses: 0,
    sales: 0,
  });

  table?.data?.on("draw", () => {
    const newTotal = {
      amount: 0,
      expenses: 0,
      sales: 0,
    };

    table?.data
      ?.data()
      .toArray()
      .forEach((el: Row) => {
        switch (el.flow) {
          case "sales":
            newTotal.sales += el.amount;
            break;
          case "expenses":
            newTotal.expenses += el.amount;
            break;
        }
      });
    newTotal.amount = newTotal.sales - newTotal.expenses;
    setTotal(newTotal);
  });

  return (
    <>
      <Card className="shadow">
        <CardBody>
          <Container className="fs-1">
            <CardTitle>Total</CardTitle>
            <CardText>
              {total.amount >= 0
                ? `₱${total.amount}`
                : `-₱${Math.abs(total.amount)}`}
            </CardText>
          </Container>
          <hr></hr>
          <Container>
            <CardTitle>Total Expenses</CardTitle>
            <CardText> ₱{total.expenses}</CardText>
          </Container>
          <hr></hr>
          <Container>
            <CardTitle>Total Sales</CardTitle>
            <CardText> ₱{total.sales}</CardText>
          </Container>
        </CardBody>
      </Card>
    </>
  );
}

export default Total;
