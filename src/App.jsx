import Header from "./components/Header";
import "./index.css";
import SearchBar from "./components/SearchBar";

export default function StockAnalyzer() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Header />
        {/* Search Bar */}
        <SearchBar />
      </div>
    </div>
  );
}
