import { useEffect, useState } from "react";
import * as toxicity from "@tensorflow-models/toxicity";

function ToxicDetector() {
  const [model, setModel] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    const threshold = 0.9;

    const loadedModel = await toxicity.load(threshold);

    setModel(loadedModel);
    setLoading(false);
  };

  const analyzeText = async () => {
    if (!text.trim()) return;

    const predictions = await model.classify([text]);

    setResults(predictions);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl w-[700px]">
      <h1 className="text-3xl font-bold text-center mb-6">
        Toxic Comment Detector
      </h1>

      {loading ? (
        <p className="text-center text-blue-600">
          Loading AI Model...
        </p>
      ) : (
        <p className="text-center text-green-600 font-semibold">
          Model Ready ✅
        </p>
      )}

      <textarea
        rows="5"
        placeholder="Enter a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border p-3 rounded-lg mt-4"
      />

      <button
        onClick={analyzeText}
        disabled={loading}
        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg"
      >
        Analyze
      </button>

      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Prediction Results
          </h2>

          {results.map((item) => (
            <div
              key={item.label}
              className="border p-3 rounded-lg mb-3"
            >
              <p className="font-semibold">
                {item.label}
              </p>

              <p>
                Detected:{" "}
                {item.results[0].match
                  ? "🚨 Yes"
                  : "✅ No"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ToxicDetector;