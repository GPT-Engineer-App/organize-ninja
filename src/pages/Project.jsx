import { useParams } from "react-router-dom";
import Index from "./Index";

const ProjectPage = () => {
  const { projectName } = useParams();
  return <Index projectName={projectName} />;
};

export default ProjectPage;