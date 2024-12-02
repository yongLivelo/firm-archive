import { Row } from "@/interface/Row";
import { Flow } from "@/interface/Flow";
import { useContext, useState } from "react";
import {
  Card,
  CardBody,
  Container,
  CardTitle,
  CardText,
} from "react-bootstrap";
import { TableContext } from "../Entry";
import { TableContextType } from "@/interface/TableContextType";

function Total() {
  const table = useContext(TableContext) as TableContextType;
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
          case Flow.Sale:
            newTotal.sales += el.amount;
            break;
          case Flow.Expense:
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
