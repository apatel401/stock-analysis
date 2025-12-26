/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { Search, X, Info, TrendingUp, DollarSign, LineChart } from 'lucide-react';
import CompanyProfile from "./CompanyProfile";

const SearchBar = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [companyProfile, setCompanyProfile] = useState(null);
  const [analysisMetrics, setAnalysisMetrics] = useState(null);

  const searchRef = useRef(null);
  const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

  // Clear search and reset state
  const handleClearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setError("");
  };

  // Handle search input change with debounce
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchTerm.trim().length > 0) {
        fetchSymbolSuggestions(searchTerm);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch symbol suggestions based on search term
  const fetchSymbolSuggestions = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/search?q=${query}&token=${API_KEY}`
      );
      const data = await response.json();

      if (data.result && data.result.length > 0) {
        setSuggestions(data.result.slice(0, 8));
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      setError("Failed to fetch suggestions. Please try again.");
      console.error("Error fetching suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch company profile
  const fetchCompanyProfile = async (symbol) => {
    setLoading(true);
    try {
      // Fetch company profile
      const response = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`
      );
      const data = await response.json();

      if (data && data.name) {
        setCompanyProfile(data);

        // After getting profile, analyze the stock (in a real app, this would use financials)
        analyzeStock(data, symbol);
      } else {
        setError(`No data found for ${symbol}`);
        setCompanyProfile(null);
      }
    } catch (err) {
      setError("Failed to fetch company data. Please try again.");
      console.error("Error fetching company data:", err);
      setCompanyProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Analyze stock using basic metrics and custom logic
  // This function would be expanded with actual financial data in a real application
  const analyzeStock = async (profileData, symbol) => {
    try {
      // In a real app, you would fetch financial data here:
      // - PE ratio, PB ratio, Debt/Equity, etc.
      // - Historical prices, market cap, financial statements
      // - Analyst ratings, earnings estimates

      // For demo purposes, we'll create mock analysis based on limited data
      const mockAnalysis = {
        marketCap: profileData.marketCapitalization || 0,
        industry: profileData.finnhubIndustry,
        customValuation: calculateCustomValuation(profileData),
        sentiment: calculateMockSentiment(symbol),
        recommendation: determineRecommendation(profileData),
      };

      setAnalysisMetrics(mockAnalysis);
    } catch (err) {
      console.error("Error analyzing stock:", err);
    }
  };

  // Mock custom valuation logic - would be replaced with real metrics
  const calculateCustomValuation = (data) => {
    // In a real app, this would use financial ratios, growth rates, etc.
    const score = Math.random() * 100;

    if (score > 70) return { score, status: "Potentially Undervalued" };
    if (score < 30) return { score, status: "Potentially Overvalued" };
    return { score, status: "Fairly Valued" };
  };

  // Mock sentiment analysis - would be replaced with real data
  const calculateMockSentiment = (symbol) => {
    // In a real app, this would analyze news, social media, etc.
    const sentimentScore = Math.random() * 10;
    return {
      score: sentimentScore.toFixed(1),
      trend: sentimentScore > 5 ? "Positive" : "Negative",
    };
  };

  // Determine recommendation based on analysis
  const determineRecommendation = (data) => {
    // In a real app, this would use multiple financial metrics
    const random = Math.random();
    if (random > 0.6) return "Buy";
    if (random > 0.3) return "Hold";
    return "Sell";
  };

  // Handle stock selection
  const handleSelectStock = (stock) => {
    console.log(stock);
    setSearchTerm(stock);
    fetchCompanyProfile(stock);
    setSelectedStock(stock);
    setSuggestions([]);
  };

  return (
    <div>
      <div className="relative mb-6" ref={searchRef}>
        <div className="flex items-center bg-white rounded-lg shadow-md border border-gray-200">
          <div className="pl-4 text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSelectStock(e.target.value)}
            placeholder="Search stock symbol or company name..."
            className="flex-1 p-3 rounded-lg focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="pr-4 text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Search suggestions */}
        {suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
            <ul>
              {suggestions.map((item) => (
                <li
                  key={item.symbol}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSelectStock(item)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-blue-800">
                        {item.symbol}
                      </span>
                      <p className="text-sm text-gray-600 truncate">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{item.type}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Loading and error states */}
        {loading && <p className="mt-2 text-sm text-gray-500">Loading...</p>}
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
      {/* Stock Information */}
      {companyProfile ? (
      <CompanyProfile companyProfile={companyProfile} analysisMetrics={analysisMetrics} />
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <Search className="text-blue-500 mr-2" size={20} />
                <h3 className="font-semibold text-gray-800">Smart Search</h3>
              </div>
              <p className="text-sm text-gray-600">
                Real-time autocomplete to quickly find stock symbols and company information.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <TrendingUp className="text-green-500 mr-2" size={20} />
                <h3 className="font-semibold text-gray-800">Advanced Analysis</h3>
              </div>
              <p className="text-sm text-gray-600">
                Custom valuation metrics to identify potentially undervalued or overvalued stocks.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <Info className="text-purple-500 mr-2" size={20} />
                <h3 className="font-semibold text-gray-800">Detailed Insights</h3>
              </div>
              <p className="text-sm text-gray-600">
                Get detailed company information, sector analysis, and financial metrics in one place.
              </p>
            </div>
          </div>
        )}
    </div>
  );
};

export default SearchBar;
