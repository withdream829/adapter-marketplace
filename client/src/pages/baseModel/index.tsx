import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, setConfiguration } from "react-grid-system";
import { toast } from "react-toastify";
import type { RootState } from "../../redux/store";
import { setModel, setMethod } from "../../redux/features/main/mainSlice";
import { baseModels, methods } from "../../data.json";

setConfiguration({
  gridColumns: 24,
  gutterWidth: 32,
  breakpoints: [640, 768, 1024, 1280, 1536, 1920],
});

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { baseModel: selectedModel, fineTurningMethod: selectedMethod } =
    useSelector((state: RootState) => state.main);

  const uploadDatabase = () => {
    if (selectedModel === "") {
      toast.error("You have to select base model!");
      return;
    }
    if (selectedMethod === "") {
      toast.error("You have to select fine-tuning method!");
      return;
    }

    toast.success("Database is uploaded successfully!");
    navigate("/select-resource");
  };

  return (
    <div className="h-[90vh] w-[100vw] overflow-y-auto">
      <Container className="min-h-full bg-gray-100">
        <Row className="min-h-full">
          <Col xs={24}>
            <h1 className="p-8 text-3xl">
              Select Base Model and Fine-Turning Method
            </h1>
          </Col>
          <Col md={24} lg={17} xl={18} xxl={19} className="border-t-2 border-b">
            <Row className="px-8">
              {baseModels.map((model, modelIndex) => (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={12}
                  xl={8}
                  xxl={6}
                  key={model._id}
                >
                  <div
                    role="button"
                    tabIndex={modelIndex + 1}
                    className={`mx-auto max-w-60 my-8 h-[120px] rounded-lg cursor-pointer hover:opacity-80 hover:shadow-xl ${
                      selectedModel === model._id
                        ? "bg-gray-400"
                        : "bg-gray-300"
                    }`}
                    onClick={() => dispatch(setModel(model._id))}
                    onKeyUp={(event) => {
                      if (event.key === "Enter") {
                        dispatch(setModel(model._id));
                      }
                    }}
                  >
                    <div className="flex text-center justify-center items-center mx-[10%] w-4/5 h-full overflow-hidden">
                      <h2 className="text-xl">{model.name}</h2>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
          <Col
            md={24}
            lg={7}
            xl={6}
            xxl={5}
            className="lg:border-t-2 lg:border-l border-b"
          >
            <Row className="p-8">
              {methods.map((method) => (
                <Col md={12} lg={24} key={method._id}>
                  <label className="w-full flex">
                    <input
                      type="radio"
                      value={method._id}
                      checked={selectedMethod === method._id}
                      onChange={(event) =>
                        dispatch(setMethod(event.target.value))
                      }
                      className="w-6 h-10 m-2"
                    />
                    <span className="leading-9 text-xl m-2">{method.name}</span>
                  </label>
                </Col>
              ))}

              <Col xs={24}>
                <button
                  type="button"
                  className="w-full bg-gray-300 rounded-lg hover:opacity-80 hover:shadow-xl py-4 m-2"
                  onClick={uploadDatabase}
                >
                  Upload Database
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
