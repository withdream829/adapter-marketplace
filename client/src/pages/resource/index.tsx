import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, setConfiguration } from "react-grid-system";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import type { RootState } from "../../redux/store";
import {
  setResource,
  setFineTurned,
  setMerged,
} from "../../redux/features/main/mainSlice";
import { setUser } from "../../redux/features/auth/authSlice";
import { baseModels, methods, resources } from "../../data.json";

setConfiguration({
  gridColumns: 24,
  gutterWidth: 32,
  breakpoints: [640, 768, 1024, 1280, 1536, 1920],
});

type MessageType = {
  role: string;
  content: string;
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    baseModel: selectedModel,
    fineTurningMethod: selectedMethod,
    resource: selectedResource,
    fineTurned: fineTurnedState,
    merged: mergedState,
  } = useSelector((state: RootState) => state.main);
  const user = useSelector((state: RootState) => state.auth.user);
  const [userPrompt, setUserPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<MessageType[]>([
    {
      role: "system",
      content: "You are powerful AI assistant.",
    },
  ]);

  useEffect(() => {
    if (selectedModel === "" || selectedMethod === "") {
      navigate("select-model");
    }
  }, [navigate, selectedModel, selectedMethod]);

  const startFineTurn = () => {
    if (selectedResource === "") {
      toast.error("You have to select resource!");
      return;
    }

    dispatch(setFineTurned(true));
    toast.success("Model is fine-turned successfully!");
  };

  const mergeAdapter = () => {
    if (fineTurnedState === false) {
      toast.error("You have to fine-turn model first!");
      return;
    }

    dispatch(setMerged(true));
    toast.success("Model is merged successfully!");
  };

  const downloadFineTurnedModel = () => {
    if (mergedState === false) {
      toast.error("You have to merge adapter first!");
      return;
    }

    toast.success("Model is downloaded successfully!");
  };

  const subscribe = () => {
    if (user) {
      const newUser = { ...user, subscribed: true };
      localStorage.setItem("user", JSON.stringify(newUser));
      dispatch(setUser(newUser));
      toast.success("Successfully subscribed!");
    }
  };

  const getAssistantMessage = useCallback((history: MessageType[]) => {
    setChatHistory([
      ...history,
      {
        role: "assistant",
        content: "Hi, there! How can I help you?",
      },
    ]);
  }, []);

  const sendMessage = useCallback(() => {
    if (mergedState === false) {
      toast.error("You have to merge adapter first!");
      return;
    }
    if (userPrompt === "") return;
    const history = [
      ...chatHistory,
      {
        role: "user",
        content: userPrompt,
      },
    ];
    setChatHistory(history);
    setUserPrompt("");

    setTimeout(() => {
      getAssistantMessage(history);
    }, 1000);
  }, [chatHistory, getAssistantMessage, mergedState, userPrompt]);

  const handleTextAreaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[90vh] w-[100vw] overflow-y-auto">
      <Container className="min-h-full bg-gray-100">
        <Row>
          <Col xs={24}>
            <div className="w-full p-8 flex gap-4">
              <Icon
                icon="tabler:arrow-back-up"
                width={36}
                height={36}
                className="hover:opacity-50 cursor-pointer"
                onClick={() => navigate("/select-model")}
              />
              <h1 className="text-3xl">
                Select Resource and Start Fine-Turning
              </h1>
              {user?.subscribed ? (
                <div />
              ) : (
                <button
                  type="button"
                  className="hover:opacity-50 cursor-pointer flex gap-2 ml-auto"
                  onClick={subscribe}
                >
                  <Icon
                    icon="fluent:premium-person-20-regular"
                    width={36}
                    height={36}
                    // onClick={() => navigate("/select-model")}
                  />
                  <span className="leading-9 text-lg">Subscribe</span>
                </button>
              )}
            </div>
          </Col>
          <Col md={24} lg={17} xl={18} xxl={19} className="border-t-2 border-b">
            <Row className="p-8 gap-y-4">
              <Col lg={24} xl={12}>
                <div className="w-full flex gap-2">
                  <span className="leading-[44px] w-40">Base Model:</span>
                  <div className="bg-gray-300 px-4 py-2 text-lg rounded-lg cursor-pointer hover:opacity-80 hover:shadow-xl">
                    {
                      baseModels.find((model) => model._id === selectedModel)
                        ?.name
                    }
                  </div>
                </div>
              </Col>
              <Col lg={24} xl={12}>
                <div className="w-full flex gap-2">
                  <span className="leading-[44px] w-40">
                    Fine-Turning Method:
                  </span>
                  <div className="bg-gray-300 px-4 py-2 text-lg rounded-lg cursor-pointer hover:opacity-80 hover:shadow-xl">
                    {
                      methods.find((method) => method._id === selectedMethod)
                        ?.name
                    }
                  </div>
                </div>
              </Col>
              <Col lg={24} xl={12}>
                <div className="w-full flex gap-2">
                  <span className="leading-[44px] w-40">Resource:</span>
                  <div className="bg-gray-300 px-4 py-2 text-lg rounded-lg cursor-pointer hover:opacity-80 hover:shadow-xl">
                    {resources.find(
                      (resource) => resource._id === selectedResource,
                    )?.name || "Not Selected"}
                  </div>
                </div>
              </Col>
              <Col lg={24} xl={12} />
              <Col xs={24} md={8}>
                <button
                  type="button"
                  className="w-full h-full bg-gray-300 px-4 py-2 text-lg rounded-lg cursor-pointer outline-none ring-1 ring-gray-400 focus:ring-gray-500 hover:opacity-80 hover:shadow-xl"
                  onClick={startFineTurn}
                >
                  Fine-Turn the Model
                </button>
              </Col>
              <Col xs={24} md={8}>
                <button
                  type="button"
                  className="w-full h-full bg-gray-300 px-4 py-2 text-lg rounded-lg cursor-pointer outline-none ring-1 ring-gray-400 focus:ring-gray-500 hover:opacity-80 hover:shadow-xl"
                  onClick={mergeAdapter}
                >
                  Merge Adapter with Model
                </button>
              </Col>
              <Col xs={24} md={8}>
                <button
                  type="button"
                  className="w-full h-full bg-gray-300 px-4 py-2 text-lg rounded-lg cursor-pointer outline-none ring-1 ring-gray-400 focus:ring-gray-500 hover:opacity-80 hover:shadow-xl"
                  onClick={downloadFineTurnedModel}
                >
                  Download Merged Model
                </button>
              </Col>
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
              {resources.map((resource) => (
                <Col md={12} lg={24} key={resource._id}>
                  <label className="w-full flex">
                    <input
                      type="radio"
                      value={resource._id}
                      checked={selectedResource === resource._id}
                      onChange={(event) =>
                        dispatch(setResource(event.target.value))
                      }
                      className="w-6 h-8 m-2"
                    />
                    <span className="leading-8 text-xl m-2">
                      {resource.name}
                    </span>
                  </label>
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={24} className="border-b">
            <div className="w-full p-8 flex flex-col gap-4">
              <h2 className="text-xl">Test the fine-turned model</h2>
              <div className="w-full flex flex-col">
                <div className="w-full relative">
                  <textarea
                    value={userPrompt}
                    onChange={(event) => setUserPrompt(event.target.value)}
                    onKeyDown={handleTextAreaKeyDown}
                    rows={2}
                    placeholder="Enter your prompt here..."
                    className="w-full py-2 pl-4 pr-8 rounded-lg outline-none ring-1 ring-gray-400 focus:ring-gray-500"
                  />
                  <button
                    className="absolute m-2 right-0 bottom-0 outline-none text-[#0099ff] hover:text-[#00eeff] focus:text-[#00eeff]"
                    type="submit"
                    onClick={sendMessage}
                  >
                    <Icon
                      icon="fa-brands:telegram-plane"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
                <div className="w-full max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
                  {chatHistory
                    .filter((m) => m.role !== "system")
                    .map((message, index) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className={`flex items-center my-2 ${
                          message.role === "assistant"
                            ? "flex-row"
                            : "flex-row-reverse"
                        }`}
                      >
                        {message.role === "user" && (
                          <Icon
                            icon="basil:user-solid"
                            className="w-6 h-6 ml-2"
                          />
                        )}
                        {message.role === "assistant" && (
                          <Icon
                            icon="fluent:bot-sparkle-24-regular"
                            className="w-6 h-6 mr-2"
                          />
                        )}
                        <div
                          className={`p-2 rounded-lg ${
                            message.role === "assistant"
                              ? "bg-blue-100"
                              : "bg-green-100"
                          }`}
                        >
                          <p>{message.content}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
