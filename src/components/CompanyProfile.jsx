import React from 'react'
import { Info, TrendingUp, DollarSign, LineChart } from 'lucide-react';


const CompanyProfile = ({companyProfile, analysisMetrics}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {companyProfile.name} ({companyProfile.ticker})
        </h2>
        <p className="text-gray-600">{companyProfile.finnhubIndustry}</p>
      </div>
      {companyProfile.logo && (
        <img
          src="/api/placeholder/64/64"
          alt={`${companyProfile.name} logo`}
          className="h-12 w-12 rounded"
        />
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="bg-gray-50 p-3 rounded">
        <h3 className="font-semibold text-gray-700 mb-1">
          Company Details
        </h3>
        <p className="text-sm">
          <span className="text-gray-500">Exchange:</span>{" "}
          {companyProfile.exchange}
        </p>
        <p className="text-sm">
          <span className="text-gray-500">Currency:</span>{" "}
          {companyProfile.currency}
        </p>
        <p className="text-sm">
          <span className="text-gray-500">Country:</span>{" "}
          {companyProfile.country}
        </p>
        <p className="text-sm">
          <span className="text-gray-500">IPO Date:</span>{" "}
          {companyProfile.ipo}
        </p>
      </div>

      <div className="bg-gray-50 p-3 rounded">
        <h3 className="font-semibold text-gray-700 mb-1">Market Data</h3>
        <p className="text-sm">
          <span className="text-gray-500">Market Cap:</span> $
          {(companyProfile.marketCapitalization || 0).toLocaleString()} M
        </p>
        <p className="text-sm">
          <span className="text-gray-500">Shares Outstanding:</span>{" "}
          {(companyProfile.shareOutstanding || 0).toLocaleString()} M
        </p>
        <p className="text-sm">
          <span className="text-gray-500">Website:</span>
          <a href="#" className="text-blue-600 hover:underline ml-1">
            {companyProfile.weburl}
          </a>
        </p>
      </div>
    </div>

    {analysisMetrics && (
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="font-semibold text-gray-800 flex items-center mb-3">
          <TrendingUp size={18} className="mr-2 text-blue-600" />
          Advanced Analysis
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Custom Valuation */}
          <div className="bg-blue-50 p-3 rounded">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              Custom Valuation
            </h4>
            <div className="flex items-center justify-between">
              <span
                className={`text-lg font-bold ${
                  analysisMetrics.customValuation.status ===
                  "Potentially Undervalued"
                    ? "text-green-600"
                    : analysisMetrics.customValuation.status ===
                      "Potentially Overvalued"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}>
                {analysisMetrics.customValuation.status}
              </span>
              <div className="flex items-center">
                <Info size={16} className="text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">
                  Score:{" "}
                  {analysisMetrics.customValuation.score.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Market Sentiment */}
          <div className="bg-purple-50 p-3 rounded">
            <h4 className="text-sm font-medium text-purple-800 mb-2">
              Market Sentiment
            </h4>
            <div className="flex items-center justify-between">
              <span
                className={`text-lg font-bold ${
                  analysisMetrics.sentiment.trend === "Positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}>
                {analysisMetrics.sentiment.trend}
              </span>
              <div className="flex items-center">
                <Info size={16} className="text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">
                  Score: {analysisMetrics.sentiment.score}/10
                </span>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-gray-100 p-3 rounded">
            <h4 className="text-sm font-medium text-gray-800 mb-2">
              Recommendation
            </h4>
            <div className="flex items-center justify-between">
              <span
                className={`text-lg font-bold ${
                  analysisMetrics.recommendation === "Buy"
                    ? "text-green-600"
                    : analysisMetrics.recommendation === "Sell"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}>
                {analysisMetrics.recommendation}
              </span>
              <DollarSign size={18} className="text-gray-500" />
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-100">
          <div className="flex items-start">
            <LineChart size={20} className="text-blue-500 mt-1 mr-2" />
            <div>
              <h4 className="font-medium text-blue-800">
                Analysis Details
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                This analysis is based on custom metrics that go beyond
                traditional valuation methods. The evaluation considers
                industry trends, growth potential, and historical
                performance.
                <span className="block mt-2 text-xs text-blue-700">
                  Note: This is a simplified analysis for demonstration
                  purposes. In a production application, this would
                  include detailed financial metrics, valuation models,
                  and technical indicators.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default CompanyProfile