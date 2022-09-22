import PageHeader from "./common/pageHeader";
import practice from "../service/practice";

function About() {
  return (
    <>
      <PageHeader title={"this is the about page"} description={"here i gonna talk alot"} />
      <button onClick={() => practice.dor2()}>ssssssss</button>
    </>
  );
}

export default About;
