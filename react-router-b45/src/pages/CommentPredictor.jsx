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
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2">
        Toxic Comment Detector
      </h1>

      <p className="text-center text-gray-500 mb-6">
        Analyze comments using a pre-trained TensorFlow.js Toxicity Model
      </p>

      {loading ? (
        <div className="text-center mb-6">
          <p className="text-blue-600 font-medium">
            Loading AI Model...
          </p>
        </div>
      ) : (
        <div className="text-center mb-6">
          <p className="text-green-600 font-semibold">
            Model Ready ✅
          </p>
        </div>
      )}

      <textarea
        rows="5"
        placeholder="Type a comment here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={analyzeText}
        disabled={loading}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
      >
        Analyze Comment
      </button>

      {results.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center mb-6">
            Prediction Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((item) => (
              <div
                key={item.label}
                className="bg-slate-50 border rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold capitalize mb-3">
                  {item.label.replace("_", " ")}
                </h3>

                <div
                  className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold ${
                    item.results[0].match
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.results[0].match
                    ? "🚨 Detected"
                    : "✅ Not Detected"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ToxicDetector;