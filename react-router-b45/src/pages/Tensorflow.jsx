import { useEffect, useRef, useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

function ImageClassifier() {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  const imageRef = useRef();

  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    const loadedModel = await mobilenet.load();

    setModel(loadedModel);
    setLoading(false);
  };

  const classifyImage = async () => {
    if (!model || !imageRef.current) return;

    const results = await model.classify(imageRef.current);

    setPredictions(results);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    imageRef.current.src = imageURL;

    imageRef.current.onload = () => {
      classifyImage();
    };
  };    

  console.log(predictions)

  return (
    <div className="bg-white shadow-xl rounded-xl p-8 w-[700px]">
      <h1 className="text-3xl font-bold text-center mb-6">
        AI Image Classifier
      </h1>

      {loading ? (
        <p className="text-center text-blue-600">
          Loading TensorFlow Model...
        </p>
      ) : (
        <p className="text-center text-green-600 font-semibold">
          Model Loaded Successfully ✅
        </p>
      )}

      <div className="mt-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border p-3 rounded-lg"
        />
      </div>

      <div className="mt-6 flex justify-center">
        <img
          ref={imageRef}
          alt="Uploaded Preview"
          className="max-h-80 rounded-lg shadow-md"
        />
      </div>

      {predictions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Predictions
          </h2>

          {predictions.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 mb-3"
            >
              <p>
                <strong>Object:</strong> {item.className}
              </p>

              <p>
                <strong>Confidence:</strong>{" "}
                {(item.probability * 100).toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageClassifier;