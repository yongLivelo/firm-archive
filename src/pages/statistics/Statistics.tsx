import { Col, Container, Row, Spinner } from "react-bootstrap";
import NavBar from "@/components/NavBar";
import CashFlow from "./components/CashFlow";
import IncomeAndExpense from "./components/IncomeAndExpense";
import CashDistribution from "./components/CashDistribution";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "@/App";

export const PostContext = createContext<Array<any> | null>(null);
function Statistics() {
  const user = useContext(AuthContext);
  const [post, setPost] = useState<Array<any> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const retrieveData = async () => {
      if (!user?.uid) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(JSON.parse(docSnap.data().post));
        }
      } catch (error: any) {
        console.error("Error parsing draftTable from localStorage:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      retrieveData();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center flex-column">
        <Spinner
          animation="border"
          style={{ width: "100px", height: "100px" }}
          role="status"
          className="mb-4"
        />
        <h2>Loading Statistics Content...</h2>
      </div>
    );
  }
  return (
    <>
      <NavBar />

      <PostContext.Provider value={post}>
        {post?.length ? (
          <Container fluid className="p-4">
            <Row className="mb-lg-4">
              <Col className="mb-4 mb-lg-0">
                <CashFlow />
              </Col>
            </Row>
            <Row className="mb-lg-4">
              <Col lg={8} className="mb-4 mb-lg-0">
                <IncomeAndExpense />
              </Col>
              <Col lg={4} className="mb-4 mb-lg-0">
                <CashDistribution />
              </Col>
            </Row>
          </Container>
        ) : (
          <h1
            className="d-flex justify-content-center align-items-center vh-100 fs-1"
            style={{ top: "-100px", position: "relative", zIndex: -1 }}
          >
            No Data
          </h1>
        )}
      </PostContext.Provider>
    </>
  );
}

export default Statistics;
